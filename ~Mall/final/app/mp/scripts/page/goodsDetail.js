!function(){"use strict";var e=window.app.getApi("jsData"),o=window.app.getApi("jsUtil"),t=window.app.getApi("jsModel"),i=window.app.getApi("jsEvent"),s=e.userInfo.shopId,a=e.userInfo.isLogin,r=e.location.pathUrl,p=e.siteInfo.shopName,n=e.siteInfo.shopAbout,h=e.siteInfo.shopHeadImg,d=e.siteInfo.shopDescribe,l=e.location.pathname.replace(/(\/?[^\/]+\/)*([^\/]+)\.html$/i,"$2"),m=o.url.getParam("itemId"),c=o.url.getParam("pushUserId"),u=o.url.getParam("jumpUrl",1),g={icon_home:!0,title_text:"商品详情",icon_search:!0,icon_shopCart:!0};if(o.url.delParam(["shopId","pushUserId"],"cover"),r=o.path.delParam(r,["shopId","pushUserId"]),"isShoper"!==c&&c&&window.localStorage.setItem("pushUserId",c),"isShoper"===c&&c&&window.localStorage.removeItem("pushUserId"),!l&&!m)return void setTimeout(function(){window.location.href="/index.html"},300);var I={jsData:e,jsUtil:o,jsModel:t,jsEvent:i,shopId:s,isLogin:a,pathUrl:r,jumpUrl:u,backUrl:"",shopName:p,shopAbout:n,shopHeadImg:h,shopDescribe:d,goodsId:l,itemId:m,initList:g,icon_home:!0,title_text:"商品详情",icon_search:!0,icon_shopCart:!0,home:"",nav:"",shoppingCart:"",personalCenter:"",goodsDetail:!0,gradientHide:!0};window.app.setPage=function(e,o){"string"==typeof e&&e.trim()&&(I[e]=o)},window.app.getPage=function(e){return"string"==typeof e&&e.trim()?I[e]:I}}();