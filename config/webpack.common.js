const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { DefinePlugin } = require("webpack");
const AssetsPlugin = require("./plugins/assetsPlugin");
const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: "js/[name]_[contenthash:8].bundle.js",
    path: path.resolve("./dist"),
    publicPath: "auto",
  },

  // 模块解析
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
    extensions: [".js", ".json", ".jsx", ".vue"],
  },

  module: {
    rules: [
      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: path.resolve("./config/loaders/htmlLoader.js"),
      //       // options: {
      //       //   name: "html/[name]-[hash:8].[ext]", //图片名称
      //       //   outputPath: "html", //路径 可配置在name中
      //       // },
      //     },
      //   ],
      // },
      {
        test: /\.(png|svg|gif|jpe?g)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              esModule: false,
              name: "img/[name]-[hash:8].[ext]", //图片名称
              // outputPath: "img", //路径 可配置在name中
              limit: 35 * 1024, //25 kb
            },
          },
        ],

        // type: "asset/resource", // 类似于file-loader
        // generator: {
        //   filename: "img/[name]-[hash:8][ext]",
        // },

        // type: "asset/inline", // 类似于url-loader

        // type: "asset",
        // generator: {
        //   filename: "img/[name]-[hash:8][ext]",
        // },
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 30 * 1024,
        //   },
        // },
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
        generator: {
          filename: "font/[name].[hash:8][ext]",
        },
      },
      {
        test: /\.(js|jsx|ts)$/,
        use: ["babel-loader"], //将babel-loader 的配置项 放到 babel.config.js文件中
        exclude: /(node_modules)/,
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),

    new DefinePlugin({
      __DEV__: false,
      __PROFILE__: false,
      __UMD__: true,
      __EXPERIMENTAL__: true,
    }),

    // new AssetsPlugin({ age: 123 }),
    // new VueLoaderPlugin(),
  ],
};
