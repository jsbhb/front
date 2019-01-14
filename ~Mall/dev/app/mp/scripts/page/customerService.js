/** 页面 --- 客服热线
 *    @detail:     客服热线
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
    var shopId =          jsData.userInfo.shopId;
    var isLogin =         jsData.userInfo.isLogin;
    var pathUrl =         jsData.location.pathUrl;
    var siteInfo =        jsData.siteInfo;
    var shopName =        jsData.siteInfo.shopName;
    var shopAbout =       jsData.siteInfo.shopAbout;
    var shopHeadImg =     jsData.siteInfo.shopHeadImg;
    var shopDescribe =    jsData.siteInfo.shopDescribe;
    var jumpUrl =         jsUtil.url.getParam("jumpUrl", 1);
    var backUrl =         "";
    var initList =        { info_shop: false, icon_scan: true, icon_news: true, input: true };
    var info_shop =       false;
    var icon_scan =       true;
    var icon_news =       true;
    var input =           true;
    var home =            " ";
    var nav =             " ";
    var shoppingCart =    " ";
    var personalCenter =  " ";
    var gradientHide =    false;

    var Page = {
        'jsData':          jsData,
        'jsUtil':          jsUtil,
        'jsModel':         jsModel,
        'jsEvent':         jsEvent,
        'shopId':          shopId,
        'isLogin':         isLogin,
        'pathUrl':         pathUrl,
        'jumpUrl':         jumpUrl,
        'backUrl':         backUrl,
        "pageName":        "customerService",
        "siteInfo":        siteInfo,
        'shopName':        shopName,
        'shopAbout':       shopAbout,
        'shopHeadImg':     shopHeadImg,
        'shopDescribe':    shopDescribe,
        'initList':        initList,
        'icon_scan':       icon_scan,
        'icon_news':       icon_news,
        'info_shop':       info_shop,
        'input':           input,
        'home':            home,
        'nav':             nav,
        'shoppingCart':    shoppingCart,
        'personalCenter':  personalCenter,
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
        var data = {
            title: '中国供销海外购 - 客服中心'
        };
        if(window.location.href.indexOf("?") == -1){
            data.link = window.location.href + '?shopId=' + shopId;
        }else{
            data.link = window.location.href + '&shopId=' + shopId;
        }
        if(shopId == 287){
            data.imgUrl = 'https://' + window.location.host + '/images/platform/weixinShare/esutong.jpg';
            data.desc = '优质的产品、完善的服务，俄速通全球购诚邀您的加盟！';
        }else{
            data.imgUrl = 'https://' + window.location.host + '/images/platform/weixinShare/ico_mp.jpg';
            // data.imgUrl = 'https://' + window.location.host + '/images/platform/weixinShare/activity.jpg';
            data.desc = '中国供销海外购是供销系统中唯一专业从事跨境电商行业的企业';
        }
        $.when(jsModel.send("USER_SHOPINFO_QUERY"))
            .done(function(response){
                if(response && response.success && response.obj){
                    if(shopId == 287){
                        data.imgUrl = 'https://' + window.location.host + '/images/platform/weixinShare/esutong.jpg';
                        data.desc = '优质的产品、完善的服务，' + response.obj.name + '诚邀您的加盟！';
                    }else{
                        // data.imgUrl = 'https://' + window.location.host + '/images/platform/weixinShare/ico_mp.jpg';
                        data.imgUrl = 'https://' + window.location.host + '/images/platform/weixinShare/ico_mp.jpg';
                        data.desc = '中国供销海外购是供销系统中唯一专业从事跨境电商行业的企业';
                    }
                    data.title = response.obj.name + ' - 客服中心';
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