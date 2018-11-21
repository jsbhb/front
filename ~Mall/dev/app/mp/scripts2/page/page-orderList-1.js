
/** 个人中心
 *    @detail:    个人中心
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
    var redirect = api.jsData.location.redirect;
    var pathUrl = api.jsData.location.pathUrl;
    var backUrl = "";
    var jumpUrl = api.jsUtil.url.getParam("jumpUrl", 1)||"/personal-center.html";
    var queryType = api.jsUtil.url.getParam("queryType");
    var unionId = api.jsUtil.url.getParam("unionId");
    var orderInfoRequest = { orderFlag: 0 };
    var header_title = "订单列表";

    var orderAll = "active";
    var orderNeedPay = null;
    var orderNeedDeliver = null;
    var orderNeedReceive = null;
    var orderFinished = null;

    if(!isLogin){
        setTimeout(function(){ window.location.href="/login.html?jumpUrl=" + pathUrl;}, 300);
        return;
    }

    if(queryType === "needPay"){
        orderInfoRequest.status = 0;
        orderAll = null;
        orderNeedPay = "active";
        orderNeedDeliver = null;
        orderNeedReceive = null;
        orderFinished = null;
    }
    if(queryType === "needDeliver"){
        orderInfoRequest.statusArr = "1,2,3,4,5,11,12";
        orderAll = null;
        orderNeedPay = null;
        orderNeedDeliver = "active";
        orderNeedReceive = null;
        orderFinished = null;
    }
    if(queryType === "needReceived"){
        orderInfoRequest.status = 6;
        orderAll = null;
        orderNeedPay = null;
        orderNeedDeliver = null;
        orderNeedReceive = "active";
        orderFinished = null;
    }
    if(queryType === "finished"){
        orderInfoRequest.status = 7;
        orderAll = null;
        orderNeedPay = null;
        orderNeedDeliver = null;
        orderNeedReceive = null;
        orderFinished = "active";
    }


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
                        title_text: "我的订单"
                    }
                },
                request: {},
                response: {},
                floorCode: {1:1}
            });

            api.jsEvent.page.mdArr.push({
                role: "orderList",
                code: "module_00021",
                area: "#body-center",
                tags: {},
                region: {},
                config: {
                    global: {
                        isLogin: isLogin,
                        jumpUrl: jumpUrl,
                        pathUrl: pathUrl,
                        redirect: redirect,
                        orderAll: orderAll,
                        orderNeedPay: orderNeedPay,
                        orderNeedDeliver: orderNeedDeliver,
                        orderNeedReceive: orderNeedReceive,
                        orderFinished: orderFinished,
                        minHeight: $("#body-center").height()
                    }
                },
                request:{
                    ORDER_USER_QUERY:   orderInfoRequest,
                    ORDER_USER_DELETE:  orderInfoRequest,
                    ORDER_USER_CANCEL:  orderInfoRequest,
                    ORDER_USER_CLOSE:   orderInfoRequest,
                    ORDER_USER_CONFIRM: orderInfoRequest
                },
                response: {},
                floorCode: {2:1}
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
                floorCode: {3:1}
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