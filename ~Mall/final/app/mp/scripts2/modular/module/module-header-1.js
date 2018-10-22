define(["config.page.render"],function(o){"use strict";var e=window.capi.get(),n=e.jsData.userInfo.isLogin,t=e.jsData.userInfo.shopId,a=[];return n&&a.push("ORDER_SHOPPINGCART_COUNT/global/shopCartCount"),t&&a.push("USER_SHOPINFO_QUERY/global/shopInfo"),o.extend({tags:{global:"<component-header-1></component-header-1>"},region:{global:{cfgDynamic:!0,reqDynamic:!0,resDynamic:!0,beforeFunc:function(o,e){var n=o.config.global.shopName,t=o.config.global.shopAbout,a=o.config.global.shopHeadImg,r=o.config.global.shopDescribe;o.config.global.shopInfo=e.response.global&&e.response.global.shopInfo||{},o.config.global.shopInfo.headImg=o.config.global.shopInfo.headImg||a,o.config.global.shopInfo.aboutus=o.config.global.shopInfo.aboutus||t,o.config.global.shopInfo.name=o.config.global.shopInfo.name?o.config.global.shopInfo.name:n,o.config.global.shopInfo.description=r},afterFunc:function(o,n){e.jsModel.send("PAGE_HEADER1_QUERY_NODE",{}).done(function(e){var n=e&&e.cont&&e.cont[0]&&e.cont[0].title||"";o.renderData.global.config.attr("placeholder",n)})}}},config:{global:{historyCache:[],shopName:e.jsData.siteInfo.shopName,shopAbout:e.jsData.siteInfo.shopAbout,shopHeadImg:e.jsData.siteInfo.shopHeadImg,shopDescribe:e.jsData.siteInfo.shopDescribe}},request:{},response:{global:{}},sendArr:a,reload:!1,timer:null,".component-header-left   .icon_scan           touchend":function(){var o=this,e=o.modules.message;o.jsUtil.weChat.browser()?wx?wx.ready(function(){wx.scanQRCode({needResult:1,scanType:["qrCode","barCode"],success:function(o){o&&o.resultStr&&(window.location.href=o.resultStr)}})}):e.refresh({confirmBtn:!1,content:"暂且无法使用扫一扫功能，敬请谅解！"}):e.refresh({confirmBtn:!1,content:"请在微信端进行操作！"})},".component-header-left   .text_login          touchend":function(){var o=this,e=o.renderData.global.config.jumpUrl;window.location.href=e?"/login.html?jumpUrl="+e:"/login.html"},".component-header-left   .icon_back           touchend":function(){var o=this,e=o.renderData.global.config.backUrl;o.jsUtil.url.jumpPage(e,-1,!0)},".component-header-left   .icon_home           touchend":function(){window.location.href="/index.html"},".component-header-input   input               focus":function(o){var e=this,n=[],t=$(o),a=e.modules,r=t.parents(".component-header-input"),i=JSON.parse(window.localStorage.getItem("historyCache"))||[];r.addClass("isFocus"),$("html,body").animate({scrollTop:0}),$(document).find("component-footer-1").css("display","none"),$(a.searchHistory.element).css({display:"block"}),$(a.searchHistory.element).animate({left:"0"},500),e.renderData.global.config.attr("icon_scan",!1),e.renderData.global.config.attr("icon_news",!1),e.renderData.global.config.attr("info_shop",!1),e.renderData.global.config.attr("icon_back",!1),e.renderData.global.config.attr("icon_home",!1),e.renderData.global.config.attr("text_edit",!1),e.renderData.global.config.attr("text_save",!1),e.renderData.global.config.attr("icon_close",!1),e.renderData.global.config.attr("title_shop",!1),e.renderData.global.config.attr("title_text",!1),e.renderData.global.config.attr("text_login",!1),e.renderData.global.config.attr("text_manage",!1),e.renderData.global.config.attr("text_choose",!1),e.renderData.global.config.attr("icon_search",!1),e.renderData.global.config.attr("icon_shopCart",!1),e.renderData.global.config.attr("text_orderList",!1),e.renderData.global.config.attr("input",!0),e.renderData.global.config.attr("input_search",!0),e.renderData.global.config.attr("input_cancel",!0),$.each(i,function(o,e){n.push(e)}),a.searchHistory.renderData.global.config.attr("historyCache",n)},".component-header-input   input               keyup":function(){var o=this,n=$(o.element),t=n.find(".component-header-input input").val(),a=n.find(".component-header-input input").attr("placeholder");if(!t&&a&&(t=a),13===e.jsEvent.keyboard.keyboardCode)if(t.trim()){var r=[],i=JSON.parse(window.localStorage.getItem("historyCache"))||[];$.each(i,function(o,e){r.push(e.goodsName)});var c=$.inArray(t,r);-1!==c&&i.splice(c,1),i.unshift({goodsName:t}),i.splice(9,i.length-9),n.find(".component-header-input > input").blur(),window.localStorage.setItem("historyCache",JSON.stringify(i)),window.location.href=encodeURI("/searchProduct.html?goodsName="+t)}else window.location.href="/searchProduct.html?upShelves=1"},".component-header-input  .i_clear             touchend":function(o){$(o).parent().find("input").val("")},".component-header-right  .input_cancel        touchend":function(){var o=this,e=o.modules,n=o.element;o.renderData.global.config.attr("input",!1),o.renderData.global.config.attr("input_search",!1),o.renderData.global.config.attr("input_cancel",!1),$(e.searchHistory.element).animate({left:"101%"},500,function(){$(e.searchHistory.element).css({display:"none"})}),$.each(o.config.initList,function(e,n){o.renderData.global.config.attr(e,n)}),n.find(".component-header-input input").blur(),n.find(".component-header-input").removeClass("isFocus"),$(document).find("component-footer-1").css("display","block"),$("body").css({position:"static",overflow:"visible"})},".component-header-right  .icon_search         touchend":function(){var o=this,e=o.element;o.renderData.global.config.attr("input",!0),e.find(".component-header-input input").focus()},".component-header-right  .icon_close          touchend":function(){var o=this,e=o.renderData.global.config.backUrl;o.jsUtil.url.jumpPage(e,-1,!0)},".component-header-right  .info_shop           touchend":function(){var o=this,e=o.renderData.global.config.jumpUrl;window.location.href=e?"/index.html?jumpUrl="+e:"/index.html"},".component-header-right  .icon_shopCart       touchend":function(){window.location.href="/shoppingCart.html"},".component-header-right  .icon_orderList      touchend":function(){var o=this,e=o.renderData.global.config.pathUrl;window.location.href="/orderList.html?jumpUrl="+e},".component-header-right  .icon_choose         touchend":function(){var o=this,e=o.modules.discount,n=o.renderData.global.config.jumpUrl,t=e.renderData.global.response.attr(),a=e.renderData.global.config.showDiscount.attr(),r=e.renderData.global.response.attr("type"),i=e.renderData.global.response.attr("supplierId"),c=JSON.stringify(a||{}),l=localStorage.getItem("ordersInfo"),s=JSON.parse(l);s&&r&&i&&(s.typeObj[r][i]=t,l=JSON.stringify(s||{}),window.localStorage.removeItem("orderInfo"),window.localStorage.setItem("ordersInfo",l),window.localStorage.setItem("showDiscount",c),o.jsUtil.url.jumpPage(n,-1,!0))},".component-header-right  .icon_news           touchend":function(){this.modules.message.refresh({confirmBtn:!1,content:"咨询功能暂未开放，敬请谅解！"})}})});