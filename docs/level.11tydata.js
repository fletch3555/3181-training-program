export default {
    pagination: {
        data: "levels",
        size: 1,
        alias: "level",
        addAllPagesToCollections: true,
    },
    layout: "libdoc_page",
    eleventyComputed: {
        permalink: (data) => `${data.level.moduleSlug}/${data.level.slug}/`,
        title: (data) => `${data.level.moduleName} Level ${data.level.level} - ${data.level.title}`,
        description: (data) => data.level.description,
        category: (data) => data.level.moduleName,
        order: (data) => data.level.level,
        eleventyNavigation: (data) => ({
            key: `${data.level.moduleName} Level ${data.level.level}`,
            title: data.level.title,
            parent: data.level.moduleName,
            order: data.level.level,
        }),
    },
};
