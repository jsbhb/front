!function(){"use strict";var e=window.app.getApi("jsData"),n=window.app.getApi("jsUtil"),t=window.app.getApi("jsModel"),i=(window.app.getApi("jsEvent"),e.userInfo.centerId),o=e.location.redirect;$(document).on("click","[href*='void(0)'],[href='#'],[href='']",function(){$(this).removeAttr("href")}),i&&n.weChat.browser()&&$.when(t.send("THIRD_WECHAT_CONFIG",{url:o})).done(function(e){wx.config({debug:!1,appId:e.obj.appid,nonceStr:e.obj.nonceStr,timestamp:e.obj.timestamp,signature:e.obj.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","scanQRCode","hideMenuItems"]}),wx.ready(function(){wx.hideMenuItems({menuList:["menuItem:share:qq","menuItem:share:QZone","menuItem:share:weiboApp","menuItem:share:facebook"]})})})}();