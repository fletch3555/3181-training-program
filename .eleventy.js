// START 11TY imports
import eleventyNavigationPlugin             from "@11ty/eleventy-navigation";
import { InputPathToUrlTransformPlugin }    from "@11ty/eleventy";
import { eleventyImageTransformPlugin }     from "@11ty/eleventy-img";
import { EleventyHtmlBasePlugin }           from "@11ty/eleventy";
import fs                                   from "node:fs";
// END 11TY imports

// START LibDoc imports
import libdocConfig                         from "./_data/libdocConfig.js";
import libdocFunctions                      from "./_data/libdocFunctions.js";
// END LibDoc imports

export default function(eleventyConfig) {
    // START PLUGINS
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, libdocFunctions.pluginsParameters.eleventyImageTransform());
    // END PLUGINS

    // START BUNDLES
    // addBundle/getBundle/getBundleFileUrl are provided by @11ty/eleventy-plugin-bundle,
    // which Eleventy registers automatically -- no addPlugin needed for it specifically.
    eleventyConfig.addBundle("css");
    // Separate bundle for dark-mode-only overrides, loaded via its own <link media>
    // kept in lockstep with the theme's own dark-mode link (see ui.js/libdoc_page.liquid)
    // so our brand colors win even when a user's explicit panel choice disagrees with OS preference.
    eleventyConfig.addBundle("cssDark");
    // Feeds an existing static CSS file's content into a {% css %} bundle, since the
    // bundle shortcodes are designed for inline template content, not static files.
    eleventyConfig.addShortcode("readFile", (filePath) => fs.readFileSync(filePath, "utf8"));
    // custom.css/custom_dark.css are no longer passthrough-copied (only read via the
    // shortcode above), so they have no dependency edge in Eleventy's graph -- without
    // this, saving them wouldn't trigger a dev-server rebuild. core/assets/* files stay
    // covered because they're still passthrough-copied, which the watcher already tracks.
    eleventyConfig.addWatchTarget("assets/css/custom.css");
    eleventyConfig.addWatchTarget("assets/css/custom_dark.css");
    // END BUNDLES

    // START FILTERS
    eleventyConfig.addAsyncFilter("autoids", libdocFunctions.filters.autoids);
    eleventyConfig.addAsyncFilter("embed", libdocFunctions.filters.embed);
    eleventyConfig.addAsyncFilter("cleanup", libdocFunctions.filters.cleanup);
    eleventyConfig.addAsyncFilter("dateString", libdocFunctions.filters.dateString);
    eleventyConfig.addAsyncFilter("datePrefixText", libdocFunctions.filters.datePrefixText);
    eleventyConfig.addAsyncFilter("toc", libdocFunctions.filters.toc);
    eleventyConfig.addAsyncFilter("sanitizeJSON", libdocFunctions.filters.sanitizeJson);
    eleventyConfig.addAsyncFilter("gitLastModifiedDate", libdocFunctions.filters.gitLastModifiedDate);
    // END FILTERS

    // START COLLECTIONS
    eleventyConfig.addCollection("myTags", libdocFunctions.collections.myTags);
    eleventyConfig.addCollection("postsByDateDescending", libdocFunctions.collections.postsByDateDescending);
    // END COLLECTIONS

    // START SHORTCODES
    eleventyConfig.addShortcode("alert", libdocFunctions.shortcodes.alert);
    eleventyConfig.addPairedShortcode("alertAlt", libdocFunctions.shortcodes.alert);
    eleventyConfig.addShortcode("embed", libdocFunctions.shortcodes.embed);
    eleventyConfig.addShortcode("icons", libdocFunctions.shortcodes.icons);
    eleventyConfig.addShortcode("icon", libdocFunctions.shortcodes.icon);
    eleventyConfig.addShortcode("iconCard", libdocFunctions.shortcodes.iconCard);
    eleventyConfig.addPairedShortcode("sandbox", libdocFunctions.shortcodes.sandbox);
    eleventyConfig.addPairedShortcode("sandboxFile", libdocFunctions.shortcodes.sandboxFile);
    // END SHORTCODES

    // START FILE COPY
    // Only assets/img needs to be copied as static files -- assets/css/custom.css
    // is read directly by the {% readFile %} shortcode into the CSS bundle instead.
    eleventyConfig.addPassthroughCopy("assets/img");
    eleventyConfig.addPassthroughCopy("core/assets");
    // END FILE COPY
    
    return {
        pathPrefix: libdocConfig.htmlBasePathPrefix
    }
};