define(["config.page.render"],function(e){"use strict";var o=window.capi.get(),n=o.jsData.userInfo.isLogin,t=n?["COUPON_NODE_QUERY/global"]:[];return e.extend({tags:{global:"<component-alert-discount-1></component-alert-discount-1>"},region:{global:{reqDynamic:!0,resDynamic:!1,beforeFunc:function(e,o){$.isArray(o.response.global)&&0!==o.response.global.length||(e.config.global.isShow=!1)}}},config:{global:{isShow:window.localStorage.getItem("alertDiscount")}},request:{COUPON_NODE_QUERY:{node:1}},sendArr:t,reload:!1,refresh:function(e){var o=this,n=o.renderData.global.response,t=$.isArray(n)&&$.isPlainObject(n[0]);"object"==typeof e&&$.each(e,function(n){o.config.global[n]=e[n]}),t&&-1!==!n[0].receiveStatus||(o.config.global.isShow=!1),o.renderFunc(["global"])},".component-alert-discount-alert .msg-btn touchend":function(){var e=this,o=e.modules.message,n=e.renderData.global.response[0].couponId;e.sendRequest("COUPON_RECEIVE",{couponId:n}).done(function(n){n.success?(o.refresh({content:"领取成功！是否跳转到我的优惠券？",DOMClick:!1,cancelBtn:!0,confirmBtn:!0,cancelFun:function(){},confirmFun:function(){window.location.href=".discount.html?jumpUrl=/personal-center.html"}}),window.localStorage.removeItem("alertDiscount"),e.config.global={isShow:!1},e.refresh()):(o.refresh({cancelBtn:!1,confirmBtn:!1,content:n.errorMsg||"领取失败！"}),window.localStorage.removeItem("alertDiscount"),e.config.global={isShow:!1},e.refresh())}).fail(function(){o.refresh({cancelBtn:!1,confirmBtn:!1,content:"领取失败！"}),window.localStorage.removeItem("alertDiscount"),e.config.global={isShow:!1},e.refresh()})},".component-alert-discount-alert .cancel-btn touchend":function(){var e=this;window.localStorage.removeItem("alertDiscount"),e.config.global={isShow:!1},e.refresh()}})});