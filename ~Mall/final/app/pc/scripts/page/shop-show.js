!function(){"use strict";var e=window.app.getApi("jsData"),t=window.app.getApi("jsUtil"),o=window.app.getApi("jsModel"),s=window.app.getApi("jsEvent"),i=e.siteInfo.title,p=e.userInfo.shopId,n=e.userInfo.isLogin,a=e.userInfo.centerId,r=e.location.pathUrl,d=e.siteInfo.shopName,g=e.siteInfo.shopAbout,I=e.siteInfo.shopHeadImg,m=e.siteInfo.shopDescribe,u=t.url.getParam("jumpUrl",1),l=t.url.getParam("goodsName"),f=t.url.getParam("sortId"),h={jsData:e,jsUtil:t,jsModel:o,jsEvent:s,title:i,shopId:p,isLogin:n,centerId:a,pathUrl:r,jumpUrl:u,sortId:f,shopName:d,shopAbout:g,shopHeadImg:I,shopDescribe:m,goodsName:l,mainHide:!1,mode:""};window.app.setPage=function(e,t){"string"==typeof e&&e.trim()&&(h[e]=t)},window.app.getPage=function(e){return"string"==typeof e&&e.trim()?h[e]:h}}();