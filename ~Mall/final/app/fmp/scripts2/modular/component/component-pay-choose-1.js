define(["text!modular/template/template-pay-choose-1.mustache"],function(t){"use strict";var n=window.capi.get();return can.Component.extend({tag:"component-pay-choose-1",template:t,helpers:{spoceConfig:function(t){this.spcConfig=n.jsUtil.mustache.getContent(t,"object")},returnShow:function(t,e){var o=n.jsUtil.weChat.browser(),c=n.jsUtil.mustache.getContent(t,"string");return"btn_wx"===c?o?e.fn(this):e.inverse(this):"btn_zfb"===c?o?e.inverse(this):e.fn(this):"btn_yl"===c?e.fn(this):void 0}},scope:{},events:{inserted:function(){},removed:function(){},".component-pay-choose-btnGroup ul li touchend":function(){var t=this;if(n.jsEvent.touch.touchIsMoved)return null;t.scope.spcConfig.attr("payChooseShow",!1)},".component-pay-choose-btnGroup .btn_cancel touchend":function(){var t=this;return n.jsEvent.touch.touchIsMoved?null:(t.scope.spcConfig.attr().payState.reject(),!1)},".component-pay-choose-btnGroup .btn_wx touchend":function(){var t=this;return n.jsEvent.touch.touchIsMoved?null:(t.scope.spcConfig.attr().payState.resolve("weChatPay"),!1)},".component-pay-choose-btnGroup .btn_zfb touchend":function(){var t=this;return n.jsEvent.touch.touchIsMoved?null:(t.scope.spcConfig.attr().payState.resolve("aliPay"),!1)},".component-pay-choose-btnGroup .btn_yl touchend":function(){var t=this;return n.jsEvent.touch.touchIsMoved?null:(t.scope.spcConfig.attr().payState.resolve("unionPay"),!1)}}})});