
/** 微信授权页面
 *    @detail:    微信授权页面
 *    @return:    can.Control
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
require([
    "config.page.event",
    "config.page.modular",
    "config.page.mustache"
], function(){

    'use strict';

    document.querySelector("title").innerHTML = "微信授权中...";

    var api = window.capi.get(true);
    var code = api.jsUtil.url.getParam("code");
    var info = api.jsUtil.url.getParam("info");
    var state = api.jsUtil.url.getParam("state");
    var hostUrl = api.jsData.location.hostUrl;
    var snsapiBase = info.split("，")[0]||"";
    var isRegister = info.split("，")[1]||"";
    var jumpUrl = info.split("，")[2]||"";
    var shopId = info.split("，")[3]||"";
    var userId = info.split("，")[4]||"";
    var authId = info.split("，")[5]||"";
    var domain = info.split("，")[6]||"";
    var platUserType = 5;
    var loginType = 2;
    var header_title = "微信跳转";

    if (domain){
        domain = domain.replace(/^(http:\/\/)?([^\/]+)(\/.+)?/i, 'http://$2/');
    }
    if(domain && domain !== hostUrl){
        window.location.replace(window.location.href.replace(hostUrl, domain));
        return;
    }

    $.each(api.jsModular.modules, function(role, code){
        api.jsEvent.page.mdArr.push({
            role: role,
            code: code,
            area: "",
            tags: {},
            region: {},
            config: {},
            request: {},
            response: {},
            floorCode: {0:10}
        });
    });

    api.jsUtil.modular.floorQueue(api.jsEvent.page,"mdArr");
    api.jsUtil.modular.showModules(api.jsEvent.page.mdArr);

    api.jsModel.send("THIRD_WECHAT_LOGIN", {"code":code, "state":state})
        .done(function(response){
            if(snsapiBase === "true"){
                if(response && response.success){
                    var openId = response.obj && response.obj.openid || "";
                    var unionId = response.obj && response.obj.unionid || "";
                    if(response.obj.isFirst){
                        api.jsUtil.url.jumpPage("/bindMobile.html?shopId=" + shopId + "&openId=" + openId + "&unionId=" + unionId + "&jumpUrl="+jumpUrl, null);
                    }
                    else {
                        api.jsModel.send("AUTH_LOGIN", {
                            platUserType: platUserType,
                            loginType: loginType,
                            openId: unionId||openId
                        })
                        .done(function(response){
                            if(response && response.success){
                                var userId = response.obj.userCenterId;
                                var authId = '"Bearer "' + response.obj.token;
                                window.localStorage.setItem("authId", authId);
                                window.localStorage.setItem("userId", userId);
                                window.localStorage.setItem("openId", openId);
                                shopId && window.localStorage.setItem("shopId", shopId);
                                api.jsUtil.url.jumpPage(jumpUrl, "/index.html");
                            }
                            else if(response.errorMsg){
                                api.jsModular.modules.message.refresh({
                                    type: "error",
                                    content: response.errorMsg,
                                    confirmFun: function(){
                                        api.jsUtil.url.jumpPage("/login.html?jumpUrl="+jumpUrl, null, true);
                                    }
                                });
                            }
                            else{
                                api.jsModular.modules.message.refresh({
                                    type: "error",
                                    content: "微信登录失败！",
                                    confirmFun: function(){
                                        api.jsUtil.url.jumpPage("/login.html?jumpUrl="+jumpUrl, null, true);
                                    }
                                });
                            }
                        })
                        .fail(function(){
                            api.jsModular.modules.message.refresh({
                                type: "error",
                                content: "微信登录失败！",
                                confirmFun: function(){
                                    api.jsUtil.url.jumpPage("/login.html?jumpUrl="+jumpUrl, null, true);
                                }
                            });
                        });
                    }
                }
                else{
                    api.jsModular.modules.message.refresh({
                        type: "error",
                        content: "微信授权失败, 返回登录界面！",
                        confirmFun: function(){
                            api.jsUtil.url.jumpPage("/login.html?jumpUrl="+jumpUrl, null, true);
                        }
                    });
                }
            }
            else if(snsapiBase === "false"){
                if(response && response.success){
                    if(isRegister){
                        window.localStorage.setItem("authId", authId);
                        window.localStorage.setItem("userId", userId);
                        window.localStorage.setItem("alertDiscount", true);
                        window.localStorage.setItem("openId", response.obj||"");
                        shopId && window.localStorage.setItem("shopId", shopId);
                        api.jsUtil.url.jumpPage(jumpUrl, "/index.html");
                    } else {
                        window.localStorage.setItem("authId", authId);
                        window.localStorage.setItem("userId", userId);
                        window.localStorage.setItem("openId", response.obj||"");
                        shopId && window.localStorage.setItem("shopId", shopId);
                        api.jsUtil.url.jumpPage(jumpUrl, "/index.html");
                    }
                }
                else{
                    api.jsModular.modules.message.refresh({
                        type: "error",
                        content: "获取微信openId失败！",
                        confirmFun: function(){
                            api.jsUtil.url.jumpPage("/login.html?jumpUrl="+jumpUrl, null, true);
                        }
                    });
                }
            }
            else{
                api.jsModular.modules.message.refresh({
                    type: "error",
                    content: "snsapiBase值未设定！",
                    confirmFun: function(){
                        api.jsUtil.url.jumpPage("/login.html?jumpUrl="+jumpUrl, null, true);
                    }
                });
            }
        })
        .fail(function(){
            api.jsModular.modules.message.refresh({
                type: "error",
                content: "微信授权失败, 返回登录界面！",
                confirmFun: function(){
                    api.jsUtil.url.jumpPage("/login.html?jumpUrl="+jumpUrl, null, true);
                }
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