import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "js-yaml";
import libdocUtils from "./libdocUtils.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CURRICULUM_DIR = path.join(__dirname, "curriculum");
const LEVELS_DIR = path.join(__dirname, "levels");

export default function () {
    const moduleFiles = fs.readdirSync(CURRICULUM_DIR).filter((f) => f.endsWith(".yml"));
    const rawModules = moduleFiles.map((f) => {
        const slug = f.replace(/\.yml$/, "");
        const data = load(fs.readFileSync(path.join(CURRICULUM_DIR, f), "utf8"));
        return { slug, ...data };
    });

    const levelFiles = fs.readdirSync(LEVELS_DIR).filter((f) => f.endsWith(".yml"));
    const levelsByPath = {};
    for (const f of levelFiles) {
        const levelPath = `_data/levels/${f}`;
        const level = load(fs.readFileSync(path.join(LEVELS_DIR, f), "utf8"));
        // Index-prefixed (e.g. "1-fundamentals") so a future CMS edit that gives two levels
        // in the same module identical titles can't silently collide on one permalink.
        level.slug = `${level.level}-${libdocUtils.slugify(level.title)}`;
        levelsByPath[levelPath] = level;
    }

    // Each module owns its ordered list of level paths; levels carry no back-reference.
    const modules = rawModules.map((mod) => ({
        ...mod,
        levels: mod.levels.map((levelPath) => ({ ...levelsByPath[levelPath], path: levelPath })),
    }));

    const moduleForLevelPath = {};
    for (const mod of modules) {
        for (const level of mod.levels) {
            moduleForLevelPath[level.path] = mod;
        }
    }

    for (const mod of modules) {
        for (const level of mod.levels) {
            level.resolvedPrerequisites = level.prerequisites.map((prereq) => {
                if (!prereq.level) {
                    return { title: prereq.text, url: null };
                }
                const target = levelsByPath[prereq.level];
                const targetModule = moduleForLevelPath[prereq.level];
                return {
                    title: `${targetModule.name} Level ${target.level}`,
                    url: `/${targetModule.slug}/${target.slug}/`,
                };
            });
        }
    }

    for (const mod of modules) {
        const lines = ["graph TD"];
        mod.levels.forEach((level, i) => {
            const nodeDecl = `L${level.level}["Level ${level.level}: ${level.title}"]`;
            lines.push(i === 0 ? `    ${nodeDecl}` : `    L${mod.levels[i - 1].level} --> ${nodeDecl}`);
        });

        const externalNodes = new Map();
        const edges = [];
        let extCounter = 0;
        for (const level of mod.levels) {
            for (const prereq of level.prerequisites) {
                if (!prereq.level) {
                    const key = `text:${prereq.text}`;
                    if (!externalNodes.has(key)) {
                        externalNodes.set(key, { id: `EXT${++extCounter}`, label: prereq.text });
                    }
                    edges.push(`    ${externalNodes.get(key).id} --> L${level.level}`);
                    continue;
                }
                const target = levelsByPath[prereq.level];
                const targetModule = moduleForLevelPath[prereq.level];
                if (targetModule.slug === mod.slug) {
                    // Sequential same-module prerequisites (the overwhelmingly common case)
                    // are already drawn by the level chain inside the subgraph above; only
                    // draw an extra edge here if this skips levels (e.g. 4 requiring 2).
                    if (target.level !== level.level - 1) {
                        edges.push(`    L${target.level} --> L${level.level}`);
                    }
                    continue;
                }
                const key = prereq.level;
                if (!externalNodes.has(key)) {
                    externalNodes.set(key, { id: `EXT${++extCounter}`, label: `${targetModule.name} Level ${target.level}` });
                }
                edges.push(`    ${externalNodes.get(key).id} --> L${level.level}`);
            }
        }

        for (const { id, label } of externalNodes.values()) {
            lines.push(`    ${id}["${label}"]`);
        }
        lines.push(...edges);
        mod.mermaidGraph = lines.join("\n");
    }

    return modules.sort((a, b) => a.order - b.order);
}
