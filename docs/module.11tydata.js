export default {
    pagination: {
        data: "modules",
        size: 1,
        alias: "module",
        addAllPagesToCollections: true,
    },
    layout: "libdoc_page",
    category: "Training Modules",
    mermaid: true,
    eleventyComputed: {
        permalink: (data) => `${data.module.slug}/`,
        title: (data) => data.module.title,
        description: (data) => data.module.description,
        order: (data) => data.module.order,
        eleventyNavigation: (data) => ({
            key: data.module.name,
            order: data.module.order,
        }),
    },
};
