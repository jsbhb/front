
var fs =           require('fs');
var mime =         require('mime');
var iUtil =        require('iUtil');
var https =        require('https');
var multer =       require('multer');
var express =      require('express');
var bodyParser =   require('body-parser');
var compression =  require('compression');
var serveStatic =  require('serve-static');
var middleware =   require('http-proxy-middleware');
var device =       require('device');


var edition =       '';
var defRegion =     '/www';
var rootPath =      '/opt/front';
var mDomain =       'https://m.cncoopbuy.com';
var pDomain =       'https://www.cncoopbuy.com';
var fDomain =       'https://fl.cncoopbuy.com';
var certPath =      rootPath + '/~Mall' + edition + '/pack/.cert';
var dataPath =      rootPath + '/~Mall' + edition + '/data/mall/mp';
var pDataPath =     rootPath + '/~Mall' + edition + '/data/mall/public';
var regDataPath =   rootPath + '/~Mall' + edition + '/pack/region' + defRegion + '/data/mall/mp';
var regPDataPath =  rootPath + '/~Mall' + edition + '/pack/region' + defRegion + '/data/mall/public';
var safePath =      rootPath + '/~Mall' + edition + '/pack/region' + defRegion + '/app/mp/security';
var regWebPath =    rootPath + '/~Mall' + edition + '/pack/region' + defRegion + '/app/mp/web';
var regPath =       rootPath + '/~Mall' + edition + '/pack/region' + defRegion + '/app/mp';
var sysWebPath2 =   rootPath + '/~Mall' + edition + '/app/mp/web2';
var sysWebPath =    rootPath + '/~Mall' + edition + '/app/mp/web';
var sysPath =       rootPath + '/~Mall' + edition + '/app/mp';
var pModPath =      rootPath + '/public_modules';


var app =           express();
var router =        express.Router();
var shouldFilter =  function(req, res){
    var contentType = res.get('Content-Type');
    var isImage = (/image\/.+/gi).test(contentType);
    var isAudio = (/audio\/.+/gi).test(contentType);
    var isVideo = (/video\/.+/gi).test(contentType);
    return !isImage && !isAudio && !isVideo && true;
};
var proxyFilter =   function(pathname, req){
    return false;
};
var proxyOptions =  {
    target: 'https://m.cncoopbuy.com',
    changeOrigin: true,
    pathRewrite: {},
    router: {}
};
var privateKey  =   fs.readFileSync(certPath + '/ssl.key', 'utf8');
var certificate =   fs.readFileSync(certPath + '/ssl.pem', 'utf8');
var httpsServer =   https.createServer({ key: privateKey, cert: certificate }, app);


router.all('*', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var isOptions =   (/^OPTIONS$/i).test(req.method);
    var isAtWeChat =  device(req.get("User-Agent")).weChat();
    var isHostname =  (/^m\.cncoopbuy\.com$/).test(req.hostname);
    if (!isHostname) {
        res.redirect(301, "https://" + req.hostname + req.url);
        return;
    }
    if (isOptions) {
        res.send(200);
        return;
    }
    isAtWeChat && res.set({ 'Connection': 'keep-alive', 'Cache-Control': 'max-age=0', 'Accept-Ranges': 'bytes' });
    isAtWeChat || res.set({ 'Connection': 'keep-alive', 'Cache-Control': 'max-age=0', 'Accept-Ranges': 'bytes' });
    next();
});
router.get('*', function(req, res, next){
    var appTags =         '';
    var appFile =         '';
    var appData =         '';
    var filePath =        '';
    var tempPath =        '';
    var lastModified =    '';
    var goodsId =         '';
    var startIndex =      '';
    var pathQuerys =      '';
    var pathMapUrl =      '';
    var pathMapData =     '';
    var pathMapJSON =     '';
    var newPathUrl =      '';
    var regPathMapUrl =   '';
    var regPathMapData =  '';
    var regPathMapJSON =  '';
    var newRegPathUrl =   '';
    var validate =        null;
    var reqPath =         decodeURI(req.path);
    var iDevice =         device(req.get("User-Agent"));
    var iRedirect =       iDevice.mobile() && mDomain && null;
    var isData =          (/^\/?data\/[^\/]+\/?/i).test(reqPath);
    var isError =         (/^\/error(\.htm|\.html)$/i).test(reqPath);
    var isOldUrl =        (/^\/goodsDetail(\.html|\.html)$/i).test(reqPath);
    var isNewUrl =        (/^\/[^\/]+\/[^\/]+\/[^\/]+\/\d+(\.html|\.html)$/i).test(reqPath);
    var isIndex =         (/^\/$|^\/index(\.htm|\.html)$/i).test(reqPath);
    var isHtml =          (/\.htm$|\.html$/i).test(reqPath);
    if(isData){
        switch (req.query.dataType){
            case 'navData':
                tempPath = reqPath.replace(/^(\/?data\/)([^\/]+)/i, '$2').replace(/\.json$/i,  (req.query.code? "_" + req.query.code: '')+'.json');
                break;
            default:
                tempPath = reqPath.replace(/^(\/?data\/)([^\/]+)/i, '$2');
        }
        filePath || (filePath = iUtil.isFileSync(regDataPath + '/' + tempPath) && regDataPath + '/' + tempPath);
        filePath || (filePath = iUtil.isFileSync(regPDataPath + '/' + tempPath) && regPDataPath + '/' + tempPath);
        filePath || (filePath = iUtil.isFileSync(dataPath + '/' + tempPath) && dataPath + '/' + tempPath);
        filePath || (filePath = iUtil.isFileSync(pDataPath + '/' + tempPath) && pDataPath + '/' + tempPath);
        filePath && (lastModified = iUtil.inInfoSync(filePath).mtime.toUTCString());
        filePath && res.setHeader("Content-Type", mime.getType(filePath));
        filePath && res.setHeader("Last-Modified", lastModified);
        filePath && res.send(iUtil.getFileSync(filePath, 'utf-8'));
        filePath || next();
    }
    else if(isError){
        //域名适配
        validate || (validate = iUtil.isFileSync(safePath + '/error.html'));
        validate || (iRedirect && res.redirect(302, iRedirect));
        validate && (iRedirect && (iRedirect = null));
        //文件路径
        iRedirect || filePath || (filePath = iUtil.isFileSync(safePath + '/error.html') && safePath + '/error.html');
        iRedirect || filePath || (filePath = iUtil.isFileSync(regWebPath + '/error.html') && regWebPath + '/error.html');
        iRedirect || filePath || (filePath = iUtil.isFileSync(sysWebPath + '/error.html') && sysWebPath + '/error.html');
        iRedirect || filePath || (filePath = iUtil.isFileSync(sysWebPath2 + '/error.html') && sysWebPath2 + '/error.html');
        //访问文件
        iRedirect || filePath && (appFile = iUtil.getFileSync(filePath, 'utf-8'));
        iRedirect || filePath && (appTags = ['<div id="nav-1-\\d+" v-cloak>', '</div>']);
        iRedirect || filePath && (appData = iUtil.getFileSync(dataPath + '/nav/1p.html', 'utf-8'));
        iRedirect || filePath && (lastModified = iUtil.inInfoSync(filePath).mtime.toUTCString());
        iRedirect || filePath && res.setHeader("Content-Type", mime.getType(filePath));
        iRedirect || filePath && res.setHeader("Last-Modified", lastModified);
        iRedirect || filePath && res.send(iUtil.append(appFile, appTags, appData));
        //下一步
        iRedirect || filePath || next();
    }
    else if(isOldUrl){
        goodsId = req.query.goodsId;
        startIndex = req.originalUrl.indexOf("?");
        pathQuerys = startIndex !== -1? req.originalUrl.substring(startIndex): '';
        regPathMapData = iUtil.getFileSync(regPDataPath + '/map/goods.json');
        regPathMapJSON = JSON.parse(regPathMapData || '{}') || {};
        newRegPathUrl = regPathMapJSON && regPathMapJSON[goodsId] && regPathMapJSON[goodsId].href && regPathMapJSON[goodsId].href + pathQuerys;
        pathMapData = iUtil.getFileSync(pDataPath + '/map/goods.json');
        pathMapJSON = JSON.parse(pathMapData || '{}') || {};
        newPathUrl = pathMapJSON && pathMapJSON[goodsId] && pathMapJSON[goodsId].href && pathMapJSON[goodsId].href + pathQuerys;
        //域名适配
        validate || (validate = iUtil.isFileSync(safePath + newRegPathUrl));
        validate || (validate = iUtil.isFileSync(safePath + newPathUrl));
        validate || (iRedirect && res.redirect(302, iRedirect));
        validate && (iRedirect && (iRedirect = null));
        //访问文件
        iRedirect || newRegPathUrl && res.redirect(301, newRegPathUrl);
        iRedirect || newRegPathUrl || newPathUrl && res.redirect(301, newPathUrl);
        iRedirect || newRegPathUrl || newPathUrl || res.redirect(302, '/error.html');
    }
    else if(isNewUrl){
        goodsId = reqPath.split("/").pop().replace(/(\.html|\.html)$/i, "");
        startIndex = req.originalUrl.indexOf("?");
        pathQuerys = startIndex !== -1? req.originalUrl.substring(startIndex): '';
        regPathMapData = iUtil.getFileSync(regPDataPath + '/map/goods.json');
        regPathMapJSON = JSON.parse(regPathMapData || '{}') || {};
        regPathMapUrl = regPathMapJSON && regPathMapJSON[goodsId] && regPathMapJSON[goodsId].href !== reqPath;
        newRegPathUrl = regPathMapUrl && regPathMapJSON && regPathMapJSON[goodsId] && regPathMapJSON[goodsId].href && regPathMapJSON[goodsId].href + pathQuerys;
        pathMapData = iUtil.getFileSync(pDataPath + '/map/goods.json');
        pathMapJSON = JSON.parse(pathMapData || '{}') || {};
        pathMapUrl = pathMapJSON && pathMapJSON[goodsId] && pathMapJSON[goodsId].href !== reqPath;
        newPathUrl = pathMapUrl && pathMapJSON && pathMapJSON[goodsId] && pathMapJSON[goodsId].href && pathMapJSON[goodsId].href + pathQuerys;
        //域名适配
        validate || (validate = iUtil.isFileSync(safePath + newRegPathUrl));
        validate || (validate = iUtil.isFileSync(safePath + newPathUrl));
        validate || (validate = iUtil.isFileSync(safePath + '/' + reqPath));
        validate || (iRedirect && res.redirect(302, iRedirect));
        validate && (iRedirect && (iRedirect = null));
        //文件路径
        iRedirect || filePath || (filePath = iUtil.isFileSync(safePath + '/' + reqPath) && safePath + '/' + reqPath);
        iRedirect || filePath || (filePath = iUtil.isFileSync(regWebPath + '/' + reqPath) && regWebPath + '/' + reqPath);
        iRedirect || filePath || (filePath = iUtil.isFileSync(sysWebPath + '/' + reqPath) && sysWebPath + '/' + reqPath);
        iRedirect || filePath || (filePath = iUtil.isFileSync(sysWebPath2 + '/' + reqPath) && sysWebPath2 + '/' + reqPath);
        //访问文件
        iRedirect || filePath && (appFile = iUtil.getFileSync(filePath, 'utf-8'));
        iRedirect || filePath && (appTags = ['<div id="nav-1-\\d+" v-cloak>', '</div>']);
        iRedirect || filePath && (appData = iUtil.getFileSync(dataPath + '/nav/1p.html', 'utf-8'));
        iRedirect || filePath && (lastModified = iUtil.inInfoSync(filePath).mtime.toUTCString());
        iRedirect || filePath && res.setHeader("Content-Type", mime.getType(filePath));
        iRedirect || filePath && res.setHeader("Last-Modified", lastModified);
        iRedirect || filePath && res.send(iUtil.append(appFile, appTags, appData));
        //下一步
        iRedirect || filePath || newRegPathUrl && res.redirect(301, newRegPathUrl);
        iRedirect || filePath || newRegPathUrl || newPathUrl && res.redirect(301, newPathUrl);
        iRedirect || filePath || newRegPathUrl || newPathUrl || res.redirect(302, '/error.html');
    }
    else if(isIndex){
        //域名适配
        validate || (validate = iUtil.isFileSync(safePath + '/index.html'));
        validate || (iRedirect && res.redirect(302, iRedirect));
        validate && (iRedirect && (iRedirect = null));
        //文件路径
        iRedirect || filePath || (filePath = iUtil.isFileSync(safePath + '/index.html') && safePath + '/index.html');
        iRedirect || filePath || (filePath = iUtil.isFileSync(regWebPath + '/index.html') && regWebPath + '/index.html');
        iRedirect || filePath || (filePath = iUtil.isFileSync(sysWebPath + '/index.html') && sysWebPath + '/index.html');
        iRedirect || filePath || (filePath = iUtil.isFileSync(sysWebPath2 + '/index.html') && sysWebPath2 + '/index.html');
        //访问文件
        iRedirect || filePath && (appFile = iUtil.getFileSync(filePath, 'utf-8'));
        iRedirect || filePath && (appTags = ['<div id="nav-1-\\d+" v-cloak>', '</div>']);
        iRedirect || filePath && (appData = iUtil.getFileSync(dataPath + '/nav/1p.html', 'utf-8'));
        iRedirect || filePath && (lastModified = iUtil.inInfoSync(filePath).mtime.toUTCString());
        iRedirect || filePath && res.setHeader("Content-Type", mime.getType(filePath));
        iRedirect || filePath && res.setHeader("Last-Modified", lastModified);
        iRedirect || filePath && res.send(iUtil.append(appFile, appTags, appData));
        //下一步
        iRedirect || filePath || res.redirect(302, '/error.html');
    }
    else if(isHtml){
        //域名适配
        validate || (validate = iUtil.isFileSync(safePath + '/' + reqPath));
        validate || (iRedirect && res.redirect(302, iRedirect));
        validate && (iRedirect && (iRedirect = null));
        //文件路径
        iRedirect || filePath || (filePath = iUtil.isFileSync(safePath + '/' + reqPath) && safePath + '/' + reqPath);
        iRedirect || filePath || (filePath = iUtil.isFileSync(regWebPath + '/' + reqPath) && regWebPath + '/' + reqPath);
        iRedirect || filePath || (filePath = iUtil.isFileSync(sysWebPath + '/' + reqPath) && sysWebPath + '/' + reqPath);
        iRedirect || filePath || (filePath = iUtil.isFileSync(sysWebPath2 + '/' + reqPath) && sysWebPath2 + '/' + reqPath);
        //访问文件
        iRedirect || filePath && (appFile = iUtil.getFileSync(filePath, 'utf-8'));
        iRedirect || filePath && (appTags = ['<div id="nav-1-\\d+" v-cloak>', '</div>']);
        iRedirect || filePath && (appData = iUtil.getFileSync(dataPath + '/nav/1p.html', 'utf-8'));
        iRedirect || filePath && (lastModified = iUtil.inInfoSync(filePath).mtime.toUTCString());
        iRedirect || filePath && res.setHeader("Content-Type", mime.getType(filePath));
        iRedirect || filePath && res.setHeader("Last-Modified", lastModified);
        iRedirect || filePath && res.send(iUtil.append(appFile, appTags, appData));
        //下一步
        iRedirect || filePath || res.redirect(302, '/error.html');
    }
    else {
        //域名适配
        validate || (validate = iUtil.isFileSync(safePath + '/' + reqPath));
        validate || (iRedirect && res.redirect(302, iRedirect));
        validate && (iRedirect && (iRedirect = null));
        //文件路径
        iRedirect || filePath || (filePath = iUtil.isFileSync(safePath + '/' + reqPath) && safePath + '/' + reqPath);
        iRedirect || filePath || (filePath = iUtil.isFileSync(regPath + '/' + reqPath) && regPath + '/' + reqPath);
        iRedirect || filePath || (filePath = iUtil.isFileSync(sysPath + '/' + reqPath) && sysPath + '/' + reqPath);
        iRedirect || filePath || (filePath = iUtil.isFileSync(pModPath + '/' + reqPath) && pModPath + '/' + reqPath);
        //访问文件
        iRedirect || filePath && (lastModified = iUtil.inInfoSync(filePath).mtime.toUTCString());
        iRedirect || filePath && res.setHeader("Content-Type", mime.getType(filePath));
        iRedirect || filePath && res.setHeader("Last-Modified", lastModified);
        iRedirect || filePath && res.send(iUtil.getFileSync(filePath));
        //下一步
        iRedirect || filePath || next();
    }
});


app.use(compression({filter: shouldFilter}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(middleware(proxyFilter, proxyOptions), router);
httpsServer.listen(8081);