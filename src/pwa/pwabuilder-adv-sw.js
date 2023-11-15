import { precacheAndRoute } from "workbox-precaching/precacheAndRoute";

const revision = "abc1";
precacheAndRoute([
    {
        revision: "8d24eb7547812ba1d1a8895cff7db72e",
        url: "04/three_js/index.html",
    },
    { revision: "bf6c14925e66edb1526b6c9489b3c042", url: "css/github.css" },
    { revision: "e10b985f11be01a7e447a1f801055446", url: "css/style-ch.css" },
    { revision: "88aaf868b203111dc4f250c57cd8f2aa", url: "css/style-jp.css" },
    { revision: "ce095c53c74db756db3f96a62889d4c1", url: "css/style.css" },
    { revision: "a1260fc23f929cc5109bf721e192655a", url: "graph.html" },
    {
        revision: "b2b8d5f83423e2954b146b4c891d0654",
        url: "src/highlight.min.js",
    },
    { revision: "46438811d0e87fc6c287b4152a2adf96", url: "src/main.js" },
    { revision, url: "/" },
    { revision, url: "/00/*" },
    { revision, url: "/01/*" },
    { revision, url: "/02/*" },
]);
