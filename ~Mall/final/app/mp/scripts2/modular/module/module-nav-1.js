define(["config.page.render"],function(e){"use strict";var t=window.capi.get();return e.extend({tags:{global:"<component-nav-1></component-nav-1>"},region:{global:{cfgDynamic:!0,reqDynamic:!1,resDynamic:!1}},config:{global:{showIndex:0}},request:{},response:{},sendArr:["PAGE_NAVIGATION"],reload:!1,"li[thirdId] touchend":function(e){var o=$(e),n=o.attr("thirdId"),r=o.text()&&o.text().trim()||"";if(!t.jsEvent.touch.touchIsMoved&&n&&r){var a=[],i=JSON.parse(window.localStorage.getItem("historyCache"))||[];$.each(i,function(e,t){a.push(t.goodsName)});var c=$.inArray(r,a);-1!==c&&i.splice(c,1),i.unshift({goodsName:r,thirdId:n}),i.splice(9,i.length-9),window.localStorage.setItem("historyCache",JSON.stringify(i)),window.location.href=encodeURI("/searchProduct.html?goodsName="+r+"&thirdCategory="+n)}}})});