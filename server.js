const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = process.env.PORT || 3000;

// Target website
const TARGET_URL = 'https://stream.aryavidya.cc';

// Proxy middleware jo saare requests ko target site par bhej dega (Cloudflare ko bypass karte hue)
app.use('/', createProxyMiddleware({
    target: TARGET_URL,
    changeOrigin: true,
    secure: false,
    onProxyRes: function (proxyRes, req, res) {
        // Security headers ko relax karna taaki content block na ho
        proxyRes.headers['access-control-allow-origin'] = '*';
    },
    onError: (err, req, res) => {
        res.status(500).send('Proxy Error: ' + err.message);
    }
}));

app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
