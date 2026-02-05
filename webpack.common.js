const path = require("path");
const Webpackbar = require("webpackbar");
const HtmlWebpack = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const SpeedMeasureWebpack = require("speed-measure-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/"
    },
    optimization: {
        minimize: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "initial"
                }
            }
        }
    },
    resolve: {
        alias: {
            "@": path.join(__dirname, "src"),
            "@assets": path.join(__dirname, "src/assets"),
            "@components": path.join(__dirname, "src/components")
        }
    },
    module: {
        rules: [
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
            template: path.resolve(__dirname, "public/index.html"),
            inject: "body"
        }),
    ]
};
