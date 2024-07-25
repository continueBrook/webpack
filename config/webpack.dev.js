const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin"); // react 热更新
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;

process.env.NODE_ENV = "development";

module.exports = merge(commonConfig, {
  mode: "development",
  // devtool: "source-map",
  target: "web",
  devServer: {
    hot: true,
    host: "localhost",
    port: 4000,
    compress: true, // 压缩文件
    historyApiFallback: true, // history 模式 需要设置
    proxy: {
      "/proxyApi": {
        target: "http://spark.tongdao.cn",
        pathRewrite: { "^/proxyApi": "" },
        changeOrign: true,
        secure: false,
        headers: {
          Connection: "keep-alive",
        },
      },
    },

    // contentBase: path.resolve("./public"),
    // allowedHosts: "all",
  },

  externals: {
    MyLibrary: "MyLibrary",
  },

  module: {
    rules: [
      {
        test: /\.css$/, // 正则表达式 用于匹配需要处理的文件
        use: [
          // loader的执行顺序 从右往左 从下往上
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader", // 可以处理css中的 url @media @import
            options: {
              importLoaders: 1, // 处理@import
              esModule: false, // background 中的 url 默认会被处理成require
            },
          },
          {
            loader: "postcss-loader", // 为了对css做兼容 具体功能需要配置
            options: {
              postcssOptions: {
                plugins: [
                  // require("autoprefixer"),
                  require("postcss-preset-env"), // 当前预设包含autoprefixer功能
                ], // 添加样式前缀
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              esModule: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  // require("autoprefixer"),
                  require("postcss-preset-env"),
                ],
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },

  plugins: [
    new ReactRefreshWebpackPlugin(),
    // new ModuleFederationPlugin({
    //   name: "lib_remote",
    //   filename: "remoteEntry.js",
    //   exposes: {
    //     "./App": "./src/js/App.jsx",
    //   },
    //   shared: {
    //     react: {
    //       eager: true,
    //       singleton: true,
    //     },
    //     "react-dom": {
    //       eager: true,
    //       singleton: true,
    //     },
    //   },
    // }),
  ],
});
