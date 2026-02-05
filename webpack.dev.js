const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "[name].js"
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
            }
        ]
    }
});
