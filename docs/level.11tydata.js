export default {
    pagination: {
        data: "levels",
        size: 1,
        alias: "level",
        addAllPagesToCollections: true,
    },
    layout: "libdoc_page",
    eleventyComputed: {
        permalink: (data) => `docs/${data.level.moduleSlug}/level-${data.level.level}/`,
        title: (data) => `${data.level.moduleName} Level ${data.level.level} - ${data.level.title}`,
        description: (data) => data.level.description,
        category: (data) => data.level.moduleName,
        order: (data) => data.level.level,
        eleventyNavigation: (data) => ({
            key: `${data.level.moduleName} Level ${data.level.level}`,
            parent: data.level.moduleName,
            order: data.level.level,
        }),
    },
};
