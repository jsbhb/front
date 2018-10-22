define(["text!modular/template/template-orderConfirm-1.mustache"],function(e){"use strict";var t=window.capi.get();return can.Component.extend({tag:"component-orderconfirm-1",template:e,helpers:{spoceOrder:function(e){this.orders=t.jsUtil.mustache.getContent(e),this.setTaxFee(),this.setOrderPrice()},returnSpec:function(e,r){var n=t.jsUtil.mustache.getContent(e,"string"),a=n&&JSON.parse(n);return n&&r.fn(a)},returnPrice:function(e){return t.jsUtil.mustache.getContent(e,"number").toFixed(2)},returnSupplierName:function(e){var r="",n=t.jsUtil.mustache.getDepContent(e,"string");switch(n){case"天天仓":r="保税TT仓";break;case"粮油仓":r="保税LY仓";break;case"行云仓":r="保税XY仓";break;case"富邦仓":r="保税FB仓";break;default:r=n}return r},returnImgSrc:function(e){var r="";switch(t.jsUtil.mustache.getContent(e,"number")){case 0:r="/images/platform/tag/icon_cross.png";break;case 2:r="/images/platform/tag/icon_normal.png"}return r},returnIsShow:function(e,r){return void 0!=t.jsUtil.mustache.getContent(e,"number")?r.fn(this):r.inverse(this)},returnPostFee:function(e,r){var n=t.jsUtil.mustache.getContent(e,"string"),a=t.jsUtil.mustache.getContent(r,"number");return"2"===n?'<span class="money">物流或快递</span><span class="symbol"></span>':'<span class="money">'+a.toFixed(2)+'</span><span class="symbol">￥</span>'},returnTaxFee:function(e,r){var n=t.jsUtil.mustache.getContent(e,"number");return 2==t.jsUtil.mustache.getContent(r,"number")?"总价已含税费":"￥"+n}},scope:{setTaxFee:function(){var e=this,t=e.orders.attr();$.each(t.typeObj,function(t,r){$.each(r,function(r,n){var a=0,s=0,i=0,o=n.postFee,c=n.supplierPrice;$.each(n.itemObj,function(u,p){if(0==p.freeTax&&0==n.type){var m=(p.quantity||0)*(p.price||0),d=m/c*o,l=(m+d)/(1-p.exciseTax)*p.exciseTax,b=(m+d+l)*p.incrementTax,f=.7*(l+b);e.orders.typeObj[t][r].itemObj[u].attr("taxFee",f),e.orders.typeObj[t][r].itemObj[u].attr("postFee",d),a+=f,s+=l,i+=b}}),e.orders.typeObj[t][r].attr("taxFee",1*a.toFixed(2)),e.orders.typeObj[t][r].attr("exciseTaxFee",1*s.toFixed(2)),e.orders.typeObj[t][r].attr("incrementTaxFee",1*i.toFixed(2))})})},setOrderPrice:function(){var e=this,t=this.orders.attr();$.each(t.typeObj,function(t,r){$.each(r,function(r,n){var a=1*n.rakebackSupplierRealPrice,s=n.discountPrice||0,i=1*n.taxFee+1*n.rakebackSupplierRealPrice+1*n.postFee;e.orders.typeObj[t][r].attr("totalPrice",(1*a).toFixed(2)),e.orders.typeObj[t][r].attr("orderPrice",(1*i).toFixed(2)),e.orders.typeObj[t][r].attr("orderDiscountPrice",(1*i-1*s).toFixed(2))})})}},events:{inserted:function(){},removed:function(){}}})});