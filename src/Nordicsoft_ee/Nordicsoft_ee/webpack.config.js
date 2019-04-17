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
            //critical_foft_preload: "./ClientApp/src/assets/js/critical-foft-preload-fallback-optional.js",
            vendor_styles: "./ClientApp/src/assets/js/vendor_styles.js",
            vendor_src: [
                "script-loader!./ClientApp/src/assets/vendor/jquery/jquery.min.js",
                "script-loader!./ClientApp/src/assets/vendor/bootstrap/js/bootstrap.min.js",
                "script-loader!./ClientApp/src/assets/vendor/owl-carousel/owl.carousel.min.js",
                "script-loader!./ClientApp/src/assets/vendor/easy-responsive-tabs/js/easyResponsiveTabs.js",
                "script-loader!./ClientApp/src/assets/vendor/pushy/js/pushy.min.js",
                "script-loader!./ClientApp/src/assets/vendor/scrolla/scrolla.jquery.min.js",
                "script-loader!./ClientApp/src/assets/vendor/isotope/isotope.pkgd.min.js",
                "script-loader!./ClientApp/src/assets/vendor/magnific-popup/jquery.magnific-popup.min.js",
                "script-loader!./ClientApp/src/assets/vendor/icheck/icheck.js",
                "script-loader!./ClientApp/src/assets/vendor/bootstrap/js/ie10-viewport-bug-workaround.js",
            ],
            custom_styles: './ClientApp/src/assets/js/custom_styles.js',
            main: './ClientApp/src/assets/js/bigga.js',

        },
        devtool: 'eval',
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
            new CopyWebpackPlugin(["./ClientApp/src/assets/js/sw.js"])

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
                            publicPath: devMode ? "/dist" : "/dist"
                        }
                    }]
                }
            ]
        }
    }
};