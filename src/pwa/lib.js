const fs = require("fs");
const path = require("path");

const projectPath = path.resolve(__dirname, "../../");

function getLangKeys() {
    const htmlCode = fs.readFileSync(
        path.resolve(projectPath, "chap-header.php"),
        "utf8"
    );
    const regex = /\?lan=([a-zA-Z_-]+)/g;
    let match;
    const langValues = [];

    while ((match = regex.exec(htmlCode)) !== null) {
        langValues.push(match[1]);
    }

    return langValues;
}

const getPathWithQuery = (pathname, query) => {
    if (!query) return `/${pathname}/`;
    const [base, subdir] = pathname.split("/");
    return `/${base}/${query}${subdir}`;
};

function getAllLangsRoutesPrev(route, glob, langs) {
    const suffix = route.includes("?") ? "&" : "?";
    return langs.reduce(
        (acc, lang) => ({
            ...acc,
            [[route, `lan=${lang}`].join(suffix)]: [glob],
        }),
        { [route]: [glob] }
    );
}

/**
 * Checks for files and returns an updated list of dependencies
 * @param { (string | null )[] } deps
 * @returns
 */
const filterDependecies = (deps) =>
    deps
        .filter((v) => v)
        .map((pathname) =>
            fs.existsSync(path.resolve(projectPath, pathname)) ? pathname : null
        )
        .filter((v) => v);

/**
 * Adds all available languages to the route, and returns those that exist
 * @param {string[]} langs - array of languages
 * @param {string} pathname - path to route
 * @param {string|undefined} query - used in glossary
 * @returns {Object.<string, string | string[]>}
 */
function getAllLangsRoutes(langs, pathname, query) {
    let route = `/${pathname}/`;
    let suffix = "?";
    let index = `${pathname}/index.php`;
    if (query) {
        const [base, subdir] = pathname.split("/");
        route = `/${base}/${query}${subdir}`;
        suffix = "&";
        index = null;
    }

    const baseRouteDeps = filterDependecies([index, `${pathname}/README.md`]);
    return langs.reduce(
        (acc, lang) => {
            const deps = filterDependecies([
                index,
                `${pathname}/README-${lang}.md`,
            ]);

            // todo: если README-${lang}.md не существует, то привязать к README.md
            // test: найти страницу без перевода, попробовать зайти на нее из-под оригинального сайта
            // do  : просто вернуть `${pathname}/README.md` если deps пуст
            if (deps.length) {
                return { ...acc, [`${route}${suffix}lan=${lang}`]: deps };
            }

            return acc;
        },
        { [route]: baseRouteDeps }
    );
}

/**
 * Gets a list of all possible routes, including all available languages
 * @param {string} dir
 * @param {RegExp | undefined | false} pattern
 * @param {string | undefined} query
 * @returns
 */
function getTemplateUrls(dir, pattern = /[0-9]{2}/, query) {
    const langs = getLangKeys();
    const directoryPath = path.resolve(projectPath, dir);

    const paths = fs
        .readdirSync(directoryPath)
        .filter((fileOrDir) =>
            fs.statSync(path.join(directoryPath, fileOrDir)).isDirectory()
        )
        .filter((dir) => (!pattern ? true : pattern.test(dir)))
        .map((dir) =>
            path.relative(projectPath, path.resolve(directoryPath, dir))
        );

    return paths.reduce(
        (acc, pathname) => ({
            ...acc,
            ...getAllLangsRoutes(langs, pathname, query),
            // ...getAllLangsRoutesPrev(
            //     getPathWithQuery(pathname, query),
            //     `${pathname}/*`,
            //     langs
            // ),
        }),
        {}
    );
}

module.exports = {
    getTemplateUrls,
};
