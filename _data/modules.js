import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "js-yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CURRICULUM_DIR = path.join(__dirname, "curriculum");
const LEVELS_DIR = path.join(__dirname, "levels");

export default function () {
    const moduleFiles = fs.readdirSync(CURRICULUM_DIR).filter((f) => f.endsWith(".yml"));
    const modules = moduleFiles.map((f) => {
        const slug = f.replace(/\.yml$/, "");
        const data = load(fs.readFileSync(path.join(CURRICULUM_DIR, f), "utf8"));
        return { slug, ...data, levels: [] };
    });

    const bySlug = Object.fromEntries(modules.map((m) => [m.slug, m]));

    const levelFiles = fs.readdirSync(LEVELS_DIR).filter((f) => f.endsWith(".yml"));
    const levelsByPath = {};
    for (const f of levelFiles) {
        const data = load(fs.readFileSync(path.join(LEVELS_DIR, f), "utf8"));
        const level = { ...data, path: `_data/levels/${f}` };
        levelsByPath[level.path] = level;
        bySlug[level.module].levels.push(level);
    }

    for (const mod of modules) {
        mod.levels.sort((a, b) => a.level - b.level);
        for (const level of mod.levels) {
            level.resolvedPrerequisites = level.prerequisites.map((prereq) => {
                if (!prereq.level) {
                    return { title: prereq.text, url: null };
                }
                const target = levelsByPath[prereq.level];
                const targetModule = bySlug[target.module];
                return {
                    title: `${targetModule.name} Level ${target.level}`,
                    url:
                        target.module === mod.slug
                            ? `level-${target.level}/`
                            : `../${target.module}/level-${target.level}/`,
                };
            });
        }
    }

    return modules.sort((a, b) => a.order - b.order);
}
