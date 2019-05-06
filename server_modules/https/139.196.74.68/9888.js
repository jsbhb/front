
var fs =           require('fs');
var redis =        require('redis');
var iUtil =        require('iUtil');
var https =        require('https');
var multer =       require('multer');
var device =       require('device');
var bodyParser =   require('body-parser');
var compression =  require('compression');
var schedule =     require('node-schedule');
var xlsx =         require('node-xlsx');
var app =          require('express')();


var visitTimer =      null;
var VisitOnceTimer =  null;
var isDebug =         false;
var edition =         '';
var defRegion =       '/www';
var rootPath =        '/opt/front/~Mall' + edition;
var certPath =        '/opt/front/~Mall' + edition + '/pack/.cert';
var mDomain =         'https://m.cncoopbuy.com';
var pDomain =         'https://www.cncoopbuy.com';
var fDomain =         'https://fl.cncoopbuy.com';

var privateKey  =     fs.readFileSync(certPath + '/ssl_old.key', 'utf8');
var certificate =     fs.readFileSync(certPath + '/ssl_old.pem', 'utf8');
var httpsServer =     https.createServer({ key: privateKey, cert: certificate }, app);
var client =          redis.createClient(6379, 'r-uf6ea16669ac6594.redis.rds.aliyuncs.com', {});


var DBHandle = function(opt) {
    var req =       opt.req;
    var res =       opt.res;
    var code =      opt.code;
    var page =      opt.page;
    var goods =     opt.goods;
    var handle =    opt.handle;
    var systems =   opt.systems;
    var goodsPath = {};
    systems.forEach(function (system, index) {
        var html =      null;
        var json =      null;
        var distMod =   null;
        var distType =  null;
        var fileData =  null;
        var jsonFile =  null;
        var dataFile =  null;
        var htmlFile =  null;
        var htmlTags =  null;
        var pathList =  null;

        switch (page) {
            case "goodsDetail":
                goodsFunc();
                break;
        }
        switch (system) {
            case "pcMall":
                distType =   '/data/mall/pc';
                distMod =  rootPath + '/app/pc/scripts/module';
                break;
            case "mpMall":
                distType =   '/data/mall/mp';
                distMod =  rootPath + '/app/mp/scripts/module';
                break;
            case "fmpMall":
                distType =   '/data/mall/fmp';
                distMod =  rootPath + '/app/fmp/scripts/module';
                break;
        }
        switch (system + ':' + page) {
            case 'pcMall:index':
                pcNavFunc();
                break;
            case 'fmpMall:goodsDetail':
                fmpNavFunc();
                break;
            case 'fmpMall:nav':
                fmpNavFunc();
                break;
        }
        switch (system + ':' + code) {
            case 'pcMall:nav':
                pcNavFunc();
                break;
            case 'fmpMall:nav':
                fmpNavFunc();
                break;
        }
        switch (system + ':' + handle) {
            case 'fmpMall:goods':
                fmpNavFunc();
                break;
        }

        function pathFunc() {
            var regFile = null;
            var regPath = rootPath + '/pack/region';
            var regInfo = iUtil.getDirSync(regPath);
            if (!pathList) {
                pathList = [rootPath];
                regInfo.forEach(function(file){
                    regFile = regPath + '/' + file;
                    iUtil.isDirSync(regFile) && pathList.push(regFile);
                })
            }
        }
        function goodsFunc() {
            if (!pathList) {
                pathFunc();
            }
            for (var i in pathList) {
                if (pathList[i]) {
                    var publicDB =  pathList[i] + '/data/mall/public';
                    var goodsMapFile = publicDB + "/map/goods.json";
                    var goodsMapCont = iUtil.getFileSync(goodsMapFile, 'utf-8');
                    var oldGoodsPath = JSON.parse(goodsMapCont || '{}');
                    var newGoodsPath = iUtil.inExtend({}, oldGoodsPath);
                    var goodsIsExist = iUtil.isArray(goods) && !iUtil.isEmpty(goods);
                    var oldPathIsExist = iUtil.isObject(oldGoodsPath) && !iUtil.isEmpty(oldGoodsPath);
                    var newPathIsExist = iUtil.isObject(newGoodsPath) && !iUtil.isEmpty(newGoodsPath);
                    if (goodsIsExist && newPathIsExist) {
                        goods.forEach(function(goodsId){
                            var file = goodsId + 'd.json';
                            if (iUtil.isFileSync(publicDB + '/goods/' + file)) {
                                var json = iUtil.getFileSync(publicDB + '/goods/' + file, 'utf-8');
                                var data = json && Object.assign({}, JSON.parse(json || '{}')) || {};
                                var contObj = iUtil.isObject(data) && iUtil.isObject(data.cont) && data.cont;
                                if (!contObj && newGoodsPath[contObj.goodsId]) {
                                    delete newGoodsPath[contObj.goodsId];
                                }
                                if (contObj) {
                                    newGoodsPath[contObj.goodsId] = {};
                                    newGoodsPath[contObj.goodsId].href = contObj.href || "";
                                    newGoodsPath[contObj.goodsId].firstId = contObj.firstCategory || "";
                                    newGoodsPath[contObj.goodsId].secondId = contObj.secondCategory || "";
                                    newGoodsPath[contObj.goodsId].thirdId = contObj.thirdCategory || "";
                                }
                            }
                            else {
                                delete newGoodsPath[goodsId];
                            }
                        })
                    }
                    if (!goodsIsExist || !newPathIsExist) {
                        newGoodsPath = {};
                        iUtil.getDirSync(publicDB + '/goods').forEach(function(file){
                            if (iUtil.isFileSync(publicDB + '/goods/' + file)) {
                                var json = iUtil.getFileSync(publicDB + '/goods/' + file, 'utf-8');
                                var data = json && Object.assign({}, JSON.parse(json || '{}')) || {};
                                var contObj = iUtil.isObject(data) && iUtil.isObject(data.cont) && data.cont;
                                if (!contObj && newGoodsPath[contObj.goodsId]) {
                                    delete newGoodsPath[contObj.goodsId];
                                }
                                if (contObj) {
                                    newGoodsPath[contObj.goodsId] = {};
                                    newGoodsPath[contObj.goodsId].href = contObj.href || "";
                                    newGoodsPath[contObj.goodsId].firstId = contObj.firstCategory || "";
                                    newGoodsPath[contObj.goodsId].secondId = contObj.secondCategory || "";
                                    newGoodsPath[contObj.goodsId].thirdId = contObj.thirdCategory || "";
                                }
                            }
                        });
                    }
                    if (!iUtil.isEmpty(oldPathIsExist)) { goodsPath[pathList[i]] = oldGoodsPath; }
                    if (iUtil.isEmpty(oldPathIsExist)) { goodsPath[pathList[i]] = newGoodsPath; }
                    if (!iUtil.isEmpty(newGoodsPath)) { iUtil.setFileSync(publicDB + "/map/goods.json", JSON.stringify(newGoodsPath, null, 2), true); }
                    if (iUtil.isEmpty(newGoodsPath)) { iUtil.delFileSync(publicDB + "/map/goods.json"); iUtil.clrDirSync(publicDB); }
                }
            }
        }
        function pcNavFunc() {
            if (!pathList) {
                pathFunc();
            }
            for (var i in pathList) {
                var distDB;
                var publicDB;
                var rootDistDB;
                var rootPublicDB;
                var distFile;
                var publicFile;
                var rootDistFile;
                var rootPublicFile;
                if (pathList[i]) {
                    json = [];
                    fileData = {};
                    distDB = pathList[i] + distType;
                    rootDistDB = rootPath + distType;
                    dataFile = distDB + '/nav/1p.html';
                    htmlFile = distMod + '/nav-1.mustache';
                    htmlTags = ['<div id="nav-1-{{sign}}" v-cloak>','</div>'];
                    publicDB = pathList[i] + '/data/mall/public';
                    rootPublicDB = rootPath + '/data/mall/public';
                    distFile = distDB + '/nav/1p.json';
                    publicFile = publicDB + '/nav/1d.json';
                    rootDistFile = rootDistDB + '/nav/1p.json';
                    rootPublicFile = rootPublicDB + '/nav/1d.json';
                    if (iUtil.isFileSync(distFile) || iUtil.isFileSync(publicFile)) {
                        iUtil.isFileSync(distFile) && json.push(iUtil.getFileSync(distFile, 'utf-8'));
                        iUtil.isFileSync(distFile) || json.push(iUtil.getFileSync(rootDistFile, 'utf-8'));
                        iUtil.isFileSync(publicFile) && json.push(iUtil.getFileSync(publicFile, 'utf-8'));
                        iUtil.isFileSync(publicFile) || json.push(iUtil.getFileSync(rootPublicFile, 'utf-8'));
                        json.forEach(function(v){ v && Object.assign(fileData, JSON.parse(v)) });
                    }
                    iUtil.isEmpty(fileData) || (html = iUtil.finds(iUtil.getFileSync(htmlFile, 'utf-8'), htmlTags));
                    iUtil.isEmpty(fileData) || iUtil.setFileSync(dataFile, iUtil.clean(iUtil.render(html, fileData)), true);
                    iUtil.isEmpty(fileData) && iUtil.delFileSync(dataFile);
                }
            }
        }
        function fmpNavFunc() {
            if (!pathList) {
                pathFunc();
            }
            for (var i in pathList) {
                if (pathList[i]) {
                    var tFile;
                    var navFile;
                    var rootNavFile;
                    var goodsKey;
                    var goodsDir;
                    var finallyDB;
                    var distDB = pathList[i] + distType;
                    var publicDB = pathList[i] + '/data/mall/public';
                    var rootPublicDB = rootPath + '/data/mall/public';
                    var fFile = distDB  + '/nav/1f.json';
                    var mFile = distDB  + '/nav/1m.json';
                    var tData = { data: {} };
                    var fData = { data: {} };
                    var mData = { data: [] };
                    var isFirst = true;

                    json = [];
                    fileData = {};
                    dataFile = distDB  + '/nav/1p.html';
                    jsonFile = distDB  + '/nav/1p.json';
                    htmlFile = distMod + '/nav-1.mustache';
                    htmlTags = ['<div id="nav-1-{{sign}}" v-cloak>','</div>'];
                    goodsDir = publicDB + '/goods/';
                    navFile = publicDB + '/nav/1d.json';
                    rootNavFile = rootPublicDB + '/nav/1d.json';

                    if (iUtil.isDirSync(goodsDir) || iUtil.isFileSync(navFile)) {
                        iUtil.isDirSync(goodsDir) && (finallyDB = publicDB);
                        iUtil.isDirSync(goodsDir) && (goodsKey = pathList[i]);
                        iUtil.isDirSync(goodsDir) || (finallyDB = rootPublicDB);
                        iUtil.isDirSync(goodsDir) || (goodsKey = rootPath);
                        iUtil.isFileSync(navFile) && json.push(iUtil.getFileSync(navFile, 'utf-8'));
                        iUtil.isFileSync(navFile) || json.push(iUtil.getFileSync(rootNavFile, 'utf-8'));
                        json.forEach(function(v){ v && Object.assign(fileData, JSON.parse(v)) });
                    }

                    if (iUtil.isObject(fileData) && iUtil.isArray(fileData.data)) {
                        var navCont = iUtil.getFileSync(jsonFile, 'utf-8');
                        var navData = JSON.parse(navCont || '{ "data": {} }');
                        var goodsIsExist = iUtil.isArray(goods) && !iUtil.isEmpty(goods);
                        var navDataIsExist = iUtil.isObject(navData) && iUtil.isObject(navData.data) && !iUtil.isEmpty(navData.data);

                        if (!goodsPath[goodsKey]) {
                            goodsPath[goodsKey] = JSON.parse(iUtil.getFileSync(finallyDB + "/map/goods.json", 'utf-8') || '{}');
                        }

                        if (goodsIsExist && navDataIsExist) {
                            goods.forEach(function(goodsId){
                                var file = goodsId + 'd.json';
                                var goodsData = goodsPath[goodsKey][goodsId];
                                var tFirstId =  goodsData && goodsData.firstId;
                                var tSecondId = goodsData && goodsData.secondId;
                                var tThirdId =  goodsData && goodsData.thirdId;

                                if (tFirstId && tSecondId && tThirdId) {
                                    var tFirstObj = navData.data[tFirstId] || {};
                                    if (!iUtil.isEmpty(tFirstObj) && !iUtil.isEmpty(tFirstObj.dictList)) {
                                        var tSecondObj = tFirstObj['dictList'][tSecondId] || {};
                                        if (!iUtil.isEmpty(tSecondObj) && !iUtil.isEmpty(tSecondObj.entryList)) {
                                            var tThirdObj = tSecondObj['entryList'][tThirdId] || {};
                                            if (!iUtil.isEmpty(tThirdObj) && !iUtil.isEmpty(tThirdObj.goods)) {
                                                if (tThirdObj.goods[goodsId]) {
                                                    delete tThirdObj.goods[goodsId];
                                                }
                                                if (iUtil.isEmpty(tThirdObj.goods)) {
                                                    delete tSecondObj['entryList'][tThirdId];
                                                }
                                            }
                                            if (iUtil.isEmpty(tSecondObj.entryList)) {
                                                delete tFirstObj['dictList'][tSecondId];
                                            }
                                        }
                                        if (iUtil.isEmpty(tFirstObj.dictList)) {
                                            delete navData.data[tFirstId];
                                        }
                                    }
                                }

                                if (iUtil.isFileSync(finallyDB + '/goods/' + file)) {
                                    var k1, k2, k3, l1, l2, l3;
                                    var json = iUtil.getFileSync(finallyDB + '/goods/' + file, 'utf-8');
                                    var data = json && Object.assign({}, JSON.parse(json || '{}')) || {};
                                    var contObj = iUtil.isObject(data) && iUtil.isObject(data.cont) && data.cont;
                                    if (contObj) {
                                        var specsList = contObj.goodsSpecsList;
                                        if (iUtil.isArray(specsList)) {
                                            for (var n = 0; n < specsList.length; n++) {
                                                var itemObj = specsList[n];
                                                if (itemObj.fx === 0 || itemObj.fx === '0') {
                                                    specsList.splice(n, 1);
                                                    n--;
                                                }
                                            }
                                        }
                                    }
                                    if (contObj && iUtil.isArray(specsList) && !iUtil.isEmpty(specsList)) {
                                        var id = contObj.goodsId;
                                        var firstId =  contObj.firstCategory;
                                        var secondId = contObj.secondCategory;
                                        var thirdId =  contObj.thirdCategory;
                                        if (id && firstId && secondId && thirdId) {
                                            for (k1 = 0, l1 = fileData.data.length; k1 < l1; k1++) {
                                                var firstData = fileData.data[k1];
                                                if(iUtil.isObject(firstData) && firstData.id === firstId){
                                                    var fCache = {};
                                                    for (var f in firstData) {
                                                        if (f !== 'dictList') {
                                                            fCache[f] = firstData[f];
                                                        }
                                                        else {
                                                            fCache[f] = {};
                                                        }
                                                    }
                                                    if (iUtil.isArray(firstData.dictList)){
                                                        for (k2 = 0, l2 = firstData.dictList.length; k2 < l2; k2++) {
                                                            var secondData = firstData.dictList[k2];
                                                            if(iUtil.isObject(secondData) && secondData.id === secondId) {
                                                                var sCache = {};
                                                                for (var s in secondData) {
                                                                    if (s !== 'entryList') {
                                                                        sCache[s] = secondData[s];
                                                                    }
                                                                    else {
                                                                        sCache[s] = {};
                                                                    }
                                                                }
                                                                if (iUtil.isArray(secondData.entryList)){
                                                                    for (k3 = 0, l3 = secondData.entryList.length; k3 < l3; k3++) {
                                                                        var thirdData = secondData.entryList[k3];
                                                                        if(iUtil.isObject(thirdData) && thirdData.id === thirdId) {
                                                                            var tCache = {};
                                                                            for (var t in thirdData) {
                                                                                tCache[t] = thirdData[t];
                                                                            }
                                                                            var firstObj = navData.data[firstId] = navData.data[firstId] || fCache;
                                                                            var secondObj = firstObj['dictList'][secondId] = firstObj['dictList'][secondId] || sCache;
                                                                            var thirdObj = secondObj['entryList'][thirdId] = secondObj['entryList'][thirdId] || tCache;
                                                                            thirdObj.goods = thirdObj.goods || {};
                                                                            thirdObj.goods[id] = contObj;
                                                                            break;
                                                                        }
                                                                    }
                                                                }
                                                                break;
                                                            }
                                                        }
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        }

                        if (!goodsIsExist || !navDataIsExist) {
                            navData = { "data": {} };
                            iUtil.getDirSync(finallyDB + '/goods').forEach(function(file){
                                if (iUtil.isFileSync(finallyDB + '/goods/' + file)) {
                                    var k1, k2, k3, l1, l2, l3;
                                    var json = iUtil.getFileSync(finallyDB + '/goods/' + file, 'utf-8');
                                    var data = json && Object.assign({}, JSON.parse(json)) || {};
                                    var contObj = iUtil.isObject(data.cont) && data.cont;
                                    if (contObj) {
                                        var specsList = contObj.goodsSpecsList;
                                        var isArray = iUtil.isArray(specsList);
                                        if (isArray) {
                                            for (var n = 0; n < specsList.length; n++) {
                                                var itemObj = specsList[n];
                                                if (itemObj.fx === 0 || itemObj.fx === '0') {
                                                    specsList.splice(n, 1);
                                                    n--;
                                                }
                                            }
                                        }
                                    }
                                    if (contObj && isArray && !iUtil.isEmpty(specsList)) {
                                        var id = file.replace(/d\.json$/i, '');
                                        var firstId =  contObj.firstCategory;
                                        var secondId = contObj.secondCategory;
                                        var thirdId =  contObj.thirdCategory;
                                        if (id && firstId && secondId && thirdId) {
                                            for (k1 = 0, l1 = fileData.data.length; k1 < l1; k1++) {
                                                var firstData = fileData.data[k1];
                                                if(iUtil.isObject(firstData) && firstData.id === firstId){
                                                    var fCache = {};
                                                    for (var f in firstData) {
                                                        if (f !== 'dictList') {
                                                            fCache[f] = firstData[f];
                                                        }
                                                        else {
                                                            fCache[f] = {};
                                                        }
                                                    }
                                                    if (iUtil.isArray(firstData.dictList)){
                                                        for (k2 = 0, l2 = firstData.dictList.length; k2 < l2; k2++) {
                                                            var secondData = firstData.dictList[k2];
                                                            if(iUtil.isObject(secondData) && secondData.id === secondId) {
                                                                var sCache = {};
                                                                for (var s in secondData) {
                                                                    if (s !== 'entryList') {
                                                                        sCache[s] = secondData[s];
                                                                    }
                                                                    else {
                                                                        sCache[s] = {};
                                                                    }
                                                                }
                                                                if (iUtil.isArray(secondData.entryList)){
                                                                    for (k3 = 0, l3 = secondData.entryList.length; k3 < l3; k3++) {
                                                                        var thirdData = secondData.entryList[k3];
                                                                        if(iUtil.isObject(thirdData) && thirdData.id === thirdId) {
                                                                            var tCache = {};
                                                                            for (var t in thirdData) {
                                                                                tCache[t] = thirdData[t];
                                                                            }
                                                                            var firstObj = navData.data[firstId] = navData.data[firstId] || fCache;
                                                                            var secondObj = firstObj['dictList'][secondId] = firstObj['dictList'][secondId] || sCache;
                                                                            var thirdObj = secondObj['entryList'][thirdId] = secondObj['entryList'][thirdId] || tCache;
                                                                            thirdObj.goods = thirdObj.goods || {};
                                                                            thirdObj.goods[id] = contObj;
                                                                            break;
                                                                        }
                                                                    }
                                                                }
                                                                break;
                                                            }
                                                        }
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        }

                        if (iUtil.isObject(navData)) {
                            if (iUtil.isDirSync(distDB +'/nav')) {
                                iUtil.clrDirSync(distDB +'/nav', true);
                            }
                            for(var key in navData.data){
                                if(isFirst){
                                    fData = { data: {} };
                                    fData.data[key] = navData.data[key];
                                    isFirst = false;
                                }
                                tData = { data: {} };
                                mData.data.push(key);
                                tData.data[key] = navData.data[key];
                                tFile = distDB + '/nav/1p_' + key + '.json';
                                iUtil.setFileSync(tFile, JSON.stringify(tData), true);
                            }
                            iUtil.setFileSync(fFile, JSON.stringify(fData), true);
                            iUtil.setFileSync(mFile, JSON.stringify(mData), true);
                            iUtil.setFileSync(jsonFile, JSON.stringify(navData), true);
                            html = iUtil.finds(iUtil.getFileSync(htmlFile, 'utf-8'), htmlTags);
                            fileData = iUtil.clean(iUtil.render(html, navData));
                            iUtil.setFileSync(dataFile, fileData, true);
                        }
                        else {
                            iUtil.delDirSync(distDB +'/nav', true);
                        }
                    }
                    else {
                        iUtil.delDirSync(distDB +'/nav', true);
                    }
                }
            }
        }
    });
};
var SEOHandle = function(opt) {
    var page = opt.page;
    var system = opt.system;
    var i, origin, goodsName;
    switch (system + ':' + page) {
        case "pcMall:index":
            Object.assign(opt.seo, {
                title: "中国供销海外购",
                keywords: "中国供销海外购,海淘网站,跨境购,母婴用品,进口商品,网上购物,保税区,跨境电商,跨境贸易",
                description: "中国供销海外购, 跨境电商, 跨境贸易, 提供丰富的正品海外商品, 欢迎广大顾客光临购买！"
            });
            break;
        case "mpMall:index":
            Object.assign(opt.seo, {
                title: "中国供销海外购",
                keywords: "中国供销海外购,海淘网站,跨境购,母婴用品,进口商品,网上购物,保税区,跨境电商,跨境贸易",
                description: "中国供销海外购, 跨境电商, 跨境贸易, 提供丰富的正品海外商品, 欢迎广大顾客光临购买！"
            });
            break;
        case "fmpMall:nav":
            Object.assign(opt.seo, {
                title: "福利商城",
                keywords: "福利商城,海淘网站,跨境购,母婴用品,进口商品,网上购物,保税区,跨境电商,跨境贸易",
                description: "福利商城, 跨境电商, 跨境贸易, 提供丰富的正品海外商品, 欢迎广大顾客光临购买！"
            });
            break;
        case "pcMall:goodsDetail":
            for(i in (opt.module||[])){
                if(opt.module[i].code === "goodsDetail-1"){
                    if (iUtil.isObject(opt.module[i].cont)) {
                        origin = opt.module[i].cont.origin;
                        goodsName = opt.module[i].cont.customGoodsName;
                        Object.assign(opt.seo, {
                            title: goodsName,
                            keywords: goodsName + (origin? "(" + origin + ")": "") + "--中国供销海外购",
                            description: goodsName + (origin? "(" + origin + ")": "") + "--中国供销海外购"
                        });
                    }
                    break;
                }
            }
            break;
        case "mpMall:goodsDetail":
            for(i in (opt.module||[])){
                if(opt.module[i].code === "goodsDetail-1"){
                    if (iUtil.isObject(opt.module[i].cont)) {
                        origin = opt.module[i].cont.origin;
                        goodsName = opt.module[i].cont.customGoodsName;
                        Object.assign(opt.seo, {
                            title: goodsName,
                            keywords: goodsName + (origin? "(" + origin + ")": "") + "--中国供销海外购",
                            description: goodsName + (origin? "(" + origin + ")": "") + "--中国供销海外购"
                        });
                    }
                    break;
                }
            }
            break;
        case "fmpMall:goodsDetail":
            for(i in (opt.module||[])){
                if(opt.module[i].code === "goodsDetail-1"){
                    if (iUtil.isObject(opt.module[i].cont)) {
                        origin = opt.module[i].cont.origin;
                        goodsName = opt.module[i].cont.customGoodsName;
                        Object.assign(opt.seo, {
                            title: goodsName,
                            keywords: goodsName + (origin? "(" + origin + ")": "") + "--福利商城",
                            description: goodsName + (origin? "(" + origin + ")": "") + "--福利商城"
                        });
                    }
                    break;
                }
            }
            break;
    }
    return opt.seo;
};
var formatDate = function(opt) {
    var t = new Date(opt.time);
    var tf = function(i){ return (i < 10 ? '0' : '') + i };
    return (opt.format||"yyyy/MM/dd HH:mm:ss").replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
};
var scheduleJob = function(opt) {
    if (opt.time && opt.func) {
        return schedule.scheduleJob(opt.time, opt.func);
    }
};
var shouldFilter = function(req, res){
    var contentType = res.get('Content-Type');
    var isImage = (/image\/.+/gi).test(contentType);
    var isAudio = (/audio\/.+/gi).test(contentType);
    var isVideo = (/video\/.+/gi).test(contentType);
    return !isImage && !isAudio && !isVideo && true;
};


client.auth('Xinhai2017');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(compression({filter: shouldFilter}));
httpsServer.listen(9888);

app.get('/*', function (req, res) {
    var host = req.hostname;
    var path = req.url || '';
    var hostArray = host.split('.');
    if(hostArray[1] == 'cncoopbuy'){
        res.redirect(301, "http://" + hostArray[0] + '.cncoopay.' + hostArray[2] + path);
    }
});

app.route("*")
    .all(function(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Content-Type", "application/json;charset=utf-8");
        res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var isHostname = (/^front\.cncoopbuy\.com$/).test(req.hostname);
        isHostname || res.redirect(301, "https://" + req.hostname + req.url);
        isHostname && (/^OPTIONS$/i).test(req.method) && res.send(200);
        isHostname && !(/^OPTIONS$/i).test(req.method) && next();
    });


app.route("/Sitemap/handle")
    .delete(function(req, res){

        var setDomain =   "";
        var SitemapPath = "";
        var SitemapList = [];
        var getRegion =   req.body.region;
        var getRegPath =  rootPath + '/pack/region/' + (getRegion||defRegion);
        var getCfgFile =  iUtil.getFileSync(getRegPath + '/.cert/cfg.txt', 'utf-8');

        if (getCfgFile !== ('region:' + (getRegion||defRegion))){
            res.send({errorMsg: '该区域中心未创建！', success: false, obj: null });
            return;
        }

        if(req.body.domain){
            setDomain = req.body.domain.replace(/^(http:\/\/|https:\/\/)?([^\/]+)(\/.*)?/i, '$1$2');
        }

        switch (setDomain) {
            case pDomain:
                SitemapPath = rootPath + "/pack/region/" + (getRegion||defRegion) + "/app/pc/security";
                SitemapList = iUtil.getDirSync(SitemapPath);
                break;
            case mDomain:
                SitemapPath = rootPath + "/pack/region/" + (getRegion||defRegion) + "/app/mp/security";
                SitemapList = iUtil.getDirSync(SitemapPath);
                break;
            case fDomain:
                SitemapPath = rootPath + "/pack/region/" + (getRegion||defRegion) + "/app/fmp/security";
                SitemapList = iUtil.getDirSync(SitemapPath);
                break;
            default:
                res.send({errorMsg: '未指定正确的域名!', success: false, obj: null });
                return;
        }

        SitemapList.forEach(function(file){
            var fullFile = SitemapPath + '/' + file;
            var isSitemap = (/^sitemap\d+/i).test(file);
            isSitemap && iUtil.delFileSync(fullFile);
        });

        res.send({errorMsg: '', success: true, obj: "删除Sitemap成功!" });

    })
    .post(function(req, res){

        var defs =         [];
        var maps =         [];
        var files =        [];
        var paths =        [];
        var fileRE =       [];
        var pathRE =       [];
        var sitemaps =     [];
        var setDomain =    "";
        var mustache =     "/pack/.cfg/build/sitemap.mustache";
        var SitemapXml =   iUtil.getFileSync(rootPath + mustache, "utf8");
        var SitemapFile =  "";
        var getDomain =    req.body.domain;
        var getRegion =    req.body.region;
        var getRegPath =   rootPath + '/pack/region/' + (getRegion||defRegion);
        var getCfgFile =   iUtil.getFileSync(getRegPath + '/.cert/cfg.txt', 'utf-8');

        if (getCfgFile !== ('region:' + (getRegion||defRegion))){
            res.send({errorMsg: '该区域中心未创建！', success: false, obj: null });
            return;
        }

        if(req.body.domain){
            getDomain = req.body.domain.replace(/^(http:\/\/|https:\/\/)?([^\/]+)(\/.*)?/i, '$1$2');
        }

        if(!SitemapXml){
            res.send({errorMsg: '未指定Sitemap模板!', success: false, obj: null });
            return;
        }

        switch (getDomain) {
            case pDomain:
                maps =   ["(/app|/pack/region/" + (getRegion||defRegion) + "/app)/pc/web"];
                paths =  ["/app/pc/web", "/pack/region/" + (getRegion||defRegion) + "/app/pc/web"];
                fileRE = ["#/amount-access.html", "#/shop-show.html", "^/app/pc/web/*", "^/pack/region/" + (getRegion||defRegion) + "/app/pc/web/*"];
                pathRE = [];
                setDomain = pDomain;
                SitemapFile = rootPath + "/pack/region/" + (getRegion||defRegion) + "/app/pc/security";
                break;
            case mDomain:
                maps =   ["(/app|/pack/region/" + (getRegion||defRegion) + "/app)/mp/web"];
                paths =  ["/app/mp/web", "/pack/region/" + (getRegion||defRegion) + "/app/mp/web"];
                fileRE = ["^/app/mp/web/*", "^/pack/region/" + (getRegion||defRegion) + "/app/mp/web/*"];
                pathRE = [];
                setDomain = mDomain;
                SitemapFile = rootPath + "/pack/region/" + (getRegion||defRegion) + "/app/mp/security";
                break;
            case fDomain:
                maps =   ["(/app|/pack/region/" + (getRegion||defRegion) + "/app)/fmp/web"];
                paths =  ["/app/fmp/web", "/pack/region/" + (getRegion||defRegion) + "/app/fmp/web"];
                fileRE = ["^/app/fmp/web/*", "^/pack/region/" + (getRegion||defRegion) + "/app/fmp/web/*"];
                pathRE = [];
                setDomain = fDomain;
                SitemapFile = rootPath + "/pack/region/" + (getRegion||defRegion) + "/app/fmp/security";
                break;
            default:
                res.send({errorMsg: '未指定正确的域名!', success: false, obj: null });
                return;
        }

        function getFile(path){
            var files = [];
            var infos = null;
            if(iUtil.isDirSync(path)){
                infos = iUtil.getDirSync(path);
                infos.forEach(function(file){
                    var nextPath = path + "/" + file;
                    var isDirSync = iUtil.isDirSync(nextPath);
                    var isFileSync = iUtil.isFileSync(nextPath);
                    isDirSync && toFilter("isDirSync", nextPath) && (files = files.concat(getFile(nextPath)));
                    isFileSync && toFilter("isFileSync", nextPath) && (files = files.concat(nextPath));
                });
            }
            return files;
        }
        function toRegex(reg, path){
            reg = ('/' + reg).replace(/\/+/g, '/').replace(/\.+/g, '\.');
            reg = reg.replace(/(\*)(\*+)?/g, function($, $1, $2){ return $1? ($2? '.*': '[^\/]*'): ''; });
            return (new RegExp(reg + "$", 'g')).test(path);
        }
        function toFilter(type, path){
            var i, l, st, reg, mark;
            if(type === 'isDirSync'){
                st = true;
                l = pathRE.length;
                for(i=0; i<l; i++){
                    reg = pathRE[i] && pathRE[i].substring(1);
                    mark = pathRE[i] && pathRE[i].substring(0, 1);
                    if(toRegex(reg, path)) { st = mark !== '^'; break; }
                }
            }
            if(type === 'isFileSync'){
                st = true;
                l = fileRE.length;
                for(i=0; i<l; i++){
                    reg = fileRE[i] && fileRE[i].substring(1);
                    mark = fileRE[i] && fileRE[i].substring(0, 1);
                    if(toRegex(reg, path)) { st = mark !== '^'; break; }
                }
            }
            return st;
        }
        function pathHandle(path, maps){
            var n;
            for(n in maps) {
                if (iUtil.isString(maps[n]) && maps[n].trim()) {
                    path = path.replace(new RegExp(maps[n], "g"), '');
                }
            }
            return path.replace(rootPath, '');
        }

        paths.forEach(function(path){
            path = rootPath + "/" + path;
            path = path.replace(/\/+/g, '/');
            path = path.replace(/(.+)(\/)$/, '$1');
            files = files.concat(getFile(path));
        });

        files.forEach(function(path, key){
            var num = 40000;
            var info = iUtil.inInfoSync(path);
            var code = Math.floor(key/num);
            var sitemap = sitemaps[code] = sitemaps[code] || [];
            if(iUtil.isObject(info)){
                sitemap.push({
                    loc:        setDomain + pathHandle(path, maps),
                    lastmod:    formatDate({ time: info.mtimeMs, format: 'yyyy-MM-dd'}),
                    changefreq: 'daily',
                    priority:    0.6
                })
            }
        });

        sitemaps.forEach(function(data, code){
            var buildFile = SitemapFile + '/sitemap' + (code+1) + '.xml';
            var buildData = iUtil.clean(iUtil.render(SitemapXml, {sitemaps: data}));
            defs = defs.concat(iUtil.setFile(buildFile, buildData, true));
        });

        iUtil.iPromise.all(defs)
            .then(function(){ res.send({ errorMsg: '', success: true, obj: "创建Sitemap成功!" }) })
            .catch(function(err){ res.send({ errorMsg: "创建Sitemap失败!", success: false, obj: err }) });

    });


app.route("/Region/handle")
    .delete(function(req, res){

        var region =  req.body.region;
        var regPath = rootPath + '/pack/region/' + region;

        if(!iUtil.isString(region) || !region.trim()){
            res.send({errorMsg: '未指定 region', success: false, obj: null });
            return;
        }

        if(iUtil.isString(region) && region.trim()){
            iUtil.delDirSync(regPath, true);
        }

        res.send({errorMsg: '', success: true, obj: region + "区域中心配置删除成功!" });

    })
    .post(function(req, res){

        var Defs =        [];
        var debug =       isDebug;
        var region =      req.body.region;
        var gradeId =     req.body.gradeId;
        var cfgPath =     rootPath + '/pack/.cfg';
        var regPath =     rootPath + '/pack/region/' + region;
        var pcDataPath =  rootPath + '/pack/region/' + region + '/data/mall/pc';
        var mpDataPath =  rootPath + '/pack/region/' + region + '/data/mall/mp';
        var fmpDataPath = rootPath + '/pack/region/' + region + '/data/mall/fmp';
        var pcScript =    rootPath + '/pack/region/' + region + '/app/pc/scripts/config';
        var mpScript =    rootPath + '/pack/region/' + region + '/app/mp/scripts/config';
        var fmpScript =   rootPath + '/pack/region/' + region + '/app/fmp/scripts/config';
        var cfgFile =     iUtil.getFileSync(regPath + '/.cert/cfg.txt', 'utf-8');

        if (cfgFile === ('region:' + region)){
            res.send({errorMsg: '该区域中心已创建！', success: false, obj: null });
            return;
        }

        if (!iUtil.isString(region) || !region.trim() || !gradeId){
            res.send({errorMsg: '未指定 region or gradeId', success: false, obj: null });
            return;
        }

        if (iUtil.isString(region) && region.trim() && gradeId){

            delete req.body.region;

            var getPcJSON = iUtil.getFileSync(cfgPath + '/build/mall_pc.json', 'utf-8');
            var getMpJSON = iUtil.getFileSync(cfgPath + '/build/mall_mp.json', 'utf-8');
            var getFmpJSON = iUtil.getFileSync(cfgPath + '/build/mall_fmp.json', 'utf-8');
            var pcMustache = iUtil.getFileSync(cfgPath + '/build/mall_pc.mustache', 'utf-8');
            var mpMustache = iUtil.getFileSync(cfgPath + '/build/mall_mp.mustache', 'utf-8');
            var fmpMustache = iUtil.getFileSync(cfgPath + '/build/mall_fmp.mustache', 'utf-8');
            var pcData = Object.assign(JSON.parse(getPcJSON), req.body||{}, { debug: debug });
            var mpData = Object.assign(JSON.parse(getMpJSON), req.body||{}, { debug: debug });
            var fmpData = Object.assign(JSON.parse(getFmpJSON), req.body||{}, { debug: debug });
            var setPcJSON = JSON.stringify(pcData, null, 2);
            var setMpJSON = JSON.stringify(mpData, null, 2);
            var setFmpJSON = JSON.stringify(fmpData, null, 2);
            var pcContent =  iUtil.render(pcMustache, { siteInfo: pcData });
            var mpContent =  iUtil.render(mpMustache, { siteInfo: mpData });
            var fmpContent = iUtil.render(fmpMustache, { siteInfo: fmpData });

            iUtil.getDirSync(cfgPath).forEach(function(file){
                if((/^build$/i).test(file)){ return; }
                Defs = Defs.concat(iUtil.copyDir(cfgPath + '/' + file, regPath + '/app/' + file, true));
            });

            Defs = Defs.concat(iUtil.setFile(regPath + '/.cert/cfg.txt', 'region:' + region, true));
            Defs = Defs.concat(iUtil.setFile(pcDataPath + '/entity/pc.json', setPcJSON, true));
            Defs = Defs.concat(iUtil.setFile(mpDataPath + '/entity/mp.json', setMpJSON, true));
            Defs = Defs.concat(iUtil.setFile(fmpDataPath + '/entity/fmp.json', setFmpJSON, true));
            Defs = Defs.concat(iUtil.setFile(pcScript + '/entity.js', pcContent, true));
            Defs = Defs.concat(iUtil.setFile(mpScript + '/entity.js', mpContent, true));
            Defs = Defs.concat(iUtil.setFile(fmpScript + '/entity.js', fmpContent, true));

            iUtil.iPromise.all(Defs)
                .then(function(){ res.send({errorMsg: '', success: true, obj: region + "区域中心配置创建成功!" }); })
                .catch(function(err){ res.send({errorMsg: region + "区域中心配置创建失败!", success: false, obj: err }); });
        }
    })
    .put(function(req, res){

        var Defs =        [];
        var debug =       isDebug;
        var malls =       req.body.malls;
        var region =      req.body.region;
        var cfgPath =     rootPath + '/pack/.cfg';
        var regPath =     rootPath + '/pack/region/' + region;
        var pcDataPath =  rootPath + '/pack/region/' + region + '/data/mall/pc';
        var mpDataPath =  rootPath + '/pack/region/' + region + '/data/mall/mp';
        var fmpDataPath = rootPath + '/pack/region/' + region + '/data/mall/fmp';
        var pcScript =    rootPath + '/pack/region/' + region + '/app/pc/scripts/config';
        var mpScript =    rootPath + '/pack/region/' + region + '/app/mp/scripts/config';
        var fmpScript =   rootPath + '/pack/region/' + region + '/app/fmp/scripts/config';
        var cfgFile =     iUtil.getFileSync(regPath + '/.cert/cfg.txt', 'utf-8');

        if (cfgFile !== ('region:' + region)){
            res.send({errorMsg: '该区域中心未创建！', success: false, obj: null });
            return;
        }

        if (!iUtil.isArray(malls)) {
            res.send({errorMsg: 'malls值格式有误！', success: false, obj: null });
            return;
        }

        if (malls.length === 0) {
            res.send({errorMsg: 'malls值 为空！', success: false, obj: null });
            return;
        }

        if (iUtil.isString(region) && region.trim()){

            delete req.body.malls;
            delete req.body.region;

            malls.forEach(function(mall){
                switch (mall) {
                    case 'pcMall':
                        var getPcJSON = iUtil.getFileSync(pcDataPath + '/entity/pc.json', 'utf-8');
                        var pcMustache = iUtil.getFileSync(cfgPath + '/build/mall_pc.mustache', 'utf-8');
                        var pcData = Object.assign(JSON.parse(getPcJSON), req.body||{}, { debug: debug });
                        var pcContent = iUtil.render(pcMustache, { siteInfo: pcData });
                        var setPcJSON = JSON.stringify(pcData, null, 2);
                        Defs = Defs.concat(iUtil.setFile(pcScript + '/entity.js', pcContent, true));
                        Defs = Defs.concat(iUtil.setFile(pcDataPath + '/entity/pc.json', setPcJSON, true));
                        break;
                    case 'mpMall':
                        var getMpJSON = iUtil.getFileSync(mpDataPath + '/entity/mp.json', 'utf-8');
                        var mpMustache = iUtil.getFileSync(cfgPath + '/build/mall_mp.mustache', 'utf-8');
                        var mpData = Object.assign(JSON.parse(getMpJSON), req.body||{}, { debug: debug });
                        var mpContent =  iUtil.render(mpMustache, { siteInfo: mpData });
                        var setMpJSON = JSON.stringify(mpData, null, 2);
                        Defs = Defs.concat(iUtil.setFile(mpScript + '/entity.js', mpContent, true));
                        Defs = Defs.concat(iUtil.setFile(mpDataPath + '/entity/mp.json', setMpJSON, true));
                        break;
                    case 'fmpMall':
                        var getFmpJSON = iUtil.getFileSync(fmpDataPath + '/entity/fmp.json', 'utf-8');
                        var fmpMustache = iUtil.getFileSync(cfgPath + '/build/mall_fmp.mustache', 'utf-8');
                        var fmpData = Object.assign(JSON.parse(getFmpJSON), req.body||{}, { debug: debug });
                        var fmpContent =  iUtil.render(fmpMustache, { siteInfo: fmpData });
                        var setFmpJSON = JSON.stringify(fmpData, null, 2);
                        Defs = Defs.concat(iUtil.setFile(fmpScript + '/entity.js', fmpContent, true));
                        Defs = Defs.concat(iUtil.setFile(fmpDataPath + '/entity/fmp.json', setFmpJSON, true));
                        break;
                }
            });

            iUtil.iPromise.all(Defs)
                .then(function(){ res.send({errorMsg: '', success: true, obj: region + "区域中心配置更新成功!" }); })
                .catch(function(err){ res.send({errorMsg: region + "区域中心配置更新失败!", success: false, obj: err }); });

        }

    });


app.route("/Page/handle")
    .delete(function(req, res){

        var goods = [];
        var page =  req.body.page || '';
        var file =  req.body.file || '';
        var path =  req.body.path || '';
        var region = req.body.region || '';
        var systems = (req.body.system || '').split(/\s*,\s*/);

        systems.forEach(function(sys){
            var route =      '';
            var distDB =     '';
            var publicDB =   '';
            var distMod =    '';
            var distWeb =    '';
            var htmlPath =   '';
            var htmlFile =   '';
            var jsonFile =   {};
            var system =     sys.trim();
            switch (system) {
                case "pcMall":
                    route =    'pc';
                    distMod =  rootPath + '/app/pc/scripts/module';
                    distWeb =  rootPath + (region? '/pack/region/' + region: '') + '/app/pc/web';
                    distDB =   rootPath + (region? '/pack/region/' + region: '') + '/data/mall/pc';
                    publicDB = rootPath + (region? '/pack/region/' + region: '') + '/data/mall/public';
                    htmlPath = distWeb + '/' + path.replace(new RegExp( '^\/?' + region + '$|^\/?' + region + '\/+$', 'i'), '');
                    htmlFile = (htmlPath + '/' + file + '.html').replace(/(\.html){2,}$/i, '.html');
                    break;
                case "mpMall":
                    route =    'mp';
                    distMod =  rootPath + '/app/mp/scripts/module';
                    distWeb =  rootPath + (region? '/pack/region/' + region: '') + '/app/mp/web';
                    distDB =   rootPath + (region? '/pack/region/' + region: '') + '/data/mall/mp';
                    publicDB = rootPath + (region? '/pack/region/' + region: '') + '/data/mall/public';
                    htmlPath = distWeb + '/' + path.replace(new RegExp( '^\/?' + region + '$|^\/?' + region + '\/+$', 'i'), '');
                    htmlFile = (htmlPath + '/' + file + '.html').replace(/(\.html){2,}$/i, '.html');
                    break;
                case "fmpMall":
                    route =    'fmp';
                    distMod =  rootPath + '/app/fmp/scripts/module';
                    distWeb =  rootPath + (region? '/pack/region/' + region: '') + '/app/fmp/web';
                    distDB =   rootPath + (region? '/pack/region/' + region: '') + '/data/mall/fmp';
                    publicDB = rootPath + (region? '/pack/region/' + region: '') + '/data/mall/public';
                    htmlPath = distWeb + '/' + path.replace(new RegExp( '^\/?' + region + '$|^\/?' + region + '\/+$', 'i'), '');
                    htmlFile = (htmlPath + '/' + file + '.html').replace(/(\.html){2,}$/i, '.html');
                    break;
                default:
                    res.send({errorMsg: '未指定正确的系统!', success: false, obj: null });
                    return;
            }
            switch (system + ':' + page) {
                // pcMall
                case "pcMall:index":
                    jsonFile['nav-1'] =    (distDB + '/nav/1p.json').replace(/(\.html)+p\.json$/i, 'p.json');
                    jsonFile['header-1'] = (distDB + '/header/1p.json').replace(/(\.html)+p\.json$/i, 'p.json');
                    jsonFile['header-2'] = (distDB + '/header/2p.json').replace(/(\.html)+p\.json$/i, 'p.json');
                    break;
                case "pcMall:goodsDetail":
                    jsonFile['goodsDetail-1'] = (publicDB + '/goods/' + file + 'd.json').replace(/(\.html)+d\.json$/i, 'd.json');
                    iUtil.inArray(file.replace(/(\.html)+$/i, ''), goods) === -1 && goods.push(file.replace(/(\.html)+$/i, ''));
                    break;

                // mpMall
                case "mpMall:index":
                    jsonFile['header-1'] = (distDB + '/header/1p.json').replace(/(\.html)+p\.json$/i, 'p.json');
                    break;
                case "mpMall:goodsDetail":
                    jsonFile['goodsDetail-1'] = (publicDB + '/goods/' + file + 'd.json').replace(/(\.html)+d\.json$/i, 'd.json');
                    iUtil.inArray(file.replace(/(\.html)+$/i, ''), goods) === -1 && goods.push(file.replace(/(\.html)+$/i, ''));
                    break;

                // mpMall
                case "fmpMall:nav":
                    jsonFile['header-1'] = (distDB + '/header/1p.json').replace(/(\.html)+p\.json$/i, 'p.json');
                    break;
                case "fmpMall:goodsDetail":
                    jsonFile['goodsDetail-1'] = (publicDB + '/goods/' + file + 'd.json').replace(/(\.html)+d\.json$/i, 'd.json');
                    iUtil.inArray(file.replace(/(\.html)+$/i, ''), goods) === -1 && goods.push(file.replace(/(\.html)+$/i, ''));
                    break;
            }
            if (!iUtil.isString(page) || !page.trim()) {
                res.send({errorMsg: '未指定页面名称!', success: false, obj: null });
                return;
            }
            if (!iUtil.isString(file) || !file.trim()) {
                res.send({errorMsg: '未指定文件名!', success: false, obj: null });
                return;
            }
            if (htmlFile) {
                iUtil.delFileSync(htmlFile);
            }
            if (jsonFile) {
                iUtil.delFileSync(Object.values(jsonFile));
            }
            if (distWeb)  {
                iUtil.clrDirSync(distWeb);
            }
            if (publicDB) {
                iUtil.clrDirSync(publicDB);
            }
            if (distDB)   {
                iUtil.clrDirSync(distDB);
            }
        });

        iUtil.iPromise.all([])
            .then(function(){ DBHandle({req: req, res: res, systems: systems, page:page, goods: goods }); })
            .then(function(){ res.send({errorMsg: '', success: true, obj: page + "页面删除成功!" }); })
            .catch(function(err){ res.send({errorMsg: page + "页面删除失败!", success: false, obj: err }); });

    })
    .post(function(req, res){

        var defs = [];
        var goods = [];
        var seo =  req.body.seo  || {};
        var page = req.body.page || '';
        var file = req.body.file || '';
        var path = req.body.path || '';
        var region = req.body.region || '';
        var module = req.body.module || [];
        var systems = (req.body.system || '').split(/\s*,\s*/);

        systems.forEach(function(sys){
            var system =     sys.trim();
            var signs =      {};
            var modArr =     [];
            var json =       {};
            var jsonFile =   {};
            var html =       '';
            var htmlFile =   '';
            var htmlPath =   '';
            var route =      '';
            var domain =     '';
            var distDB =     '';
            var publicDB =   '';
            var distMod =    '';
            var distWeb =    '';
            var defHtml =    '';
            var script =     '';
            var bodyCont =   '';
            var bodyHeader = '';
            var bodyCenter = '';
            var bodyFooter = '';

            switch (system)  {
                case "pcMall":
                    route =    'pc';
                    domain =   '';
                    distMod =  rootPath + '/app/pc/scripts/module';
                    defHtml =  rootPath + '/pack/.cfg/build/mall_pc.html';
                    distWeb =  rootPath + (region? '/pack/region/' + region: '') + '/app/pc/web';
                    distDB =   rootPath + (region? '/pack/region/' + region: '') + '/data/mall/pc';
                    publicDB = rootPath + (region? '/pack/region/' + region: '') + '/data/mall/public';
                    htmlPath = (distWeb + '/' + path.replace(new RegExp( '^\/?' + region + '$|^\/?' + region + '\/+$', 'i'), ''));
                    htmlFile = (htmlPath + '/' + file + '.html').replace(/(\.html){2,}$/i, '.html');
                    break;
                case "mpMall":
                    route =    'mp';
                    domain =   '';
                    distMod =  rootPath + '/app/mp/scripts/module';
                    defHtml =  rootPath + '/pack/.cfg/build/mall_mp.html';
                    distWeb =  rootPath + (region? '/pack/region/' + region: '') + '/app/mp/web';
                    distDB =   rootPath + (region? '/pack/region/' + region: '') + '/data/mall/mp';
                    publicDB = rootPath + (region? '/pack/region/' + region: '') + '/data/mall/public';
                    htmlPath = (distWeb + '/' + path.replace(new RegExp( '^\/?' + region + '$|^\/?' + region + '\/+$', 'i'), ''));
                    htmlFile = (htmlPath + '/' + file + '.html').replace(/(\.html){2,}$/i, '.html');
                    break;
                case "fmpMall":
                    route =    'fmp';
                    domain =   '';
                    distMod =  rootPath + '/app/fmp/scripts/module';
                    defHtml =  rootPath + '/pack/.cfg/build/mall_fmp.html';
                    distWeb =  rootPath + (region? '/pack/region/' + region: '') + '/app/fmp/web';
                    distDB =   rootPath + (region? '/pack/region/' + region: '') + '/data/mall/fmp';
                    publicDB = rootPath + (region? '/pack/region/' + region: '') + '/data/mall/public';
                    htmlPath = (distWeb + '/' + path.replace(new RegExp( '^\/?' + region + '$|^\/?' + region + '\/+$', 'i'), ''));
                    htmlFile = (htmlPath + '/' + file + '.html').replace(/(\.html){2,}$/i, '.html');
                    break;
                default:
                    res.send({errorMsg: '未指定正确的系统!', success: false, obj: null });
                    return;
            }
            switch (system + ':' + page) {
                // pcMall
                case "pcMall:index":
                    jsonFile['nav-1'] =    (distDB + '/nav/1p.json').replace(/(\.html)+p\.json$/i, 'p.json');
                    jsonFile['header-1'] = (distDB + '/header/1p.json').replace(/(\.html)+p\.json$/i, 'p.json');
                    jsonFile['header-2'] = (distDB + '/header/2p.json').replace(/(\.html)+p\.json$/i, 'p.json');
                    break;
                case "pcMall:goodsDetail":
                    jsonFile['goodsDetail-1'] = (publicDB + '/goods/' + file + 'd.json').replace(/(\.html)+d\.json$/i, 'd.json');
                    iUtil.inArray(file.replace(/(\.html)+$/i, ''), goods) === -1 && goods.push(file.replace(/(\.html)+$/i, ''));
                    break;

                // mpMall
                case "mpMall:index":
                    jsonFile['header-1'] = (distDB + '/header/1p.json').replace(/(\.html)+p\.json$/i, 'p.json');
                    break;
                case "mpMall:goodsDetail":
                    jsonFile['goodsDetail-1'] = (publicDB + '/goods/' + file + 'd.json').replace(/(\.html)+d\.json$/i, 'd.json');
                    iUtil.inArray(file.replace(/(\.html)+$/i, ''), goods) === -1 && goods.push(file.replace(/(\.html)+$/i, ''));
                    break;

                // fmpMall
                case "fmpMall:nav":
                    jsonFile['header-1'] = (distDB + '/header/1p.json').replace(/(\.html)+p\.json$/i, 'p.json');
                    break;
                case "fmpMall:goodsDetail":
                    jsonFile['goodsDetail-1'] = (publicDB + '/goods/' + file + 'd.json').replace(/(\.html)+d\.json$/i, 'd.json');
                    iUtil.inArray(file.replace(/(\.html)+$/i, ''), goods) === -1 && goods.push(file.replace(/(\.html)+$/i, ''));
                    break;
            }

            if (!iUtil.isArray(module)) {
                res.send({errorMsg: '页面数据格式错误!', success: false, obj: null });
                return;
            }
            if (!iUtil.isFileSync(defHtml)) {
                res.send({errorMsg: 'HTML模板为空!', success: false, obj: null });
                return;
            }
            if (!iUtil.isString(page) || !page.trim()) {
                res.send({errorMsg: '未指定页面名称!', success: false, obj: null });
                return;
            }
            if (!iUtil.isString(file) || !file.trim()) {
                res.send({errorMsg: '未指定文件名!', success: false, obj: null });
                return;
            }
            if (iUtil.isString(region) && region.trim()) {
                var regPath = rootPath + '/pack/region/' + region;
                var cfgFile = iUtil.getFileSync(regPath + '/.cert/cfg.txt', 'utf-8');
                if (!iUtil.isDirSync(regPath) || cfgFile !== ('region:' + region)) {
                    res.send({errorMsg: '区域中心' + region + '未创建!', success: false, obj: null });
                    return;
                }
            }

            for (var i in module) {
                if(module.hasOwnProperty(i)){
                    var tFile;
                    var own =  module[i].own;
                    var cont = module[i].cont;
                    var code = module[i].code;
                    var sort = module[i].sort;
                    var area = module[i].area;
                    var sign = signs[code] = signs[code]? ++signs[code]: 1;
                    if (!iUtil.isFileSync(distMod + "/" + code + '.mustache')) {
                        continue;
                    }
                    switch (system + ':' + code){
                        case 'pcMall:nav-1':    tFile = '<div id="nav-1-{{sign}}" v-cloak></div>';   break;
                        case 'fmpMall:nav-1':   tFile = '<div id="nav-1-{{sign}}" v-cloak></div>';   break;
                        default:                tFile = iUtil.getFileSync(distMod + "/" + code + '.mustache', 'utf-8');
                    }
                    modArr[sort] = {
                        'own':  own,
                        'cont': cont,
                        'code': code,
                        'sort': sort,
                        'sign': sign,
                        'area': area,
                        'file': tFile
                    };
                }
            }
            for (var n in modArr) {
                if(modArr.hasOwnProperty(n)){
                    var rData = {};
                    var mFile = modArr[n].file;
                    var mOwn =  rData.own =  modArr[n].own;
                    var mCont = rData.cont = modArr[n].cont;
                    var mCode = rData.code = modArr[n].code;
                    var mSort = rData.sort = modArr[n].sort;
                    var mSign = rData.sign = modArr[n].sign;
                    var mdRole =  "" + mCode + "-" + mSign;
                    var mdMark = "#" + mCode + "-" + mSign;
                    jsonFile[mCode] && (json[mCode] = JSON.stringify({own: mOwn, cont: mCont}));
                    modArr[n].area === 'body'       && (bodyCont   += iUtil.render(mFile, rData));
                    modArr[n].area === 'bodyHeader' && (bodyHeader += iUtil.render(mFile, rData));
                    modArr[n].area === 'bodyCenter' && (bodyCenter += iUtil.render(mFile, rData));
                    modArr[n].area === 'bodyFooter' && (bodyFooter += iUtil.render(mFile, rData));
                    script += '\nwindow.app.setModule("' + mdRole + '", "' + mdMark + '");\n';
                }
            }

            seo =  SEOHandle({ seo: seo, page: page, system: system, module: module });

            html = iUtil.getFileSync(defHtml, 'utf-8');
            html = iUtil.render(html, { seo: seo, page: page, domain: domain });

            bodyCont   && (html = iUtil.append(html, ["<body>", "</body>"], bodyCont));
            bodyHeader && (html = iUtil.append(html, ["<div id='body-header'>", "</div>"], bodyHeader));
            bodyCenter && (html = iUtil.append(html, ["<div id='body-center'>", "</div>"], bodyCenter));
            bodyFooter && (html = iUtil.append(html, ["<div id='body-footer'>", "</div>"], bodyFooter));
            script     && (html = iUtil.append(html, ["<script tag='module'>", "</script>"], script));

            defs = defs.concat(iUtil.setFile(jsonFile, iUtil.clean(json), true));
            defs = defs.concat(iUtil.setFile(htmlFile, iUtil.clean(html), true));

        });

        iUtil.iPromise.all(defs)
            .then(function(){ DBHandle({ req: req, res: res, systems: systems, page: page, goods: goods }) })
            .then(function(){ res.send({ errorMsg: '', success: true, obj: page + "页面创建成功!" }) })
            .catch(function(err){ res.send({ errorMsg: page + '页面创建失败！', success: false, obj: err }) });
    });


app.route("/Data/handle/nav")
    .delete(function(req, res){
        var region = req.body.region;
        var systems = ['pcMall', 'mpMall', 'fmpMall'];

        if (rootPath) {
            iUtil.delFileSync(rootPath + (region? '/pack/region/' + region: '') + '/data/mall/public/nav/1d.json');
        }

        iUtil.iPromise.all([])
            .then(function(){ DBHandle({ req: req, res: res, systems: systems, code: 'nav' }) })
            .then(function(){ res.send({ errorMsg: '', success: true, obj: 'nav数据删除成功!' }) })
            .catch(function(err){ res.send({ errorMsg: 'nav数据删除失败', success: false, obj: err }) });
    })
    .post(function(req, res){

        var defs = [];
        var data = req.body.data;
        var region = req.body.region;
        var systems = ['pcMall', 'mpMall', 'fmpMall'];
        var jsonFile = rootPath + (region? '/pack/region/' + region: '') + '/data/mall/public/nav/1d.json';

        if (jsonFile) {
            defs =  iUtil.setFile(jsonFile, JSON.stringify({'data': data}), true);
        }

        iUtil.iPromise.all(defs)
            .then(function(){ DBHandle({ req: req, res: res, systems: systems, code: 'nav' }) })
            .then(function(){ res.send({ errorMsg: '', success: true, obj: 'nav数据创建成功!' }) })
            .catch(function(err){ res.send({ errorMsg: 'nav数据创建失败!', success: false, obj: err }) });

    });


app.route("/Data/handle/distribution")
    .delete(function(req, res){

        var defs = [];
        var goods = [];
        var systems = ['pcMall', 'mpMall', 'fmpMall'];
        var goodsMap = req.body;
        var region = req.body.region;
        var goodsPath = rootPath + (region? '/pack/region/' + region: '') + '/data/mall/public/goods';

        if (iUtil.isEmpty(goodsMap)) {
            res.send({ errorMsg: '未传数据！', success: false, obj: null });
            return;
        }

        if (!iUtil.isObject(goodsMap)) {
            res.send({ errorMsg: '数据格式有误！', success: false, obj: null });
            return;
        }

        if (goodsMap.hasOwnProperty('region')) {
            delete goodsMap.region;
        }

        for(var goodsId in goodsMap){
            var itemArr = goodsMap[goodsId];
            var goodsFile = goodsPath + '/' + goodsId + 'd.json';
            if (iUtil.isArray(itemArr) && iUtil.isFileSync(goodsFile)) {
                var fileData = JSON.parse(iUtil.getFileSync(goodsFile, 'utf-8') || {});
                var specsList = fileData && fileData.cont && fileData.cont.goodsSpecsList || [];
                if (specsList) {
                    for (var n in specsList) {
                        var specs = specsList[n];
                        if (iUtil.inArray(specs.itemId, itemArr) !== -1) {
                            specs.fx = 0;
                        }
                    }
                    defs = iUtil.setFile(goodsFile, JSON.stringify(fileData), true);
                }
            }
            if (goods) { iUtil.inArray(goodsId, goods) === -1 && goods.push(goodsId) }
        }

        iUtil.iPromise.all(defs)
            .then(function(){ DBHandle({ req: req, res: res, systems: systems, handle: 'goods', goods: goods }) })
            .then(function(){ res.send({ errorMsg: '', success: true, obj: "(fx = 0)更新商详数据成功!" }) })
            .catch(function(err){ res.send({ errorMsg: "(fx = 0)更新商详数据失败!", success: false, obj: err }) });

    })
    .post(function(req, res){

        var defs = [];
        var goods = [];
        var systems = ['pcMall', 'mpMall', 'fmpMall'];
        var goodsMap = req.body;
        var region = req.body.region;
        var goodsPath = rootPath + (region? '/pack/region/' + region: '') + '/data/mall/public/goods';

        if (iUtil.isEmpty(goodsMap)) {
            res.send({ errorMsg: '未传数据！', success: false, obj: null });
            return;
        }

        if (!iUtil.isObject(goodsMap)) {
            res.send({ errorMsg: '数据格式有误！', success: false, obj: null });
            return;
        }

        if (goodsMap.hasOwnProperty('region')) {
            delete goodsMap.region;
        }

        for(var goodsId in goodsMap){
            var itemArr = goodsMap[goodsId];
            var goodsFile = goodsPath + '/' + goodsId + 'd.json';
            if (iUtil.isArray(itemArr) && iUtil.isFileSync(goodsFile)) {
                var fileData = JSON.parse(iUtil.getFileSync(goodsFile, 'utf-8') || {});
                var specsList = fileData && fileData.cont && fileData.cont.goodsSpecsList || [];
                if (specsList) {
                    for (var n in specsList) {
                        var specs = specsList[n];
                        if (iUtil.inArray(specs.itemId, itemArr) !== -1) {
                            specs.fx = 1;
                        }
                    }
                    defs = iUtil.setFile(goodsFile, JSON.stringify(fileData), true);
                }
            }
            if (goods) { iUtil.inArray(goodsId, goods) === -1 && goods.push(goodsId) }
        }

        iUtil.iPromise.all(defs)
            .then(function(){ DBHandle({ req: req, res: res, systems: systems, handle: 'goods', goods: goods }) })
            .then(function(){ res.send({ errorMsg: '', success: true, obj: "(fx = 1)更新商详数据成功!" }) })
            .catch(function(err){ res.send({ errorMsg: "(fx = 1)更新商详数据失败!", success: false, obj: err }) });

    });


app.route("/Data/handle/visit/timer")
    .delete(function(req, res){

        if (!visitTimer) {
            res.send({ errorMsg: '', success: true, obj: "Excel定时器已关闭!" });
            return;
        }

        if (visitTimer) {
            visitTimer.cancel();
            visitTimer = null;
            res.send({ errorMsg: '', success: true, obj: "Excel定时器关闭成功!" });
        }

    })
    .post(function(req, res){

        if (visitTimer) {
            res.send({ errorMsg: '', success: true, obj: "Excel定时器正在运行中..." });
            return;
        }

        if (!visitTimer) {
            var excelFunc = function(){
                var distJson;
                var distExcel;
                var jsonString;
                var timestamp = new Date().getTime() - 86400000;
                var currentDate = formatDate({ time: timestamp, format: 'yyyy-MM-dd'});
                var shopIdList = iUtil.getDirSync(rootPath + '/data/visit/json');
                shopIdList.forEach(function(shopId){
                    distJson  = rootPath + '/data/visit/json/' + shopId + '/' + currentDate + '|' + shopId + '.json';
                    distExcel = rootPath + '/data/visit/excel/' + shopId + '/' + currentDate + '|' + shopId + '.xlsx';
                    var writeData=[ ['用户名称','手机号码','微信账号','回访时间','所在省市','留言内容', '店铺ID'] ];
                    if(jsonString = iUtil.getFileSync(distJson, 'utf-8')){
                        var sData = {};
                        var nData = {};
                        var popVal = '';
                        var jsonData = JSON.parse(iUtil.getFileSync(distJson, 'utf-8'));
                        if (iUtil.isObject(jsonData) && iUtil.isObject(jsonData.data)) {
                            for(var k1 in jsonData.data){
                                sData[jsonData.data[k1].userPhone] = sData[jsonData.data[k1].userPhone] || [];
                                sData[jsonData.data[k1].userPhone].push(k1);
                            }
                            for(var k2 in sData){
                                popVal = sData[k2].pop();
                                nData[popVal] = jsonData.data[popVal];
                            }
                            for(var k3 in nData){
                                switch (nData[k3].visitTime){
                                    case '0':  nData[k3].visitTime = '00:00 ~ 06:00';  break;
                                    case '1':  nData[k3].visitTime = '06:00 ~ 12:00';  break;
                                    case '2':  nData[k3].visitTime = '12:00 ~ 18:00';  break;
                                    case '3':  nData[k3].visitTime = '18:00 ~ 24:00';  break;
                                }
                            }
                            if (nData) {
                                var nDataKeys = Object.keys(nData).sort();
                                for (var n = 0, m = nDataKeys.length; n < m; n++ ) {
                                    var k4 = nDataKeys[n];
                                    writeData.push([
                                        nData[k4].userName,
                                        nData[k4].userPhone,
                                        nData[k4].userWechat,
                                        nData[k4].visitTime,
                                        nData[k4].userAddress,
                                        nData[k4].userContent,
                                        nData[k4].shopId
                                    ]);
                                }
                            }
                            iUtil.setFile(distExcel, xlsx.build([{ name: 'sheet1', data: writeData }]), true);
                        }
                    }
                });
            };
            visitTimer = scheduleJob({ time: '0 1 0 * * *', func: excelFunc });
            res.send({ errorMsg: '', success: true, obj: "Excel定时器创建成功!" });
        }

    });


app.route("/Data/handle/visit/onceTimer")
    .post(function(req, res){

        if (VisitOnceTimer) {
            VisitOnceTimer.cancel();
            VisitOnceTimer = null;
        }

        var now = new Date();
        var date = req.body.date;
        var timer = req.body.timer;
        var excelFunc = function(start, finish){
            for (start; start <= finish; start = start + 86400000){
                var distJson;
                var distExcel;
                var jsonString;
                var currentDate = formatDate({ time: start, format: 'yyyy-MM-dd'});
                var shopIdList = iUtil.getDirSync(rootPath + '/data/visit/json');
                shopIdList.forEach(function(shopId){
                    distJson  = rootPath + '/data/visit/json/' + shopId + '/' + currentDate + '|' + shopId + '.json';
                    distExcel = rootPath + '/data/visit/excel/' + shopId + '/' + currentDate + '|' + shopId + '.xlsx';
                    var writeData=[ ['用户名称','手机号码','微信账号','回访时间','所在省市','留言内容', '店铺ID'] ];
                    if(jsonString = iUtil.getFileSync(distJson, 'utf-8')){
                        var sData = {};
                        var nData = {};
                        var popVal = '';
                        var jsonData = JSON.parse(iUtil.getFileSync(distJson, 'utf-8'));
                        if (iUtil.isObject(jsonData) && iUtil.isObject(jsonData.data)) {
                            for(var k1 in jsonData.data){
                                sData[jsonData.data[k1].userPhone] = sData[jsonData.data[k1].userPhone] || [];
                                sData[jsonData.data[k1].userPhone].push(k1);
                            }
                            for(var k2 in sData){
                                popVal = sData[k2].pop();
                                nData[popVal] = jsonData.data[popVal];
                            }
                            for(var k3 in nData){
                                switch (nData[k3].visitTime){
                                    case '0':  nData[k3].visitTime = '00:00 ~ 06:00';  break;
                                    case '1':  nData[k3].visitTime = '06:00 ~ 12:00';  break;
                                    case '2':  nData[k3].visitTime = '12:00 ~ 18:00';  break;
                                    case '3':  nData[k3].visitTime = '18:00 ~ 24:00';  break;
                                }
                            }
                            if (nData) {
                                var nDataKeys = Object.keys(nData).sort();
                                for (var n = 0, m = nDataKeys.length; n < m; n++ ) {
                                    var k4 = nDataKeys[n];
                                    writeData.push([
                                        nData[k4].userName,
                                        nData[k4].userPhone,
                                        nData[k4].userWechat,
                                        nData[k4].visitTime,
                                        nData[k4].userAddress,
                                        nData[k4].userContent,
                                        nData[k4].shopId
                                    ]);
                                }
                            }
                            iUtil.setFile(distExcel, xlsx.build([{ name: 'sheet1', data: writeData }]), true);
                        }
                    }
                });
            }
            if (VisitOnceTimer) {
                VisitOnceTimer.cancel();
                VisitOnceTimer = null;
            }
        };
        var start = iUtil.isString(date) && date.split(/\s*~\s*/)[0]? new Date(date.split(/\s*~\s*/)[0]).getTime(): now.getTime();
        var finish = iUtil.isString(date) && date.split(/\s*~\s*/)[1]? new Date(date.split(/\s*~\s*/)[1]).getTime(): start;

        if (timer) {
            VisitOnceTimer = scheduleJob({ time: timer, func: function(){ excelFunc(start, finish); } });
            res.send({ errorMsg: '', success: true, obj: "Excel一次性定时器启用成功!" });
        }

        if (!timer) {
            iUtil.iPromise.all([])
                .then(function(){ excelFunc(start, finish); })
                .then(function(){ res.send({ errorMsg: '', success: true, obj: "Excel文件创建成功!" }); })
                .catch(function(err){ res.send({ errorMsg: "Excel文件创建失败!", success: false, obj: err }) });
        }

    });


app.route("/Data/handle/visit/json")
    .post(function(req, res){
        var defs = [];
        var shopId  = req.body.shopId;
        var userName = req.body.userName;
        var userPhone = req.body.userPhone;
        var userWechat = req.body.userWechat;
        var visitTime = req.body.visitTime;
        var userAddress = req.body.userAddress;
        var userContent = req.body.userContent;
        var timestamp = new Date().getTime();
        var currentDate = formatDate({ time: timestamp, format: 'yyyy-MM-dd'});
        var distJson = rootPath + '/data/visit/json/' + shopId + '/' + currentDate + '|' + shopId + '.json';
        var userData = { 'data': {} };
        var bodyData = {
            'shopId'      : shopId,
            'userName'    : userName,
            'userPhone'   : userPhone,
            'userWechat'  : userWechat,
            'visitTime'   : visitTime,
            'userAddress' : userAddress,
            'userContent' : userContent
        };

        if (iUtil.isFileSync(distJson)){
            userData = JSON.parse(iUtil.getFileSync(distJson, 'utf-8')) || userData;
        }

        if (bodyData) {
            userData.data[timestamp] = bodyData;
            defs = iUtil.setFile(distJson, JSON.stringify(userData), true);
        }

        iUtil.iPromise.all(defs)
            .then(function(){ res.send({ errorMsg: '', success: true, obj: "访问记录写入成功!" }) })
            .catch(function(err){ res.send({ errorMsg: "访问记录写入失败!", success: false, obj: err }) });

    });

//日志记录
app.route("/Data/handle/logs")
    .post(function(req, res){
        var defs = [];
        var errorCode= req.body.errorCode;
        var userId = req.body.userId;
        var shopId = req.body.shopId;
        var detail = req.body.detail;
        var orderId = req.body.orderId;
        var errorMsg = req.body.errorMsg;
        var logsName = req.body.logsName;
        var timestamp = new Date().getTime();
        var currentDate = formatDate({ time: timestamp, format: 'yyyy-MM-dd'});
        var time = formatDate({ time: timestamp, format: 'yyyy/MM/dd HH:mm:ss'});
        var distJson = rootPath + '/data/logs/' + logsName + '/' + currentDate + '.json';
        var userData = { 'data': {} };
        var bodyData = {
            'errorCode': errorCode,
            'userId': userId,
            'shopId': shopId,
            'errorMsg': errorMsg,
            'detail': detail,
            'orderId': orderId,
            'time': time
        };

        if (iUtil.isFileSync(distJson)){
            userData = JSON.parse(iUtil.getFileSync(distJson, 'utf-8')) || userData;
        }

        if (bodyData) {
            var logsId = errorCode + '-' + userId + '-' + shopId + '-' + timestamp;
            userData.data[logsId] = bodyData;
            defs = iUtil.setFile(distJson, JSON.stringify(userData), true);
        }

        iUtil.iPromise.all(defs)
            .then(function(){ res.send({ errorMsg: '', success: true, obj: "日志写入成功!" }) })
            .catch(function(err){ res.send({ errorMsg: "日志写入失败!", success: false, obj: err }) });
    });

app.route("/Render/handle/goods")
    .post(function(req, res){

        var seo =  req.body.seo || {};
        var region = req.body.region || '';
        var modules = req.body.modules || {};
        var systems = req.body.systems || [];

        var defs = [];
        var page = 'goodsDetail';
        var publicDB = rootPath + (region? '/pack/region/' + region: '') + '/data/mall/public';

        if (!iUtil.isArray(systems)) {
            res.send({errorMsg: '系统类型格式有误!', success: false, obj: null });
            return;
        }
        if (!iUtil.isObject(modules)) {
            res.send({errorMsg: '页面数据格式错误!', success: false, obj: null });
            return;
        }
        if (region && iUtil.isString(region)) {
            var regPath = rootPath + '/pack/region/' + region;
            var cfgFile = iUtil.getFileSync(regPath + '/.cert/cfg.txt', 'utf-8');
            if (!iUtil.isDirSync(regPath) || cfgFile !== ('region:' + region)) {
                res.send({errorMsg: '区域中心' + region + '未创建!', success: false, obj: null });
                return;
            }
        }

        iUtil.getDirSync(publicDB + '/goods').forEach(function(file){
            if (iUtil.isFileSync(publicDB + '/goods/' + file)) {
                var json = iUtil.getFileSync(publicDB + '/goods/' + file, 'utf-8');
                var data = json && Object.assign({}, JSON.parse(json)) || {};
                var contObj = iUtil.isObject(data.cont) && data.cont;
                if (contObj) {
                    var goodsId = file.replace(/d\.json$/i, '');
                    var isString = iUtil.isString(contObj.href);
                    var urlPath = isString && contObj.href.replace(/^\//i, '').split(/\s*\/\s*/);
                    var firstId = urlPath && urlPath[0];
                    var secondId = urlPath && urlPath[1];
                    var thirdId = urlPath && urlPath[2];
                    if (goodsId && firstId && secondId && thirdId) {
                        systems.forEach(function(sys){
                            var system =     sys.trim();
                            var module =     [];
                            var signs =      {};
                            var modArr =     [];
                            var html =       '';
                            var htmlFile =   '';
                            var route =      '';
                            var domain =     '';
                            var distDB =     '';
                            var distMod =    '';
                            var distWeb =    '';
                            var defHtml =    '';
                            var script =     '';
                            var bodyCont =   '';
                            var bodyHeader = '';
                            var bodyCenter = '';
                            var bodyFooter = '';

                            switch (system)  {
                                case "pcMall":
                                    route =    'pc';
                                    domain =   '';
                                    module =   modules[system] || [];
                                    distMod =  rootPath + '/app/pc/scripts/module';
                                    defHtml =  rootPath + '/pack/.cfg/build/mall_pc.html';
                                    distWeb =  rootPath + (region? '/pack/region/' + region: '') + '/app/pc/web';
                                    distDB =   rootPath + (region? '/pack/region/' + region: '') + '/data/mall/pc';
                                    htmlFile = distWeb + '/' + firstId + '/' + secondId + '/' + thirdId + '/' + goodsId + '.html';
                                    break;
                                case "mpMall":
                                    route =    'mp';
                                    domain =   '';
                                    module =   modules[system] || [];
                                    distMod =  rootPath + '/app/mp/scripts/module';
                                    defHtml =  rootPath + '/pack/.cfg/build/mall_mp.html';
                                    distWeb =  rootPath + (region? '/pack/region/' + region: '') + '/app/mp/web';
                                    distDB =   rootPath + (region? '/pack/region/' + region: '') + '/data/mall/mp';
                                    htmlFile = distWeb + '/' + firstId + '/' + secondId + '/' + thirdId + '/' + goodsId + '.html';
                                    break;
                                case "fmpMall":
                                    route =    'fmp';
                                    domain =   '';
                                    module =   modules[system] || [];
                                    distMod =  rootPath + '/app/fmp/scripts/module';
                                    defHtml =  rootPath + '/pack/.cfg/build/mall_fmp.html';
                                    distWeb =  rootPath + (region? '/pack/region/' + region: '') + '/app/fmp/web';
                                    distDB =   rootPath + (region? '/pack/region/' + region: '') + '/data/mall/fmp';
                                    htmlFile = distWeb + '/' + firstId + '/' + secondId + '/' + thirdId + '/' + goodsId + '.html';
                                    break;
                                default:
                                    res.send({errorMsg: '未指定正确的系统!', success: false, obj: null });
                                    return;
                            }

                            if (!iUtil.isFileSync(defHtml)) {
                                res.send({errorMsg: 'HTML模板为空!', success: false, obj: null });
                                return;
                            }

                            for (var i in module) {
                                if(module.hasOwnProperty(i)){

                                    if (module[i].code === 'goodsDetail-1') {
                                        module[i].own =  data.own;
                                        module[i].cont = data.cont;
                                    }

                                    var own =  module[i].own;
                                    var cont = module[i].cont;
                                    var code = module[i].code;
                                    var sort = module[i].sort;
                                    var area = module[i].area;
                                    var sign = signs[code] = signs[code]? ++signs[code]: 1;
                                    var tFile;

                                    if (!iUtil.isFileSync(distMod + "/" + code + '.mustache')) {
                                        continue;
                                    }

                                    switch (system + ':' + code){
                                        case 'pcMall:nav-1':    tFile = '<div id="nav-1-{{sign}}" v-cloak></div>';   break;
                                        case 'fmpMall:nav-1':   tFile = '<div id="nav-1-{{sign}}" v-cloak></div>';   break;
                                        default:                tFile = iUtil.getFileSync(distMod + "/" + code + '.mustache', 'utf-8');
                                    }

                                    modArr[sort] = {
                                        'own':  own,
                                        'cont': cont,
                                        'code': code,
                                        'sort': sort,
                                        'sign': sign,
                                        'area': area,
                                        'file': tFile
                                    };
                                }
                            }
                            for (var n in modArr) {
                                if(modArr.hasOwnProperty(n)){
                                    var rData = {};
                                    var mFile = modArr[n].file;
                                    var mOwn =  rData.own =  modArr[n].own;
                                    var mCont = rData.cont = modArr[n].cont;
                                    var mCode = rData.code = modArr[n].code;
                                    var mSort = rData.sort = modArr[n].sort;
                                    var mSign = rData.sign = modArr[n].sign;
                                    var mdRole =  "" + mCode + "-" + mSign;
                                    var mdMark = "#" + mCode + "-" + mSign;
                                    modArr[n].area === 'body'       && (bodyCont   += iUtil.render(mFile, rData));
                                    modArr[n].area === 'bodyHeader' && (bodyHeader += iUtil.render(mFile, rData));
                                    modArr[n].area === 'bodyCenter' && (bodyCenter += iUtil.render(mFile, rData));
                                    modArr[n].area === 'bodyFooter' && (bodyFooter += iUtil.render(mFile, rData));
                                    script += '\nwindow.app.setModule("' + mdRole + '", "' + mdMark + '");\n';
                                }
                            }

                            seo =  SEOHandle({ seo: seo, page: page, system: system, module: module });
                            html = iUtil.getFileSync(defHtml, 'utf-8');
                            html = iUtil.render(html, { seo: seo, page: page, domain: domain });

                            bodyCont   && (html = iUtil.append(html, ["<body>", "</body>"], bodyCont));
                            bodyHeader && (html = iUtil.append(html, ["<div id='body-header'>", "</div>"], bodyHeader));
                            bodyCenter && (html = iUtil.append(html, ["<div id='body-center'>", "</div>"], bodyCenter));
                            bodyFooter && (html = iUtil.append(html, ["<div id='body-footer'>", "</div>"], bodyFooter));
                            script     && (html = iUtil.append(html, ["<script tag='module'>", "</script>"], script));

                            defs = defs.concat(iUtil.setFile(htmlFile, iUtil.clean(html), true));

                        });
                    }
                }
            }
        });

        iUtil.iPromise.all(defs)
            .then(function(){ res.send({ errorMsg: '', success: true, obj: page + "页面渲染成功!" }) })
            .catch(function(err){ res.send({ errorMsg: page + '页面渲染失败！', success: false, obj: err }) });
    });


app.route("/Static/handle/copy")
    .post(function(req, res){

        var defs = [];
        var record = [];
        var isErr = false;
        var data = req.body;

        if (!iUtil.isArray(data)) {
            res.send({errorMsg: '数据格式错误!', success: false, obj: null });
            return;
        }

        if (iUtil.isEmpty(data)) {
            res.send({errorMsg: '数据内容为空', success: false, obj: null });
            return;
        }

        for (var i in data) {
            var state = [];
            var oldPath = (data[i] || {}).old || '';
            var newPath = (data[i] || {}).new || '';

            if (isErr) {
                break;
            }

            if (iUtil.isDirSync(oldPath)) {
                state = iUtil.copyDir(oldPath, newPath, true);
                defs = defs.concat(state);
            }

            if (iUtil.isFileSync(oldPath)) {
                state = iUtil.copyFile(oldPath, newPath, true);
                defs = defs.concat(state);
            }

            if (!iUtil.isEmpty(state)){
                iUtil.iPromise.all(state)
                    .then(function(){ record.push(data[i] || {}) })
                    .catch(function(err){ if (!isErr) { isErr = true; res.send({ errorMsg:  '文件拷贝失败！', success: false, obj: err }) } });
            }

        }

        if (!isErr) {
            iUtil.iPromise.all(defs)
                .then(function(){ res.send({ errorMsg: '', success: true, obj: record }) })
                .catch(function(err){ res.send({ errorMsg:  '文件拷贝失败！', success: false, obj: err }) });
        }

    });


app.route("/Static/handle/rename")
    .post(function(req, res){

        var defs = [];
        var record = [];
        var isErr = false;
        var data = req.body;

        if (!iUtil.isArray(data)) {
            res.send({errorMsg: '数据格式错误!', success: false, obj: null });
            return;
        }

        if (iUtil.isEmpty(data)) {
            res.send({errorMsg: '数据内容为空', success: false, obj: null });
            return;
        }

        for (var i in data) {
            var state = [];
            var oldPath = (data[i] || {}).old || '';
            var newPath = (data[i] || {}).new || '';

            if (isErr) {
                break;
            }

            if (iUtil.isDirSync(oldPath)) {
                state = iUtil.copyDir(oldPath, newPath, true);
                defs = defs.concat(state);
            }

            if (iUtil.isFileSync(oldPath)) {
                state = iUtil.copyFile(oldPath, newPath, true);
                defs = defs.concat(state);
            }

            if (!iUtil.isEmpty(state)){
                iUtil.iPromise.all(state)
                    .then(function(){
                        if (iUtil.isDirSync(oldPath)) {
                            iUtil.delDirSync(oldPath, true);
                        }
                        if (iUtil.isFileSync(oldPath)) {
                            iUtil.delFileSync(oldPath, true);
                        }
                        record.push(data[i] || {});
                    })
                    .catch(function(err){
                        if (!isErr) {
                            isErr = true;
                            res.send({ errorMsg:  '文件重命名失败！', success: false, obj: err });
                        }
                    });
            }

        }

        if (!isErr) {
            iUtil.iPromise.all(defs)
                .then(function(){ res.send({ errorMsg: '', success: true, obj: record }) })
                .catch(function(err){ res.send({ errorMsg:  '文件重命名失败！', success: false, obj: err }) });
        }

    });


app.route("/Redis/handle/rebate")
    .post(function(req, res){
        var total = 0;
        var count = 0;
        var isStop = false;
        var data = req.body;
        for (var m in data) {
            for (var n in data[m]) {
                total++;
            }
        }
        function getRebate(data, goodsId, itemId) {
            if (!isStop && itemId) {
                client.hgetall('goodsrebate:' + itemId, function(err, obj){
                    if (err) {
                        isStop = true;
                        res.send({ errorMsg: '', success: false, obj: err });
                    }
                    if (!err) {
                        count++;
                        data[goodsId][itemId] = obj;
                        if (count === total) {
                            res.send({ errorMsg: '', success: true, obj: data });
                        }
                    }
                });
            }
        }
        for (var m in data) {
            for (var n in data[m]) {
                getRebate(data, m, n);
            }
        }
    });


app.route("/Redis/handle/gradeBO")
    .post(function(req, res){
        var result = null;
        var data = req.body;
        client.hget('gradeBO:', data.shopId, function(err, obj){
            if (err) {
                res.send({ errorMsg: '', success: false, obj: err });
            }
            if (!err) {
                try {
                    result = JSON.parse(obj);
                }
                catch(e){
                    result = obj;
                }
                res.send({ errorMsg: data.shopId, success: true, obj: result });
            }
        });
    });

//数据统计
app.route('/Data/handle/statistics')
    .post(function(req,res){
        var defs = [];
        var type = req.body.type;
        var userId = req.body.userId;
        var shopId = req.body.shopId;
        var goodsId = req.body.goodsId;
        var logsName = req.body.logsName;
        var timestamp = new Date().getTime();
        var logsId = userId + '-' + shopId + '-' + goodsId;
        var currentDate = formatDate({ time: timestamp, format: 'yyyy-MM-dd'});
        var distJson = rootPath + '/data/logs/' + logsName + '/' + currentDate + '.json';
        var userData = { 'data': {} };

        if (iUtil.isFileSync(distJson)){
            userData = JSON.parse(iUtil.getFileSync(distJson, 'utf-8')) || userData;
        }

        if(userData.data[logsId]){
            if(userData.data[logsId][type]){
                userData.data[logsId][type] ++;
            }else{
                userData.data[logsId][type] = 1;
            }
        }else{
            userData.data[logsId] = {};
            userData.data[logsId][type] = 1;
        }

        defs = iUtil.setFile(distJson, JSON.stringify(userData), true);

        iUtil.iPromise.all(defs)
            .then(function(){ res.send({ errorMsg: '', success: true, obj: "日志写入成功!" }) })
            .catch(function(err){ res.send({ errorMsg: "日志写入失败!", success: false, obj: err }) });
    });
