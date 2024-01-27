const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/general/Partner/InquiryTransaction", {
      target: "https://api-testing-murex.vercel.app",
      changeOrigin: true,
    })
  );
};
