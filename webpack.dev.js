const path = require('path');
const Webpackbar = require('webpackbar');
const HtmlWebpack = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SpeedMeasureWebpack = require('speed-measure-webpack-plugin');

module.exports = {
    mode: "development",
    entry: path.join(__dirname, "src/index.js"),
    output: {
        path: path.join(__dirname, "build"),
        filename: "bundle.js",
        publicPath: "/"
    },
    resolve: {
        alias: {
            "@": path.join(__dirname, "src"),
            "@assets": path.join(__dirname, "src/assets"),
            "@components": path.join(__dirname, "src/components")
        }
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "public")
        },
        open: true,
        hot: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.(woff2?|ttf|otf|eot)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        outputPath: "assets/fonts",
                        publicPath: "assets/fonts",
                        name: "[name].[ext]"
                    }
                }
            },
            {
                test: /\.(png|jpe?g|svg)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        outputPath: "assets/images",
                        publicPath: "assets/images",
                        name: "[name].[ext]"
                    }
                }
            },
            {
                test: /\.s?css$/,
                exclude: /\.module\.s?css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            api: "modern"
                        }
                    }
                ]
            },
            {
                test: /\.module\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            api: "modern"
                        }
                    }
                ]
            },
            {
                test: /\.(jsx?)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            }
        ]
    },
    plugins: [
        new Webpackbar({ name: "Processes :" }),
        new SpeedMeasureWebpack(),
        new CleanWebpackPlugin(),
        new HtmlWebpack({
            filename: "index.html",
            template: path.join(__dirname, "public/index.html"),
            inject: "body"
        })
    ]
};
