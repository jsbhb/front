
var fs =           require('fs');
var mime =         require('mime');
var iUtil =        require('iUtil');
var multer =       require('multer');
var express =      require('express');
var serveStatic =  require('serve-static');
var middleware =   require('http-proxy-middleware');
var device =       require('device');


var app =           express();
var proxyFilter =   function(pathname, req){
    return req.hostname !== "139.196.74.68";
};
var proxyOptions =  {
    target: 'http://139.196.74.68:80',
    changeOrigin: true,
    pathRewrite: {},
    router: {
        "m.cncoopay.com":          "http://139.196.74.68:8081",
        "www.cncoopay.com":        "http://139.196.74.68:8082",
        "fl.cncoopay.com":         "http://139.196.74.68:8083",
        "front.cncoopay.com":      "http://139.196.74.68:8888"
    }
};


app.use(middleware(proxyFilter, proxyOptions));
app.listen(80);

