const merge = require("webpack-merge");
const common = require("./webpack.config.js");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: { output: { comments: false } }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require("cssnano")
      })
    ]
  }
});
