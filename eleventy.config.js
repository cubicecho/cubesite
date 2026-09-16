// Eleventy config for cubesite's own site.
//
// Two jobs. The pages under src/ are the docs; `theme/` and `brand/` are copied
// through verbatim so the published site *is* the distribution — the stylesheet
// this repo owns is fetchable at /cubesite/theme/cubesite.css, which is what
// makes "did this project drift?" a diff rather than a reading exercise.
//
// Deployed under /cubesite/, so every internal link goes through `| url`.

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/nojekyll": ".nojekyll" });
  eleventyConfig.addPassthroughCopy({ "theme": "theme" });
  eleventyConfig.addPassthroughCopy({ "brand": "brand" });

  // The docs site dogfoods the theme rather than keeping a second copy: this is
  // the same file every project vendors, served from where it lives.
  eleventyConfig.addPassthroughCopy({ "theme/cubesite.css": "css/cubesite.css" });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.setServerOptions({ port: 3000 });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    pathPrefix: "/cubesite/",
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md"],
  };
}
