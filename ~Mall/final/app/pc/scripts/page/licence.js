!function(){"use strict";var t=window.app.getApi("jsData"),e=window.app.getApi("jsUtil"),s=window.app.getApi("jsModel"),o=window.app.getApi("jsEvent"),i=t.siteInfo.title,p=t.userInfo.shopId,a=t.userInfo.isLogin,r=t.userInfo.centerId,n=t.location.pathUrl,u=t.siteInfo.shopName,g=t.siteInfo.shopAbout,d=t.siteInfo.shopHeadImg,l=t.siteInfo.shopDescribe,I=e.url.getParam("jumpUrl",1),m=e.url.getParam("status"),f=e.url.getParam("isBack"),h=e.url.getParam("sortId"),w=e.url.getParam("type"),c={jsData:t,jsUtil:e,jsModel:s,jsEvent:o,title:i,shopId:p,isLogin:a,centerId:r,pathUrl:n,jumpUrl:I,sortId:h,shopName:u,shopAbout:g,shopHeadImg:d,shopDescribe:l,platUserType:5,loginType:1,userType:5,status:m,isBack:f,type:w,mainHide:!1,mode:""};window.app.setPage=function(t,e){"string"==typeof t&&t.trim()&&(c[t]=e)},window.app.getPage=function(t){return"string"==typeof t&&t.trim()?c[t]:c}}();