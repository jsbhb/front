
var fs =          require('fs');
var mime =        require('mime');
var https =       require('https');
var iUtil =       require('iUtil');
var multer =      require('multer');
var device =      require('device');
var express =     require('express');
var serveStatic = require('serve-static');
var middleware =  require('http-proxy-middleware');


var app =           express();
var proxyFilter =   function(pathname, req){
    return true;
};
var proxyOptions =  {
    target:          'https://139.196.74.68:443',
    changeOrigin:    true,
    pathRewrite:     {},
    router: {
        "m.cncoopbuy.com":          "https://m.cncoopbuy.com:8081",
        "www.cncoopbuy.com":        "https://www.cncoopbuy.com:8082",
        "fl.cncoopbuy.com":         "https://fl.cncoopbuy.com:8083",
        "front.cncoopbuy.com":      "https://front.cncoopbuy.com:8888"
    }
};
var privateKey  =   fs.readFileSync('/opt/front/~Mall/pack/.cert/ssl.key', 'utf8');
var certificate =   fs.readFileSync('/opt/front/~Mall/pack/.cert/ssl.pem', 'utf8');
var httpsServer =   https.createServer({ key: privateKey, cert: certificate }, app);


app.use(middleware(proxyFilter, proxyOptions));
httpsServer.listen(443);