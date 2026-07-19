import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "js-yaml";

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
        levelsByPath[levelPath] = load(fs.readFileSync(path.join(LEVELS_DIR, f), "utf8"));
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
                    url:
                        targetModule.slug === mod.slug
                            ? `level-${target.level}/`
                            : `../${targetModule.slug}/level-${target.level}/`,
                };
            });
        }
    }

    return modules.sort((a, b) => a.order - b.order);
}
