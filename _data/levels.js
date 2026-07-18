import getModules from "./modules.js";

export default function () {
    const modules = getModules();
    return modules.flatMap((mod) =>
        mod.levels.map((level) => ({
            ...level,
            moduleSlug: mod.slug,
            moduleName: mod.name,
            moduleTitle: mod.title,
            moduleOrder: mod.order,
        }))
    );
}
