define(["config.page.render"],function(e){"use strict";var n=window.capi.get();return e.extend({tags:{global:"<component-bindmobile-1></component-bindmobile-1>"},region:{global:{cfgDynamic:!0,reqDynamic:!0,resDynamic:!1}},config:{global:{}},request:{global:{account:"",validation:""}},response:{global:{}},sendArr:[],reload:!1,".component-bindMobile-validation .getValidation touchend":function(e){var n=this,t=$(e),o=n.modules.message,r=n.renderData.global.request.attr(),a=t.parents(".component-bindMobile-validation");n.jsUtil.weChat.browser()?n.jsUtil.check.phone(r.account)&&n.sendRequest("THIRD_PHONE",{phone:r.account}).done(function(e){if(e&&e.success){var n=60,r=function(e){n>0?(n--,a.find(".doing .val").text(n),setTimeout(function(){r(e)},1e3)):e.addClass("getValidation")};t.removeClass("getValidation"),r(t)}else o.refresh({type:"warring",cancelBtn:!1,confirmBtn:!1,content:"验证码发送过于频繁"})}).fail(function(){o.refresh({type:"error",cancelBtn:!1,confirmBtn:!1,content:"抱歉，手机验证码发送失败，请重试！"})}):o.refresh({cancelBtn:!1,confirmBtn:!1,content:"请在微信端进行操作！"})},".component-bindMobile-bingBtn:not(.state_error) touchend":function(){var e=this,t=e.element,o=e.modules.message,r=e.renderData.global.config.jumpUrl,a=n.jsData.userInfo.shopId,c=n.jsData.userInfo.openId;window.localStorage.removeItem("userId"),window.localStorage.removeItem("openId"),window.localStorage.removeItem("authId"),e.jsUtil.weChat.browser()?setTimeout(function(){var n=e.renderData.global.request.attr();!t.find("#account").hasClass("state_error")&&e.jsUtil.check.phone(n.account)&&e.sendRequest("USER_REGISTRATION",{phone:n.account,code:n.validation}).done(function(n){if(n&&n.success){var t=n.obj;e.sendRequest("AUTH_LOGIN",{userCenterId:t}).done(function(n){if(n&&n.success){var i='"Bearer "'+n.obj.token;window.localStorage.setItem("userId",t),window.localStorage.setItem("authId",i),window.localStorage.setItem("openId",c),window.localStorage.setItem("alertDiscount",!0),a&&window.localStorage.setItem("shopId",a),e.jsUtil.url.jumpPage("/bindInvitation.html?jumpUrl="+r,null)}else n.errorMsg?o.refresh({type:"error",cancelBtn:!1,confirmBtn:!1,content:n.errorMsg}):o.refresh({type:"error",cancelBtn:!1,confirmBtn:!1,content:"绑定手机失败！"})}).fail(function(){o.refresh({type:"error",cancelBtn:!1,confirmBtn:!1,content:"绑定手机失败！"})})}else n&&1==n.obj?o.refresh({type:"error",cancelBtn:!1,confirmBtn:!1,content:"验证码失效，请重试！"}):n.errorMsg?o.refresh({type:"error",cancelBtn:!1,confirmBtn:!1,content:n.errorMsg}):o.refresh({type:"error",cancelBtn:!1,confirmBtn:!1,content:"绑定手机失败！"})}).fail(function(){o.refresh({type:"error",cancelBtn:!1,confirmBtn:!1,content:"绑定手机失败！"})})},200):o.refresh({cancelBtn:!1,confirmBtn:!1,content:"请在微信端进行操作！"})}})});