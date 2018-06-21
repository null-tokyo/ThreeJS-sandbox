const ENV  = process.env.NODE_ENV;
const srcPath = './src';    
const distPath = './dist';

module.exports = {
    script: {
        src: `${srcPath}/js/**/*.js`,
        dist: `${distPath}/js/`,
        watch: [
            `${srcPath}/js/**/*.js`,
            `${srcPath}/glsl/**/*.+(vert|frag|glsl)`
        ]
    },
    ejs: {
        src: `${srcPath}/view/**/[!_]*.ejs`,
        dist: distPath,
        watch: `${srcPath}/view/**/_*.ejs`,
    },
    css: {
        src: `${srcPath}/scss/**/*.scss`,
        dist:`${distPath}/css`,
        autoprefixer: {
            browsers: ['last 1 version']
        }
    },
    img: {
        src: `${srcPath}/images/**/*.+(jpg|png|gif|svg)`,
        dist:`${distPath}/images`
    },
    server: {
        server: {
            baseDir: distPath
        }
    },
    copy: {
        base: srcPath,
        src: [
            `${srcPath}/images/**/*.+(jpg|png|gif|svg)`
        ],
        dist: `${distPath}`
    }
};