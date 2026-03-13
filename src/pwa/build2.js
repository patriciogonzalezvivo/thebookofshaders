const { generateSW } = require("workbox-build");
const { getTemplateUrls } = require("./lib");

const mainPages = getTemplateUrls("./");
const appendixPages = getTemplateUrls("./appendix");
const examplesPages = getTemplateUrls("./examples");
const glossaryPages = getTemplateUrls("./glossary", false, "?search=");

// to test glob patterns use: https://globster.xyz/
// injectManifest({
generateSW({
    globDirectory: "../../",
    globPatterns: [
        "**/*.{frag,png,jpg,jpeg,gif,txt,html,css,yml,psd,xml,woff,woff2,js}",
        "src/glslCanvas/build/*",
        "src/glslEditor/build/*",
        "src/glslGallery/build/*",
        "src/moon/*",
    ],
    globIgnores: [
        "epub/**/*",
        "motionToolKit/**/*",
        "proceduralTexture/**/*",
        "src/parsedown/**/*",
        "src/pwa/**/*",
        "src/pwa/*",
        "src/**/src/**/*",
        "src/glslCanvas/*",
        "src/glslEditor/*",
        "src/glslGallery/*",
    ],
    templatedURLs: {
        "/": ["index.php", "header.php", "toc-header.php", "footer.php"],
        "edit.php": "edit.php",
        "glossary/": ["glossary/*.{md,php}"],
        "appendix/": ["appendix/*.{md,php}"],
        ...mainPages,
        ...glossaryPages,
        ...appendixPages,
        ...examplesPages,
    },
    swDest: "../../service-worker.build2.js",
    maximumFileSizeToCacheInBytes: 15000000,
}).then(({ count, size, warnings }) => {
    if (warnings.length > 0) {
        console.warn(
            "Warnings encountered while injecting the manifest:",
            warnings.join("\n")
        );
    }

    console.log(
        `Injected a manifest which will precache ${count} files, totaling ${size} bytes.`
    );
});
