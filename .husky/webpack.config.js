const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin"); // react 热更新
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AssetsPlugin = require("./config/plugins/assetsPlugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "js/[name].[contenthash].bundle.js",
    clean: true,
  },
  // watch: true,
  devServer: {
    host: "localhost",
    port: "8000",
    hot: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".js", ".jsx", ".css", ".json"],
  },
  resolveLoader: {
    modules: ["node_modules", "config/loaders"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader"],
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/, // 正则表达式 用于匹配需要处理的文件
        use: [
          // loader的执行顺序 从右往左 从下往上
          MiniCssExtractPlugin.loader,
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
                  "postcss-preset-env", // 当前预设包含autoprefixer功能
                ], // 添加样式前缀
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
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
                  "postcss-preset-env",
                ],
              },
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.(png|svg|gif|jpe?g)$/,
        type: "asset/resource",
        generator: {
          filename: "static/[hash][ext][query]",
        },
      },
    ],
  },
  plugins: [
    new AssetsPlugin(),
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          to: path.resolve("./dist"),
          globOptions: {
            ignore: ['**/index.html']
            // ignore: path.resolve("./public/index.html"),
          },
        },
      ],
    }),

    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
    }),

    new ESLintPlugin({
      context: path.resolve(__dirname, 'src'), // 指定要检查的文件夹
      exclude: 'node_modules', // 排除检查的文件夹
      // 其他配置
    }),
  ],

  optimization: {
    chunkIds: "deterministic",
    // runtimeChunk: true,
    // 没有使用到的将会被标记
    usedExports: true,
    sideEffects: true,
    minimize: true,
    minimizer: [
      // css压缩
      new CssMinimizerPlugin(),
      // js压缩
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
          mangle: false,
          format: {
            comments: false,
          },
          compress: {
            drop_console: true, //移除所有console相关代码；
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      chunks: "all",
      minSize: 60000,
      minChunks: 1,
      cacheGroups: {
        sysVendor: {
          test: /[\\/]node_modules[\\/]/,
          filename: "js/vendor_[contenthash].js",
          priority: 10,
        },
        react: {
          test: /(react|react-dom)[\\/]/,
          filename: "js/react_[contenthash].js",
          maxSize: Infinity,
          priority: 20,
        },
      },
    },
  },
};
