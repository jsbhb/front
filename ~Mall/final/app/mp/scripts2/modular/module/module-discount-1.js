define(["config.page.render"],function(o){"use strict";return window.capi.get(),o.extend({tags:{global:"<component-discount-1></component-discount-1>"},region:{global:{cfgDynamic:!0,resDynamic:!0,beforeFunc:function(o,t){null===t.response.global&&(o.response.global={}),"personalCenter"===o.config.global.type&&$.each(o.response.global,function(o,t){t.type=t.name.split("/")[1]||"",t.name=t.name.split("/")[0]||""})}}},config:{global:{status:0}},request:{COUPON_USERLIST_QUERY:{status:0}},response:{global:{}},sendArr:["COUPON_USERLIST_QUERY/global"],reload:!1,".component-discount-type li:not(.active) touchend":function(o){var t=this,e=$(o),r=e.attr("type");t.config.global.status=r,e.addClass("active").siblings(".active").removeClass("active"),t.toRender("COUPON_USERLIST_QUERY/global",{status:r},["global"])},".component-discount-list.personalCenter .list-item.normal .availableAll touchend":function(o){window.location.href="/index.html"},".component-discount-list.personalCenter .list-item.normal .classification touchend":function(o){var t=this,e=$(o),r=e.attr("index"),n=t.response.global[r].rule.range,i=t.response.global[r].rule.category;1===n&&(window.location.href="/searchProduct.html?firstCategory="+i),2===n&&(window.location.href="/searchProduct.html?secondCategory="+i),3===n&&(window.location.href="/searchProduct.html?thirdCategory="+i)},".component-discount-list.personalCenter .list-item.normal .lookGoodsDetail touchend":function(o){var t=this,e=$(o),r=e.attr("index"),n=t.response.global[r].rule.range,i=t.response.global[r].rule.bindingList||[],s=i.length;if(4===n&&i&&s>0){var a=Math.floor(Math.random()*s),c=i[a].goodsId;window.location.href="/goodsDetail.html?goodsId="+c}},".component-discount-list.orderConfirm .list-item:not(.lose):not(.used) touchend":function(o){var t=this,e=$(o),r=e.attr("couponId"),n=e.attr("discountType"),i=e.hasClass("select"),s=t.renderData.global.config,a=t.renderData.global.response,c=t.renderData.global.config.showDiscount,l=c.attr(),u=a.goodsTypeObj.attr(),d=a.attr("discountPrice"),p=a.orderDiscount.attr(),h=p.type,g=p.supplierId,f=l[n].pool[r],b=f.rule.range,m=f.rule.category,y=f.rule.valueType,v=f.rule.bindingList,A=f.rule.deductibleValue,C=0,w=-1,D=-1,O="",P="",_="";if(0===b)C=u[b].price,0===y&&(d=i?1*d-C*A:1*d+C*A,a.attr("discountPrice",d)),1===y&&(d=i?1*d-A:1*d+A,a.attr("discountPrice",d));else if(4===b){var S=[];$.each(v,function(o,t){void 0!==u[b][t]&&S.push(u[b][t].price)}),C=Math.max.apply(Math,S),0===y&&(d=i?1*d-C*A:1*d+C*A,a.attr("discountPrice",d)),1===y&&(d=i?1*d-A:1*d+A,a.attr("discountPrice",d))}else C=u[b][m].price,0===y&&(d=i?1*d-C*A:1*d+C*A,a.attr("discountPrice",d)),1===y&&(d=i?1*d-A:1*d+A,a.attr("discountPrice",d));"unSuperposition"===n&&(i?(O=l[n].chooseObj[r],P=O.split("_")[0]===h.toString(),_=O.split("_")[1]===g.toString(),P&&_&&(s.attr("choose","-1"),a.orderDiscount.info[n].attr("choose","-1"),c[n].chooseObj.removeAttr(r))):(s.attr("choose",r),a.orderDiscount.info[n].attr("choose",r),c[n].chooseObj.attr(r,h+"_"+g))),"superposition"===n&&(i?(O=l[n].chooseObj[r],P=O.split("_")[0]===h.toString(),_=O.split("_")[1]===g.toString(),P&&_&&(w=$.inArray(r,s.chooseArr),D=$.inArray(r,p.info[n].chooseArr),-1!==w&&s.chooseArr.splice(w,1),-1!==D&&a.orderDiscount.info[n].chooseArr.splice(D,1),c[n].chooseObj.removeAttr(r))):(w=$.inArray(r,s.chooseArr),D=$.inArray(r,p.info[n].chooseArr),-1===w&&s.chooseArr.push(r),-1===D&&a.orderDiscount.info[n].chooseArr.push(r),c[n].chooseObj.attr(r,h+"_"+g)))}})});