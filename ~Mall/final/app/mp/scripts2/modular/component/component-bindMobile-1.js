define(["text!modular/template/template-bindMobile-1.mustache"],function(t){"use strict";var e=window.capi.get();return can.Component.extend({tag:"component-bindmobile-1",template:t,helpers:{},scope:{bingBtn_state:"",account_state:"",validation_state:"",validateIphone:function(t){return e.jsUtil.check.phone(t)},validateValidation:function(t){return""!==t.trim()&&/^.{6,18}$/gi.test(t)}},events:{inserted:function(){},removed:function(){},".component-bindMobile-content>div>.iconRight touchstart":function(t){var e=$(t),a=e.prev();e.addClass("active"),e.hasClass("icon_clear")?a.val(""):e.hasClass("icon_eye")&&a.attr("type","text")},".component-bindMobile-content>div>.iconRight touchend":function(t){var e=$(t),a=e.prev();e.removeClass("active"),e.hasClass("icon_eye")&&a.attr("type","password")},"#account blur":function(t){var e=this,a=$(t);e.scope.validateIphone(a.val())?e.scope.attr("account_state",""):e.scope.attr("account_state","state_error")},"#validation blur":function(t){var e=this,a=$(t);e.scope.validateValidation(a.val())?e.scope.attr("validation_state",""):e.scope.attr("validation_state","state_error")},".component-bindMobile-bingBtn touchend":function(){var t=this,e=t.element;e.find("#account").trigger("blur"),e.find("#validation").trigger("blur");var a="state_error"!==t.scope.attr("account_state"),n="state_error"!==t.scope.attr("validation_state");a&&n?t.scope.attr("bingBtn_state",""):t.scope.attr("bingBtn_state","state_error")}}})});