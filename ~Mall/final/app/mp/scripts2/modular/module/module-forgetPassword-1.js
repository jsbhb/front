define(["config.page.render"],function(e){"use strict";return window.capi.get(),e.extend({tags:{global:"<component-forgetpassword-1></component-forgetpassword-1>"},region:{global:{reqDynamic:!0,resDynamic:!1}},config:{global:{}},request:{global:{account:"",validation:"",password:"",confirmPassword:""}},sendArr:[],reload:!1,".component-forgetPassword-account #account blur":function(e){var t=this,n=$(e),o=t.modules.message,r=t.renderData.global.request.attr();t.jsUtil.check.phone(r.account)&&t.jsUtil.weChat.browser()&&t.sendRequest("AUTH_CHECK",{userName:r.account,phone:r.account}).done(function(e){e&&!0===e.success&&1==e.obj?n.removeClass("state_error"):(o.refresh({type:"error",cancelBtn:!1,confirmBtn:!1,content:"该手机号尚未注册！"}),n.addClass("state_error"))}).fail(function(){o.refresh({type:"error",cancelBtn:!1,confirmBtn:!1,content:"未能查询到该手机号是否已注册！"}),n.addClass("state_error")})},".component-forgetPassword-validation .getValidation touchend":function(e){var t=this,n=$(e),o=t.element,r=t.modules.message,a=n.parents(".component-forgetPassword-validation");o.find("#account").blur(),t.jsUtil.weChat.browser()?setTimeout(function(){var e=t.renderData.global.request.attr();!o.find("#account").hasClass("state_error")&&t.jsUtil.check.phone(e.account)&&t.sendRequest("THIRD_PHONE",{phone:e.account}).done(function(e){if(e&&e.success){var t=60,o=function(e){t>0?(t--,a.find(".doing .val").text(t),setTimeout(function(){o(e)},1e3)):e.addClass("getValidation")};n.removeClass("getValidation"),o(n)}else r.refresh({type:"warring",cancelBtn:!1,confirmBtn:!1,content:"验证码发送过于频繁"})}).fail(function(){r.refresh({type:"error",cancelBtn:!1,confirmBtn:!1,content:"抱歉，手机验证码发送失败，请重试！"})})},200):r.refresh({type:"error",cancelBtn:!1,confirmBtn:!1,content:"请在微信端进行操作！"})},".component-forgetPassword-forgetPasswordBtn:not(.state_error) touchend":function(){var e=this,t=e.element,n=e.modules.message,o=e.renderData.global.config.jumpUrl;e.jsUtil.weChat.browser()?setTimeout(function(){var r=e.renderData.global.request.attr();!t.find("#account").hasClass("state_error")&&e.jsUtil.check.phone(r.account)&&(window.localStorage.removeItem("authId"),window.localStorage.removeItem("userId"),window.localStorage.removeItem("openId"),e.sendRequest("AUTH_PWD_CHANGE",{userName:r.account,password:r.password,code:r.validation}).done(function(t){t&&t.success?n.refresh({content:"修改密码成功!",cancelBtn:!1,confirmBtn:!1,timeOutFun:function(){e.jsUtil.url.jumpPage("/login.html?jumpUrl="+o,null)}}):n.refresh({cancelBtn:!1,confirmBtn:!1,content:t.errorMsg})}).fail(function(){n.refresh({content:"修改密码失败!",confirmBtn:!1})}))},200):n.refresh({type:"error",cancelBtn:!1,confirmBtn:!1,content:"请在微信端进行操作！"})}})});