module.exports = {
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2020, // 或者使用 'latest' 来自动使用最新版本
        sourceType: 'module', // 启用对 ES6 模块的支持
    },
    plugins: ['react'],
    rules: {
        quotes: ['error', 'single'],
    },
}
