const webpack = require('webpack');
const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

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
            custom_styles: './ClientApp/src/assets/js/custom_styles.js',
            main: './ClientApp/src/assets/js/index.js',
            react_js: './ClientApp/src/assets/react/index.js'
        },
        devtool: 'source-map',
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
             runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            // get the name. E.g. node_modules/packageName/not/this/part.js
                            // or node_modules/packageName
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                            // npm package names are URL-safe, but some servers don't like @ symbols
                            return `npm.${packageName.replace('@', '')}`;
                        },
                    },
                },
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
                filename: '[name].css'
            }),
            // Enable the plugin to let webpack communicate changes
            // to WDS. --hot sets this automatically!
            new webpack.HotModuleReplacementPlugin(),
            new CompressionPlugin(),
            new CopyWebpackPlugin([
                "./ClientApp/src/assets/js/fonts-load.js",
                "./ClientApp/src/assets/js/critical-foft-preload-fallback-optional.js",
                "./ClientApp/src/assets/js/critical-css.js",
                "./ClientApp/src/assets/js/sw.js"]),
                //new HTMLWebpackPlugin({
                //  template: path.resolve(__dirname, 'index.html')
                //}),
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
                            loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader
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
                        }
                    ]
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', "@babel/preset-react"]
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
        },
        resolve: {
            extensions: ['*', '.js', '.jsx']
        }
    }
};