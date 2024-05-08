const {src, dest, series, watch } = require(`gulp`),
    CSSLinter = require(`gulp-stylelint`),
    cleanCSS = require(`gulp-uglifycss`),
    babel = require(`gulp-babel`),
    htmlCompressor = require(`gulp-htmlmin`),
    jsCompressor = require(`gulp-uglify`),
    jsLinter = require(`gulp-eslint`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let browserChoice = `vivaldi`;

let minifyCSSForProd = () => {
    return src(`dev/css/*.css`)
        .pipe(cleanCSS())
        .pipe(dest(`./prod/css`));
};

let lintJS = () => {
    return src(`dev/js/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let transpileJSForProd = () => {
    return src(`dev/js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

let compressHTML = () => {
    return src(`dev/html/*html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod/html`));
};

let copyUnprocessedAssetsForProd = () => {
    return src([
        `*.*`,
        `**`,
        `!dev/`,
        `!dev/**`,
        `!node_modules/`,
        `!node_modules/**`,
        `!*.html`,
        `!js/*.js`,
        `!js/**/*.js`,
        `!gulpfile.js`,
        `!package-lock.json`,
        `!package.json`,
        `!README.md`,
        `!styles/`,
        `!.git/`,
        `!.git/**`,
        `!prod/`,
        `!prod/**`
    ], {dot: true})
        .pipe(dest(`prod`));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 75,
        browser: browserChoice,
        server: {
            baseDir: [
                `dev`,
                `dev/html`
            ]
        }
    });

    watch(`js/*.js`, series(lintJS))
        .on(`change`, reload);
};

let lintCSS = () => {
    return src(`dev/css/*.css`)
        .pipe(CSSLinter({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]
        }));
};

exports.serve = series(
    lintJS,
    lintCSS,
    serve
);

exports.default = serve;

exports.build = series(
    compressHTML,
    minifyCSSForProd,
    transpileJSForProd,
    copyUnprocessedAssetsForProd
);
