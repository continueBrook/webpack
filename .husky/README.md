output:
publicPath: index.html 内部的引用路径
域名 + pulicPath + filename

deverServer
publicPath: 将所有资源放到指定目录下

0.0.0.0 ip 相当于是 127.0.0.1 和 当前联网 ip 地址

proxy: {
"/proxyApi": {
target: "http://127.0.0.1:8080",
pathRewrite: { "^/proxyApi": "" },
},
},
axios({
method: "post",
url: "/index",
});

pathRewrite 替换
axios 中 url => http:127.0.0.1:4000/index
通过 proxy 之后转化为
http://127.0.0.1:8080/index

react 初始版本 ^16.14.0
