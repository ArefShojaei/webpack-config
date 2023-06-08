const path = require('path');
const Webpackbar = require('webpackbar');
const HtmlWebpack = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SpeedMeasureWebpack = require('speed-measure-webpack-plugin');

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, "public")
        },
        open: true,
        hot: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.(woff2?|ttf|otf|eot)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        outputPath: "/assets/fonts",
                        publicPath: "/assets/fonts",
                        name: "[name].[ext]"
                    }
                }
            },
            {
                test: /\.(png|jpe?g|svg)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        outputPath: "/assets/images",
                        publicPath: "/assets/images",
                        name: "[name].[ext]"
                    }
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
        ]
    },
    plugins: [
        new Webpackbar({ name: "Processes :" }),
        new SpeedMeasureWebpack(),
        new CleanWebpackPlugin(),
        new HtmlWebpack({
            filename: "index.html",
            template: path.resolve(__dirname, "public/index.html")
        }),
    ]
}