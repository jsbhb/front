
var fs =           require('fs');
var mime =         require('mime');
var https =        require('https');
var iUtil =        require('iUtil');
var multer =       require('multer');
var device =       require('device');
var express =      require('express');
var serveStatic =  require('serve-static');
var middleware =   require('http-proxy-middleware');


var app =           express();
var proxyFilter =   function(pathname, req){
    return true;
};
var proxyOptions =  {
    target:          'https://106.14.185.13:443',
    changeOrigin:    true,
    pathRewrite:     {},
    router: {
        "test.cncoopay.com":       "https://test.cncoopay.com:8082",
        "test2.cncoopay.com":      "https://test2.cncoopay.com:8081",
        "test3.cncoopay.com":      "https://test3.cncoopay.com:8083",
        "testfront.cncoopay.com":  "https://testfront.cncoopay.com:8888",
        "test.cncoopbuy.com":       "https://test.cncoopbuy.com:9082",
        "test2.cncoopbuy.com":      "https://test2.cncoopbuy.com:9081",
        "test3.cncoopbuy.com":      "https://test3.cncoopbuy.com:9083",
        "testfront.cncoopbuy.com":  "https://testfront.cncoopbuy.com:9888",
        "test.东煦.com":             "https://www.东煦.com:7081"
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
