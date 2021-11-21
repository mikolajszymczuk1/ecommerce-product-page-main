const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    configureWebpack: {
        plugins: [
            new HtmlWebpackPlugin({
                baseURL: "/",
                title: "Frontend Mentor | E-commerce product page",
                template: "public/index.html",
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeScriptTypeAttributes: true,
                }
            })
        ],
        resolve: {
            alias: {
                "@": path.resolve("src")
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @use "~@/assets/scss/utilities/colors";
                    @use "~@/assets/scss/utilities/fonts";
                `
            }
        }
    }
}
