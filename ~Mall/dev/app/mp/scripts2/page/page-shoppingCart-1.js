
/**  购物车
 *    @detail:    购物车
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
    var header_title = "购物车";


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
                        icon_back: true,
                        icon_search: false,
                        title_text: "购物车",
                        icon_shopCartEdit: false,
                        icon_shopCartSave: false
                    },
                    initList: {
                        icon_back: true,
                        icon_search: true,
                        title_text: "购物车",
                        icon_shopCartEdit: false,
                        icon_shopCartSave: false
                    }
                },
                request: {},
                response: {},
                floorCode: {1:1}
            });

            api.jsEvent.page.mdArr.push({
                role: "shoppingCart",
                code: "module_00019",
                area: "#body-center",
                tags: {},
                region: {},
                config: {
                    global: {
                        minHeight: $("#body-center").height() - 80,
                        isLogin: isLogin,
                        jumpUrl: jumpUrl,
                        pathUrl: pathUrl,
                        optionsOpen: false
                    }
                },
                request: {},
                response: {},
                floorCode: {2:1}
            });

            api.jsEvent.page.mdArr.push({
                role: "footer",
                code: "module_00002",
                area: "#body-footer",
                tags: {},
                region: {},
                config: {
                    global: {
                        isLogin: isLogin,
                        jumpUrl: jumpUrl,
                        pathUrl: pathUrl,
                        home: " ",
                        nav: " ",
                        shoppingCart: "active",
                        personalCenter: " "
                    }
                },
                request: {},
                response: {},
                floorCode: {3:1}
            });

            api.jsEvent.page.mdArr.push({
                role: "searchHistory",
                code: "module_00005",
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
                floorCode: {4:1}
            });

            api.jsEvent.page.mdArr.push({
                role: "scrollTop",
                code: "module_00029",
                area: "",
                tags: {},
                region: {},
                config: {
                    global:{
                        isLogin: isLogin,
                        jumpUrl: jumpUrl,
                        pathUrl: pathUrl
                    }
                },
                request: {},
                response: {},
                floorCode: {5:1}
            });

            api.jsUtil.modular.floorQueue(api.jsEvent.page,"mdArr");
            api.jsUtil.modular.showModules(api.jsEvent.page.mdArr);

            $.when(
                api.jsModular.modules.header.state
            ).done(function(){

                document.querySelector("title").innerHTML =
                    api.jsModular.modules.header.config.global.shopInfo.name || "中国供销海外购";

                api.jsModular.modules.header.renderData.global.response.shopCartCount?
                    api.jsModular.modules.header.renderData.global.config.attr("icon_search", false):
                    api.jsModular.modules.header.renderData.global.config.attr("icon_search", true);

                api.jsModular.modules.header.renderData.global.response.shopCartCount?
                    api.jsModular.modules.header.renderData.global.config.attr("icon_shopCartEdit", true):
                    api.jsModular.modules.header.renderData.global.config.attr("icon_shopCartEdit", false);

            });






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