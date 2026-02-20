module.exports = {
    globDirectory: "./",
    globPatterns: [
        // "**/*.{md,frag,png,jpg,php,jpeg,gif,cpp,h,pde,txt,html,sh,css,yml,psd,xml,woff,woff2,json,js,py,dist}",
        "**/*.{frag,png,jpg,php,jpeg,gif,pde,txt,html,sh,css,yml,psd,xml,woff,woff2,json,js,py,dist}",
        // "src/**/*",
        // "**/*",
        // "/**/"
    ],
    swDest: "sw.js",
    ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
    maximumFileSizeToCacheInBytes: 10000000,
};
