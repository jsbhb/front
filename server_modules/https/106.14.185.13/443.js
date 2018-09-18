
var fs =           require('fs');
var mime =         require('mime');
var https =        require('https');
var iUtil =        require('iUtil');
var multer =       require('multer');
var device =       require('device');
var express =      require('express');
var serveStatic =  require('serve-static');
var middleware =   require('http-proxy-middleware');


var app =          express();
var privateKey  =  fs.readFileSync('/opt/front/~Mall/pack/.cert/ssl.key', 'utf8');
var certificate =  fs.readFileSync('/opt/front/~Mall/pack/.cert/ssl.pem', 'utf8');
var httpsServer =  https.createServer({ key: privateKey, cert: certificate }, app);


var proxyFilter =  function(pathname, req){
    return true;
};
var proxyOptions = {
    target:          'https://106.14.185.13:443',
    changeOrigin:    true,
    pathRewrite:     {},
    router: {
        "test.cncoopbuy.com":       "https://test.cncoopbuy.com:8082",
        "test2.cncoopbuy.com":      "https://test2.cncoopbuy.com:8081",
        "test3.cncoopbuy.com":      "https://test3.cncoopbuy.com:8083",
        "testfront.cncoopbuy.com":  "https://testfront.cncoopbuy.com:8888"
    }
};


app.use(middleware(proxyFilter, proxyOptions));
httpsServer.listen(443);