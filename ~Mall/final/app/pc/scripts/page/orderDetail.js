!function(){"use strict";var t=window.app.getApi("jsData"),e=window.app.getApi("jsUtil"),o=window.app.getApi("jsModel"),i=window.app.getApi("jsEvent"),s=t.siteInfo.title,n=t.userInfo.shopId,r=t.userInfo.isLogin,p=t.userInfo.centerId,a=t.location.pathUrl,d=t.location.redirect,g=t.siteInfo.shopName,l=t.siteInfo.shopAbout,u=t.siteInfo.shopHeadImg,m=t.siteInfo.shopDescribe,f=e.url.getParam("jumpUrl",1),I=e.url.getParam("goodsName"),c=e.url.getParam("sortId");if(!r)return void setTimeout(function(){window.location.href="/login.html?jumpUrl="+a},300);var h={jsData:t,jsUtil:e,jsModel:o,jsEvent:i,title:s,shopId:n,isLogin:r,centerId:p,pathUrl:a,jumpUrl:f,redirect:d,sortId:c,shopName:g,shopAbout:l,shopHeadImg:u,shopDescribe:m,goodsName:I,mainHide:!1,mode:""};window.app.setPage=function(t,e){"string"==typeof t&&t.trim()&&(h[t]=e)},window.app.getPage=function(t){return"string"==typeof t&&t.trim()?h[t]:h}}();