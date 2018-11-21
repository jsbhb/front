/** 页面 --- 加入我们
 *    @detail:     加入我们
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
    var shopName =        jsData.siteInfo.shopName;
    var shopAbout =       jsData.siteInfo.shopAbout;
    var shopHeadImg =     jsData.siteInfo.shopHeadImg;
    var shopDescribe =    jsData.siteInfo.shopDescribe;
    var jumpUrl =         jsUtil.url.getParam("jumpUrl", 1);
    var backUrl =         "";
    var initList =        {};
    var info_shop =       false;
    var icon_scan =       false;
    var icon_news =       false;
    var input =           false;
    var title_text =      "加入我们";
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
        'shopName':        shopName,
        'shopAbout':       shopAbout,
        'shopHeadImg':     shopHeadImg,
        'shopDescribe':    shopDescribe,
        'initList':        initList,
        'icon_scan':       icon_scan,
        'icon_news':       icon_news,
        'info_shop':       info_shop,
        'input':           input,
        'title_text':      title_text,
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

    wx.ready(function (){
        shopId = localStorage.getItem('shopId') || 2;
        var data = {
            title : '中国供销海外购-全国加盟',
            desc : '优质的产品、完善的服务，中国供销海外购诚邀您的加盟！'
        };
        if(window.location.href.indexOf("?") == -1){
            data.link = window.location.href + '?shopId=' + shopId;
        }else{
            data.link = window.location.href + '&shopId=' + shopId;
        }
        if(shopId == 287){
            data.imgUrl = 'https://' + window.location.host + '/images/platform/weixinShare/esutong.jpg';
        }else{
            data.imgUrl = 'https://' + window.location.host + '/images/platform/weixinShare/ico_mp.jpg';
            // data.imgUrl = 'https://' + window.location.host + '/images/platform/weixinShare/activity.jpg';
        }
        $.when(jsModel.send("USER_SHOPINFO_QUERY"))
            .done(function(response){
                if(response && response.success && response.obj){
                    data.title = response.obj.name + '-全国加盟';
                    data.desc = '优质的产品、完善的服务，' + response.obj.name + '诚邀您的加盟！';
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