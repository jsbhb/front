!function(){"use strict";var o=window.app.getApi("jsData"),e=window.app.getApi("jsUtil"),t=window.app.getApi("jsModel"),i=window.app.getApi("jsEvent"),n=o.siteInfo.title,r=o.userInfo.shopId,s=o.userInfo.isLogin,p=o.userInfo.centerId,a=o.location.pathUrl,d=o.siteInfo.shopName,l=o.siteInfo.shopAbout,u=o.siteInfo.shopHeadImg,m=o.siteInfo.shopDescribe,c=e.url.getParam("jumpUrl",1),f=e.url.getParam("goodsName"),g=e.url.getParam("sortId"),h=JSON.parse(localStorage.getItem("ordersInfo")||"{}");if(!s)return void setTimeout(function(){window.location.href="/login.html?jumpUrl="+a},300);if($.isEmptyObject(h))return void setTimeout(function(){window.location.replace("/personal.html?childType=order")},300);if(!$.isEmptyObject(h)&&(!h.orderCount||h.orderCount<=0))return void setTimeout(function(){window.location.replace("/personal.html?childType=order")},300);var w={jsData:o,jsUtil:e,jsModel:t,jsEvent:i,title:n,shopId:r,isLogin:s,centerId:p,pathUrl:a,jumpUrl:c,sortId:g,shopName:d,shopAbout:l,shopHeadImg:u,shopDescribe:m,goodsName:f,mainHide:!1,mode:""};window.app.setPage=function(o,e){"string"==typeof o&&o.trim()&&(w[o]=e)},window.app.getPage=function(o){return"string"==typeof o&&o.trim()?w[o]:w}}();