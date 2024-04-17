const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/login', // 이제 '/login'으로 시작하는 요청을 대상으로 프록시 설정을 적용합니다.
    createProxyMiddleware({
      target: 'http://localhost:8080', // 백엔드 서버 URL
      changeOrigin: true,
    })
  );
};
