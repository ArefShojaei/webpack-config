const path = require('path');
const Webpackbar = require('webpackbar');
const HtmlWebpack = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SpeedMeasureWebpack = require('speed-measure-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.[contenthash].js",
        publicPath : "/"
    },
    resolve: {
        alias : {
            "@helpers" : path.join(__dirname, "src/helpers"),
            "@assets" : path.join(__dirname, "src/assets"),
            "@components" : path.join(__dirname, "src/components"),
        }
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
                        name: "[name].[contenthash].[ext]"
                    }
                }
            },
            {
                test: /\.(png|jpe?g|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "assets/images",
                            publicPath: "assets/images",
                            name: "[name].[contenthash].[ext]"
                        }
                    },
                    "image-webpack-loader"
                ]
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtract.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env",]
                    }
                }
            }
        ]
    },
    plugins: [
        new Webpackbar({ name: "Processes :" }),
        new SpeedMeasureWebpack(),
        new CleanWebpackPlugin(),
        new MiniCssExtract({ filename: "styles.[contenthash].css" }),
        new HtmlWebpack({
            filename: "index.html",
            template: path.resolve(__dirname, "public/index.html"),
            inject : "body"
        }),
        new WebpackBuildNotifierPlugin({
            title: "Webpack compiler ( Production ENV )",
            suppressSuccess: true,
            showDuration : true,
        }),
    ]
}