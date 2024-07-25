const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const InlineChunkHtmlPlugin = require("inline-chunk-html-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 采集打包时间
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const glob = require("glob");
const commonConfig = require("./webpack.common");
const path = require("path");
const { merge } = require("webpack-merge");

process.env.NODE_ENV = "production";

module.exports = merge(commonConfig, {
  mode: "production",
  entry: {
    main: "./src/index.js",
  },

  devtool: false,

  module: {
    rules: [
      {
        test: /\.css$/, // 正则表达式 用于匹配需要处理的文件
        use: [
          // loader的执行顺序 从右往左 从下往上
          {
            loader: MiniCssExtractPlugin.loader,
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
          {
            loader: MiniCssExtractPlugin.loader,
          },
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
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          to: path.resolve("./dist"),
          globOptions: {
            ignore: path.resolve("./public/index.html"),
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contentHash:8].css",
    }),
    // 去掉多余的样式
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.resolve("./src")}/**/*`, { nodir: true }),
    }),
    new CompressionPlugin({
      test: /\.(css|js|png)$/,
    }),
    // 将chunk文件注入到html
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime.*\.js/]),
    // new BundleAnalyzerPlugin(),
  ],
  optimization: {
    chunkIds: "deterministic",
    // runtimeChunk: true,
    // 没有使用到的将会被标记
    usedExports: true,
    sideEffects: true,
    minimize: true,
    minimizer: [
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
      minSize: 50000,
      maxSize: 50000,
      cacheGroups: {
        sysVendor: {
          test: /[\\/]node_modules[\\/]/,
          filename: "js/vendor_[id].js",
          priority: -20,
        },
      },
    },
  },
});
