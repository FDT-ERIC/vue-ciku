module.exports = {
  lintOnSave: false,
  publicPath: "./",
  devServer: {
    open: true, // 当服务启动时，启动浏览器打开，也可以用'chrome'或--open 'chrome'
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      // 配置跨域
      '/api': {
        target: 'http://106.75.137.205:8088/api/',
        // ws: true,
        changOrigin: true, // 跨域
        pathRewrite: {
          '^/api': ''
        }
      }
      // 配置跨域
      // '/model': {
      //   target: BASEURL,
      //   // ws: true,;
      //   changOrigin: true
      // },
      // '/dataset': {
      //   target: BASEURL,
      //   // ws: true,;
      //   changOrigin: true
      // },
      // '/download': {
      //   target: BASEURL,
      //   // ws: true,;
      //   changOrigin: true
      // },
      // '/upload': {
      //   target: BASEURL,
      //   // ws: true,;
      //   changOrigin: true
      // },
      // '/code': {
      //   target: BASEURL,
      //   // ws: true,;
      //   changOrigin: true
      // },
    },
    before: app => { }
  }

};
