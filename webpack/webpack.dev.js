const { merge } = require("webpack-merge");
const common = require("./webpack.common");

const dev = {
    mode: "development",
    stats: "errors-warnings",
    devtool: "eval",
    devServer: {
        open: true,
        allowedHosts: [
            ".gitpod.io"
        ]
    },
};

module.exports = merge(common, dev);
