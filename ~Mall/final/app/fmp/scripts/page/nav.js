!function(){"use strict";var e=window.app.getApi("jsData"),o=window.app.getApi("jsUtil"),i=window.app.getApi("jsModel"),n=window.app.getApi("jsEvent"),t=e.userInfo.userId,s=e.userInfo.shopId,r=e.userInfo.gradeId,a=e.userInfo.centerId,l=e.userInfo.isLogin,p=e.userInfo.welfareVip,c=e.location.pathUrl,d=e.siteInfo.shopName,w=e.siteInfo.shopAbout,f=e.siteInfo.shopHeadImg,h=e.siteInfo.shopDescribe,u=o.url.getParam("jumpUrl",1),g=$.Deferred(),m={info_shop:!1,icon_scan:!0,icon_news:!0,input:!0};if(!l)return void setTimeout(function(){window.location.href="/login.html?jumpUrl="+c},200);p?g.resolve():i.send("USER_INVITERINFO_CHECK",{shopId:s||r,id:t}).done(function(o){o&&o.success&&!0===o.obj?(e.userInfo.welfareVip=!0,window.localStorage.setItem("welfareVip","v:"+s+"-"+t),g.resolve()):(e.userInfo.welfareVip=!1,window.localStorage.removeItem("welfareVip"),window.location.href="/bindInvitation.html?jumpUrl="+c,g.reject())}).fail(function(){setTimeout(function(){window.location.href="/login.html?jumpUrl="+c},200),g.reject()});var I={jsData:e,jsUtil:o,jsModel:i,jsEvent:n,userId:t,shopId:s,gradeId:r,centerId:a,isLogin:l,welfareVip:p,pathUrl:c,jumpUrl:u,backUrl:"",toRender:g,shopName:d,shopAbout:w,shopHeadImg:f,shopDescribe:h,initList:m,icon_scan:!0,icon_news:!0,info_shop:!1,input:!0,home:"active",shoppingCart:" ",personalCenter:" ",gradientHide:!1};window.app.setPage=function(e,o){"string"==typeof e&&e.trim()&&(I[e]=o)},window.app.getPage=function(e){return"string"==typeof e&&e.trim()?I[e]:I},wx.ready(function(){s=localStorage.getItem("shopId")||2;var e={title:"中国供销海外购"};-1==window.location.href.indexOf("?")?e.link=window.location.href+"?shopId="+s:e.link=window.location.href+"&shopId="+s,287==s?(e.imgUrl="https://"+window.location.host+"/images/platform/weixinShare/esutong.jpg",e.desc="优质的产品、完善的服务，俄速通全球购诚邀您的加盟！"):(e.imgUrl="https://"+window.location.host+"/images/platform/weixinShare/ico_mp.jpg",e.desc="中国供销海外购是供销系统中唯一专业从事跨境电商行业的企业"),$.when(i.send("USER_SHOPINFO_QUERY")).done(function(o){o&&o.success&&o.obj&&(287==s?(e.imgUrl="https://"+window.location.host+"/images/platform/weixinShare/esutong.jpg",e.desc="优质的产品、完善的服务，"+o.obj.name+"诚邀您的加盟！"):(e.imgUrl="https://"+window.location.host+"/images/platform/weixinShare/ico_mp.jpg",e.desc="中国供销海外购是供销系统中唯一专业从事跨境电商行业的企业"),e.title=o.obj.name),wx.onMenuShareAppMessage({title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl,success:function(e){}}),wx.onMenuShareTimeline({title:e.title,link:e.link,imgUrl:e.imgUrl,success:function(e){}})})})}();