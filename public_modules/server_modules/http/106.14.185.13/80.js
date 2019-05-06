
var fs =           require('fs');
var mime =         require('mime');
var iUtil =        require('iUtil');
var multer =       require('multer');
var express =      require('express');
var serveStatic =  require('serve-static');
var middleware =   require('http-proxy-middleware');
var device =       require('device');
var app =          express();


var proxyFilter =  function(pathname, req){
    return req.hostname !== "106.14.185.13";
};
var proxyOptions = {
    target: 'http://106.14.185.13:80',
    changeOrigin: true,
    pathRewrite: {},
    router: {
        "test2.cncoopay.com":      "http://106.14.185.13:8081",
        "test.cncoopay.com":       "http://106.14.185.13:8082",
        "test3.cncoopay.com":      "http://106.14.185.13:8083",
        "testfront.cncoopay.com":  "http://106.14.185.13:8888"
    }
};

app.use(middleware(proxyFilter, proxyOptions));
app.listen(80);

