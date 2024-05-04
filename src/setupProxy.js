const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/login/oauth2/code/kakao',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
            pathRewrite: {'^/login/oauth2/code/kakao' : ''},
            onProxyRes: function (proxyRes, req, res) {
                if (proxyRes.headers.location) {
                    // 리다이렉트 경로를 클라이언트가 의도한 주소로 수정
                    proxyRes.headers.location = proxyRes.headers.location.replace('http://localhost:8080/login', 'http://localhost:3000');
                }
            }
        })
    );
};
