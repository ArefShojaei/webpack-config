const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const MiniCssExtract = require("mini-css-extract-plugin");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].[contenthash].js"
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
                exclude: /\.module\.s?css$/,
                use: [
                    MiniCssExtract.loader,
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
                test: /\.module\.s?css$/,
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
            }
        ]
    },
    plugins: [
        new MiniCssExtract({ filename: "styles.[contenthash].css" }),
        new WebpackBuildNotifierPlugin({
            title: "Webpack compiler ( Production ENV )",
            suppressSuccess: true,
            showDuration: true
        })
    ]
});
