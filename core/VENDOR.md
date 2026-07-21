# Vendored theme: eleventy-libdoc

`core/`, plus `_data/libdocConfig.js`, `_data/libdocFunctions.js`, `_data/libdocMessages.json`,
`_data/libdocSystem.json`, `_data/libdocUtils.js`, and the `_includes/libdoc_*.liquid` /
`_includes/sandbox.liquid` files are copied from the
[eleventy-libdoc](https://github.com/ita-design-system/eleventy-libdoc) starter template.

It isn't published to npm (it's a starter project, not a library), so there's no dependency to
install or bump — it's plain copy-pasted source, tracked in this repo like any other file.

## Base version

**v0.14.9** — commit [`7f64be7`](https://github.com/ita-design-system/eleventy-libdoc/commit/7f64be7a84a2b36f19a436cb5791f1818ebc5897), released 2026-05-11.

Updated from the previous baseline (v0.5.4, 2025-05-23) in two hops — 0.5.4 → 0.14.0 (CSS file
split, fuzzy-search subsystem, new preferences panel, new config/message keys, `myTags` shape
change) then 0.14.0 → 0.14.9 (icon system rewrite: icomoon web-font → per-icon SVG masks) — since
the icon rewrite and a handful of other restructurings were large enough to want their own
validation checkpoint rather than one 146-commit jump.

Deliberately not adopted: `core/feed.njk` (blog RSS, requires `@11ty/eleventy-plugin-rss`) and the
`@11ty/eleventy-plugin-rss` dependency — this site has no blog content, so a permanently-empty
feed wasn't worth the added dependency. `core/libdoc_blog.liquid`/`libdoc_tags.liquid`/
`libdoc_tag.liquid` are still vendored (harmless, effectively unused with no blog/tag content).

## Local modifications (won't match upstream, by design)

- `_data/libdocFunctions.js` — `autoids` filter strips HTML tags from heading text before using it
  for the slug/`title` attribute (fixes corrupted markup when a heading contains a link). Upstream
  regressed this to use unstripped text again as of 0.14.9 — re-check this on future updates.
- `core/assets/css/ds__defaults.css` — removed the `border-left-width`/`border-left-style` on
  `main > ol:has(ul) > li` (task-list pill-badge styling).
- `core/assets/css/fonts.css` — converted 4 relative `@font-face` `url(...)` paths to absolute so
  they survive CSS bundling (this file didn't exist pre-0.14.0; the `@font-face` blocks used to
  live in `ds__defaults.css`, where the same fix previously applied).
- `core/assets/js/ui.js` — three changes: (1) "Copy code" button selector changed from `main>pre`
  to `main>pre:not(.mermaid)` so it doesn't inject into Mermaid diagram blocks; (2) a second
  `#custom_dark_mode_css` `<link>` is toggled in lockstep with upstream's own
  `#libdoc_dark_mode_css` inside `setColorScheme()`, so our brand colors load whenever dark CSS is
  active; (3) `setColorScheme()` dispatches a `themechange` `CustomEvent` at the end (upstream
  doesn't dispatch anything itself), which the Mermaid re-render script listens for.
- `_includes/libdoc_page.liquid` — heavily customized: CSS bundled via the `css`/`cssDark` paired
  shortcodes + `readFile` shortcode instead of individual `<link>` tags (icons.css.liquid excluded
  from the bundle since it contains real Liquid that must be rendered, not read raw); site logo
  rendered as a CSS `mask-image` `<span>` instead of upstream's plain `<img>`, so it can be
  recolored to brand pink; adds the Google Fonts Poppins `<link>` tags (not part of the vendored
  theme — our own addition, easy to lose track of in a future re-port); adopts upstream's native
  preferences panel (`<details id="user_preferences">`) as-is, no changes needed there since our
  brand colors flow through the CSS variable mechanism automatically; Mermaid render/re-render
  script rewritten to read the new `localStorage['eleventyLibdoc'].colorScheme` shape and listen
  for the `themechange` event above; footer kept commented out (`{% comment %}...{% endcomment %}`).
- `settings.json` — `htmlBasePathPrefix` set to `""` rather than `"/"`. Both normalize identically
  for Eleventy's own `pathPrefix` config, but the new preferences-panel/icon code does raw string
  concatenation (`` `${htmlBasePathPrefix}/core/...` ``) that produces a broken protocol-relative
  `//core/...` URL if the value has its own leading slash — `""` is upstream's own default and the
  only value that's safe for both consumers.

Dropped (was present at the old v0.5.4 baseline, intentionally not carried forward): a narrow
`pagePathUrl[2] == null` patch on `_includes/libdoc_before_html.liquid`'s blog-slug URL matching —
no blog content exists on this site, so the code path it guarded was unreachable, and upstream's
0.14.x rewrite of that logic no longer has a clean seam for it.

Site-specific files that are expected to always diverge from upstream (config, not theme code):
`.eleventy.js`, `.eleventyignore`, `.gitignore`, `package.json`, `package-lock.json`,
`settings.json`.

## Updating

There's no merge/dependency-bump path — updating means re-diffing this vendored copy against a
newer upstream tag, porting over whatever's wanted file-by-file, and re-applying the local
modifications above on top. The 0.5.4 → 0.14.9 update cloned both the current base tag and the
target tag locally (`git clone --depth 1 --branch <tag> https://github.com/ita-design-system/eleventy-libdoc.git`)
and diffed/rsynced from there rather than fetching individual files via the GitHub API — much
faster for a jump spanning 97 changed files.
