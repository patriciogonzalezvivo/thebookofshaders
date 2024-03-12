const { generateSW, injectManifest } = require("workbox-build");

// to test glob patterns use: https://globster.xyz/
// injectManifest({
generateSW({
    globDirectory: "../",
    globPatterns: [
        "**/*[!gulpfile].{frag,png,jpg,jpeg,gif,txt,html,css,yml,psd,xml,woff,woff2,js}",
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
        "src/**/src/**/*",
    ],
    swDest: "sw2.js",
    ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
    maximumFileSizeToCacheInBytes: 10000000,
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
