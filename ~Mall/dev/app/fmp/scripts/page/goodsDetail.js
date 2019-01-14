/** 页面 --- 商品详情
 *    @detail:     商品详情
 *    @return:     无
 *    @author:    林鹏腾
 *    @date:      2018.05.16
 */
(function(){

    'use strict';

    var jsData =          window.app.getApi('jsData');
    var jsUtil =          window.app.getApi('jsUtil');
    var jsModel =         window.app.getApi('jsModel');
    var jsEvent =         window.app.getApi('jsEvent');
    var userId =          jsData.userInfo.userId;
    var shopId =          jsData.userInfo.shopId;
    var gradeId =         jsData.userInfo.gradeId;
    var centerId =        jsData.userInfo.centerId;
    var isLogin =         jsData.userInfo.isLogin;
    var welfareVip =      jsData.userInfo.welfareVip;
    var pathUrl =         jsData.location.pathUrl;
    var shopName =        jsData.siteInfo.shopName;
    var shopAbout =       jsData.siteInfo.shopAbout;
    var shopHeadImg =     jsData.siteInfo.shopHeadImg;
    var shopDescribe =    jsData.siteInfo.shopDescribe;
    var goodsId =         jsData.location.pathname.replace(/(\/?[^\/]+\/)*([^\/]+)\.html$/i, '$2');
    var itemId =          jsUtil.url.getParam("itemId");
    var pushUserId =      jsUtil.url.getParam("pushUserId");
    var jumpUrl =         jsUtil.url.getParam("jumpUrl", 1);
    var backUrl =         "";
    var toRender =        $.Deferred();
    var initList =        { icon_home: true, title_text: '商品详情', icon_search: true, icon_shopCart: true };
    var icon_home =       true;
    var title_text =      "商品详情";
    var icon_search =     true;
    var icon_shopCart =   true;
    var home =            "";
    var shoppingCart =    "";
    var personalCenter =  "";
    var goodsDetail =     true;
    var gradientHide =    true;


    //页面控制
    if(!isLogin){
        setTimeout(function(){ window.location.href = '/login.html?jumpUrl=' + pathUrl; }, 200);
        return;
    }
    if (!welfareVip) {
        jsModel.send("USER_INVITERINFO_CHECK", {
            shopId: shopId || gradeId,
            id: userId
        }).done(function(response){
            if (response && response.success && response.obj === true) {
                jsData.userInfo.welfareVip = true;
                window.localStorage.setItem("welfareVip", 'v:' + shopId + '-' + userId);
                toRender.resolve();
            }
            else {
                jsData.userInfo.welfareVip = false;
                window.localStorage.removeItem("welfareVip");
                window.location.href = '/bindInvitation.html?jumpUrl=' + pathUrl;
                toRender.reject();
            }
        }).fail(function(){
            setTimeout(function(){ window.location.href = '/login.html?jumpUrl=' + pathUrl; }, 200);
            toRender.reject();
        })
    }
    else {
        toRender.resolve();
    }

    jsUtil.url.delParam(['shopId', 'pushUserId'], "cover");
    pathUrl = jsUtil.path.delParam(pathUrl, ['shopId', 'pushUserId']);

    if(pushUserId !== 'isShoper' && pushUserId){ window.localStorage.setItem("pushUserId", pushUserId); }
    if(pushUserId === 'isShoper' && pushUserId){ window.localStorage.removeItem("pushUserId"); }
    if(!goodsId && !itemId){ setTimeout(function(){ window.location.href="/index.html";}, 300); return; }


    var Page = {
        'jsData':          jsData,
        'jsUtil':          jsUtil,
        'jsModel':         jsModel,
        'jsEvent':         jsEvent,
        'userId':          userId,
        'shopId':          shopId,
        'gradeId':         gradeId,
        'centerId':        centerId,
        'isLogin':         isLogin,
        'welfareVip':      welfareVip,
        'pathUrl':         pathUrl,
        'jumpUrl':         jumpUrl,
        'backUrl':         backUrl,
        'toRender':        toRender,
        'shopName':        shopName,
        'shopAbout':       shopAbout,
        'shopHeadImg':     shopHeadImg,
        'shopDescribe':    shopDescribe,
        'goodsId':         goodsId,
        'itemId':          itemId,
        'initList':        initList,
        'icon_home':       icon_home,
        'title_text':      title_text,
        'icon_search':     icon_search,
        'icon_shopCart':   icon_shopCart,
        'home':            home,
        'shoppingCart':    shoppingCart,
        'personalCenter':  personalCenter,
        'goodsDetail':     goodsDetail,
        'gradientHide':    gradientHide
    };

    window.app.setPage =  function(name, data){
        typeof name === "string" && name.trim() && (Page[name] = data);
    };

    window.app.getPage =  function(name){
        return typeof name === "string" && name.trim()? Page[name]: Page;
    };

    wx.ready(function () {
        shopId = localStorage.getItem('shopId') || 2;
        var data = {};
        if(window.location.href.indexOf("?") == -1){
            data.link = window.location.href + '?shopId=' + shopId;
        }else{
            data.link = window.location.href + '&shopId=' + shopId;
        }
        jsModel.send('GOODS_ID_QUERY', {goodsId: goodsId})
            .done(function(response){
                if(response && response.success && response.obj){
                    data.title = response.obj[0].customGoodsName;
                    data.desc = response.obj[0].description || response.obj[0].customGoodsName;
                    data.imgUrl = response.obj[0].goodsFileList && response.obj[0].goodsFileList[0].path || '';
                }
                wx.onMenuShareAppMessage({
                    title: data.title, // 分享标题
                    desc: data.desc, // 分享描述
                    link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: data.imgUrl, // 分享图标
                    success: function (res) {

                    }
                });
                wx.onMenuShareTimeline({
                    title: data.title, // 分享标题
                    link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: data.imgUrl, // 分享图标
                    success: function(res){

                    }
                });
            });
    });

}());

