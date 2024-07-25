// babel-loader 相关配置

module.exports = {
  plugins: [
    "@babel/plugin-transform-flow-strip-types",
    "@babel/plugin-proposal-export-default-from",
  ],
  sourceType: "unambiguous",
  presets: [
    [
      "@babel/preset-env",
      {
        // targets: "chrome 100",
        // false 不对新语法进行填充
        // usage 对用到的新语法并且根据环境进行填充(推荐)
        // entry 入口文件引入全量输出
        useBuiltIns: "usage",
        corejs: 3,
        // modules: false,
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
};

/**
 * 最新ES 语法：比如，箭头函数
 * 最新ES API：，比如，Promise
 * 最新ES 实例方法：比如，String.protorype.includes
 * @babel/preset-env默认支持语法转化，需要开启useBuiltIns配置才能转化API和实例方法。
 */
