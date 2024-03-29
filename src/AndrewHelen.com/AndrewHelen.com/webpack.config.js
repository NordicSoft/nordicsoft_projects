const webpack = require('webpack');
const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = (env, options) => {
    var devMode;

    if (!options) {
        devMode = env !== 'production';
    } else {
        devMode = options.mode !== 'production';
    }
    console.log("development mode:", devMode);

    return {
        mode: devMode ? "development" : "production",
        entry: {
            vendor_styles: "./ClientApp/src/assets/js/vendor_styles.js",
            jquery_src: [
                "script-loader!./ClientApp/src/assets/vendor/jquery.min.js",
                "script-loader!./ClientApp/src/assets/vendor/jquery.magnific-popup.min.js",
                "script-loader!./ClientApp/src/assets/vendor/jquery.countdown.min.js",
                "script-loader!./ClientApp/src/assets/vendor/jquery-confirm.min.js"
            ],
            bootstrap_src: [
                "script-loader!./ClientApp/src/assets/vendor/popper.min.js",
                "script-loader!./ClientApp/src/assets/vendor/bootstrap.min.js"
            ],
            plugins_src: [
                "script-loader!./ClientApp/src/assets/vendor/isotope.pkgd.min.js",
                "script-loader!./ClientApp/src/assets/vendor/smooth-scroll.js"
            ],
            all_styles: './ClientApp/src/assets/js/all_styles.js',
            custom_styles: './ClientApp/src/assets/js/custom_styles.js',
            main: './ClientApp/src/assets/js/index.js'

        },
        devtool: devMode ? 'eval' : '',
        output: {
            path: path.resolve(__dirname, './wwwroot/dist'),
            filename: "[name].js",
            publicPath: "/"
        },
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    //sourceMap: true // set to true if you want JS source maps
                }),
                new OptimizeCSSAssetsPlugin({})
            ],
            splitChunks: {
                chunks: 'async',
                cacheGroups: {
                    vendor_src: {
                        // chunks: 'all',
                        name: 'vendor_src',
                        test: /[\\/]vendor[\\/].*.js/,
                        enforce: true
                    },
                    vendor_styles: {
                        name: 'vendor_styles',
                        test: /[\\/]vendor[\\/].*.css/,
                        // chunks: 'all',
                        enforce: true
                    },
                    vendor_npm: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor_npm',
                        // chunks: 'all'
                    }
                }
            },
        },
        devServer: {
            hot: true
        },
        plugins: [
            new CleanWebpackPlugin([path.resolve(__dirname, './wwwroot/dist')]),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: '[name].css',
            }),
            // Enable the plugin to let webpack communicate changes
            // to WDS. --hot sets this automatically!
            new webpack.HotModuleReplacementPlugin(),
            new CompressionPlugin(),
            new CopyWebpackPlugin([
                "./ClientApp/src/assets/js/critical-foft-preload-fallback-optional.js",
                "./ClientApp/src/assets/js/fonts-load.js",
                "./ClientApp/src/assets/js/critical-css.js",
                "./ClientApp/src/assets/js/sw.js"])

        ],
        module: {
            rules: [
                {
                    test: /\.exec\.js$/, //for execute libs like in <script> tag. See more https://webpack.js.org/loaders/script-loader/
                    use: ['script-loader']
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                            //options: { sourceMap: devMode }
                        },
                        {
                            loader: "css-loader",
                            options: { sourceMap: devMode }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: devMode,
                                implementation: require("dart-sass")
                            }
                        },
                    ],
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                //If you have some urls in your css/scss, uncomment it. Set context to your image assets folder
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            outputPath: '../img/',
                            context: './ClientApp/src/assets/img'
                        }
                    }]
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: "fonts/[name].[ext]", // Output below ./fonts
                            publicPath: "/dist"
                        }
                    }]
                }
            ]
        }
    }
};