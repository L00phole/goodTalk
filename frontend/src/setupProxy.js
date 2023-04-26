const { createProxyMiddleware } = require('http-proxy-middleware');
console.log("proxy");
module.exports = function (app) {
    console.log("proxy2");
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};