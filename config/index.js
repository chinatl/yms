"use strict";
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      "/api": {
        // 测试环境
        // target: 'http://192.168.31.72:8081', // 接口域名 - 尚旭光
        // target: "http://192.168.31.9:8081" // 接口域名 - 陈小东
        // target: "http://192.168.31.204" // 接口域名 - 景蒙
        // target: 'http://192.168.31.10:8081',  // 接口域名 - 陈普
        // target: "http://192.168.31.14:8081" // 接口域名 - 朱文枭
        target: "http://192.168.31.204:8081" // 接口域名 - 测试服务

        // changeOrigin: true,  //是否跨域
        // pathRewrite: {
        //   '^/apis': ''   //需要rewrite重写的,
        // }
      },
      "/uploadfiles": {
        // target: 'http://47.104.168.31:8080',//阿里云
        // target: 'http://192.168.31.169:8080',  // 接口域名 -谢震
        // target: "http://192.168.31.2:8081" // 接口域名 - 陈普
        // target: 'http://192.168.31.72:8080',  // 接口域名 - 尚旭光
        // target: 'http://192.168.31.8:8080', // 接口域名 - 景蒙
        // target: "http://192.168.31.9:8081" // 接口域名 - 陈小东
        // target: "http://192.168.31.14:8081" // 接口域名 - 朱文枭
        target: "http://192.168.31.204:80" // 接口域名 - 测试服务
        // changeOrigin: true,  //是否跨域
        // pathRewrite: {
        //   '^/apis': ''   //需要rewrite重写的,
        // }
      }
    },

    // Various Dev Server settings
    host: "192.168.31.15", // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "cheap-module-eval-source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../dist/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
