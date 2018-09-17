
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
});