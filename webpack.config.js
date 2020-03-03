const isDev = process.env.NODE_ENV === "development";
const { resolve } = require("path");

module.exports = {
  entry: ["@babel/polyfill", "./client/index.js"],
  mode: isDev ? "development" : "production",
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "public")
  },
  devtool: "source-maps",
  context: __dirname,
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  node: {
    fs: "empty"
  }
};
