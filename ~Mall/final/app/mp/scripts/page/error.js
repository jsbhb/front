!function(){"use strict";var o=window.app.getApi("jsData"),i=window.app.getApi("jsUtil"),n=window.app.getApi("jsModel"),s=window.app.getApi("jsEvent"),t=o.userInfo.shopId,e=o.userInfo.isLogin,p=o.location.pathUrl,a=o.siteInfo.shopName,r=o.siteInfo.shopAbout,g=o.siteInfo.shopHeadImg,h=o.siteInfo.shopDescribe,c=i.url.getParam("jumpUrl",1),d={info_shop:!1,icon_scan:!0,icon_news:!0,input:!0},u={jsData:o,jsUtil:i,jsModel:n,jsEvent:s,shopId:t,isLogin:e,pathUrl:p,jumpUrl:c,backUrl:"",shopName:a,shopAbout:r,shopHeadImg:g,shopDescribe:h,initList:d,icon_scan:!0,icon_news:!0,info_shop:!1,input:!0,home:" ",nav:" ",shoppingCart:" ",personalCenter:" ",gradientHide:!1};window.app.setPage=function(o,i){"string"==typeof o&&o.trim()&&(u[o]=i)},window.app.getPage=function(o){return"string"==typeof o&&o.trim()?u[o]:u}}();