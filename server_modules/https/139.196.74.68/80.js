
var fs =           require('fs');
var mime =         require('mime');
var iUtil =        require('iUtil');
var multer =       require('multer');
var express =      require('express');
var serveStatic =  require('serve-static');
var middleware =   require('http-proxy-middleware');
var device =       require('device');
var app =          express();


app.all('*', function(req, res){
    var host = req.hostname;
    var path = req.url || '';
    res.redirect(301, "https://" + host + path);
}).listen(80);
