
/** 手机绑定
 *    @detail:    手机绑定
 *    @return:     无
 *    @author:    林鹏腾
 *    @date:      2017.9.22
 */
require([
    "config.page.event",
    "config.page.modular",
    "config.page.mustache"
], function(){

    'use strict';

    if (window.localStorage.getItem("authId")) {
        window.localStorage.removeItem("authId");
        window.localStorage.removeItem("userId");
        window.location.reload(true);
    }

    /* 加载前端数据 */
    var api = window.capi.get(true);
    var openId = api.jsData.userInfo.openId;
    var shopId = api.jsData.userInfo.shopId;
    var userId = api.jsData.userInfo.userId;
    var gradeId = api.jsData.userInfo.gradeId;
    var isLogin = api.jsData.userInfo.isLogin;
    var centerId = api.jsData.userInfo.centerId;
    var welfareVip = api.jsData.userInfo.welfareVip;
    var pathUrl = api.jsData.location.pathUrl;
    var backUrl = "";
    var jumpUrl = api.jsUtil.url.getParam("jumpUrl", 1);
    var unionId = api.jsUtil.url.getParam("unionId");
    var platUserType = 5;
    var loginType = 2;
    var userType = 5;
    var header_title = "绑定手机号";

    /* 加载页面模块 */
    $.when($.Deferred().resolve())
        .always(function(){

            $.each(api.jsModular.modules, function(role, code){
                api.jsEvent.page.mdArr.push({
                    role: role,
                    code: code,
                    area: "",
                    tags: {},
                    region: {},
                    config: {
                        global: {
                            isLogin: isLogin,
                            jumpUrl: jumpUrl,
                            pathUrl: pathUrl
                        }
                    },
                    request: {},
                    response: {},
                    floorCode: {0:10}
                });
            });

            api.jsEvent.page.mdArr.push({
                role: "header",
                code: "module_00001",
                area: "#body-header",
                tags: {},
                region: {},
                config: {
                    global: {
                        isLogin: isLogin,
                        pathUrl: pathUrl,
                        backUrl: backUrl,
                        jumpUrl: jumpUrl,
                        text_login: true,
                        title_text: "绑定手机",
                        icon_close: true
                    }
                },
                request: {},
                response: {},
                floorCode: {1:1}
            });

            api.jsEvent.page.mdArr.push({
                role: "bindMobile",
                code: "module_00015",
                area: "#body-center",
                tags: {},
                region: {},
                config: {
                    global: {
                        isLogin: isLogin,
                        jumpUrl: jumpUrl,
                        pathUrl: pathUrl,
                        openId: openId,
                        shopId: shopId
                    }
                },
                request: {
                    USER_REGISTRATION: {
                        userType:  userType,
                        loginType: loginType,
                        thirdAccount: unionId||openId,
                        reqHeader: { authentication: null }
                    },
                    AUTH_LOGIN: {
                        openId: unionId||openId,
                        loginType: loginType,
                        platUserType: platUserType,
                        reqHeader: { authentication: null }
                    }
                },
                response: {},
                floorCode: {2:1}
            });

            api.jsUtil.modular.floorQueue(api.jsEvent.page,"mdArr");
            api.jsUtil.modular.showModules(api.jsEvent.page.mdArr);

            $.when(
                api.jsModular.modules.header.state
            ).done(function(){
                document.querySelector("title").innerHTML =
                    api.jsModular.modules.header.config.global.shopInfo.name || "中国供销海外购";
            })

        });

    wx.ready(function () {
        shopId = localStorage.getItem('shopId') || 2;
        var data = {
            title: '中国供销海外购' + ' - ' + header_title
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
        $.when(api.jsModel.send("USER_SHOPINFO_QUERY"))
            .done(function(response){
                if(response && response.success && response.obj){
                    if(shopId == 287){
                        data.imgUrl = 'https://' + window.location.host + '/images/platform/weixinShare/esutong.jpg';
                        data.desc = '优质的产品、完善的服务，' + response.obj.name + '诚邀您的加盟！';
                    }else{
                        data.imgUrl = 'https://' + window.location.host + '/images/platform/weixinShare/ico_mp.jpg';
                        // data.imgUrl = 'https://' + window.location.host + '/images/platform/weixinShare/activity.jpg';
                        data.desc = '中国供销海外购是供销系统中唯一专业从事跨境电商行业的企业';
                    }
                    data.title = response.obj.name + ' - ' + header_title;
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
});