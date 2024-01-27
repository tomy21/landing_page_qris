const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/general/Partner/InquiryTransaction", {
      target: "http://147.139.135.195:2101",
      changeOrigin: true,
    })
  );
};
