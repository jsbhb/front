
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
        "m.cncoopay.com":          "https://m.cncoopay.com:8081",
        "www.cncoopay.com":        "https://www.cncoopay.com:8082",
        "fl.cncoopay.com":         "https://fl.cncoopay.com:8083",
        "front.cncoopay.com":      "https://front.cncoopay.com:8888",
        "m.cncoopbuy.com":          "https://m.cncoopbuy.com:9081",
        "www.cncoopbuy.com":        "https://www.cncoopbuy.com:9082",
        "fl.cncoopbuy.com":         "https://fl.cncoopbuy.com:9083",
        "front.cncoopbuy.com":      "https://front.cncoopbuy.com:9888",
        "www.东煦.com":             "https://www.东煦.com:7081"
    }
};
var privateKey  =   fs.readFileSync('/opt/front/~Mall/pack/.cert/ssl.key', 'utf8');
var certificate =   fs.readFileSync('/opt/front/~Mall/pack/.cert/ssl.pem', 'utf8');
var privateKey_old  =   fs.readFileSync('/opt/front/~Mall/pack/.cert/ssl_old.key', 'utf8');
var certificate_old =   fs.readFileSync('/opt/front/~Mall/pack/.cert/ssl_old.pem', 'utf8');
var privateKey_dx  =   fs.readFileSync('/opt/front/~Mall/pack/.cert/ssl_dx.key', 'utf8');
var certificate_dx =   fs.readFileSync('/opt/front/~Mall/pack/.cert/ssl_dx.pem', 'utf8');
var httpsServer =   https.createServer(app);

httpsServer.addContext('*.cncoopbuy.com', {
    key: privateKey_old,
    cert: certificate_old
});

httpsServer.addContext('*.cncoopay.com', {
    key: privateKey,
    cert: certificate
});

httpsServer.addContext('*.东煦.com', {
    key: privateKey_dx,
    cert: certificate_dx
});

app.use(middleware(proxyFilter, proxyOptions));
httpsServer.listen(443);