const path = require("path");

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: "./index.js",
    output: {
        library: "StyleGuideItem",
        libraryTarget: "commonjs",
        path: path.resolve(__dirname, "lib")
    },
    externals: {
        "react": "React"
    }
};