import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "js-yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CURRICULUM_DIR = path.join(__dirname, "curriculum");

export default function () {
    const files = fs.readdirSync(CURRICULUM_DIR).filter((f) => f.endsWith(".yml"));
    const modules = files.map((f) => {
        const slug = f.replace(/\.yml$/, "");
        const data = load(fs.readFileSync(path.join(CURRICULUM_DIR, f), "utf8"));
        return { slug, ...data };
    });

    const bySlug = Object.fromEntries(modules.map((m) => [m.slug, m]));

    for (const mod of modules) {
        for (const level of mod.levels) {
            level.resolvedPrerequisites = level.prerequisites.map((prereq) => {
                if (!prereq.module) {
                    return { title: prereq.text, url: null };
                }
                const targetModule = bySlug[prereq.module];
                return {
                    title: `${targetModule.name} Level ${prereq.level}`,
                    url:
                        prereq.module === mod.slug
                            ? `level-${prereq.level}/`
                            : `../${prereq.module}/level-${prereq.level}/`,
                };
            });
        }
    }

    return modules.sort((a, b) => a.order - b.order);
}
