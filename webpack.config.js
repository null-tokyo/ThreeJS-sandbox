const path = require('path');
const srcDir = path.join(__dirname, '/src');
const distDir = path.join(__dirname, '/dist');

module.exports = {
    mode: 'development',
    entry:  {
        index: `${srcDir}/js/index.js`,
        gl01: `${srcDir}/js/gl01.js`,
        gl02: `${srcDir}/js/gl02.js`,
        gl03: `${srcDir}/js/gl03.js`,
        'gl03-01': `${srcDir}/js/gl03-01.js`,
        'gl03-02': `${srcDir}/js/gl03-02.js`,
        'gl03-03': `${srcDir}/js/gl03-03.js`,
        'gl03-04': `${srcDir}/js/gl03-04.js`,
        'gl03-05': `${srcDir}/js/gl03-05.js`,
        gl04: `${srcDir}/js/gl04.js`,
        gl05: `${srcDir}/js/gl05.js`,
        lib: `${srcDir}/js/lib.js`,
    },
    output: {
        path: `${distDir}/js/`,
        publicPath: '/',
        filename: '[name].js',
    },
    module: {
        rules: [
            /**
             * JavaScript Settings
             */
            {
                test: /\.js$/,
                use: [{
                    loader: "source-map-loader"
                }],
                enforce: "pre"
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            quiet: true,
                            failOnWarning: true
                        }
                    }
                ]
            },
            {
                test: /\.(frag|vert|glsl)$/,
                use: {
                    loader: 'webpack-glsl-loader'
                }
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'cache-loader',
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['env', {'modules': false} ]
                            ]
                        }
                    }
                ]
            },
            /**
             * CSS Settings
             */
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            minimize: true,
                            sourceMap: true,
                            minimize: true,
                            importLoaders: 2
                        }
                    },
                    {
                      loader: 'sass-loader',
                      options: {
                        sourceMap: true,
                      }
                    },
                    {
                      loader: 'postcss-loader',
                      options: {
                        sourceMap: true,
                        plugins: [
                          require('autoprefixer')({grid: true})
                        ]
                      },
                    }
                ]
            },
            {
              test: /\.(gif|png|jpg|eot|wof|woff|ttf|svg)$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 100 * 1024,
                    name: './img/[name].[ext]'
                  }
                }
              ]
            }
        ]
    }
};
