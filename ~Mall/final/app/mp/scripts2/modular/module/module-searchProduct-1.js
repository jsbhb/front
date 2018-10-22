define(["config.page.render"],function(e){"use strict";var t=window.capi.get(),o=parseFloat(t.jsUtil.url.getParam("currentPage")||1);return e.extend({tags:{global:"<component-searchproduct-1></component-searchproduct-1>"},region:{global:{cfgDynamic:!1,reqDynamic:!1,resDynamic:!0,beforeFunc:function(e,t){1!=o&&e.jsUtil.url.delParam(["currentPage"],"cover"),o>1?(e.config.global.maxCurrentPage=o+1,e.config.global.minCurrentPage=o-1):(e.config.global.maxCurrentPage=1,e.config.global.minCurrentPage=1),e.config.global.totalPages=(t.response.global.pagination||{}).totalPages,$.each(e.response.global.goodsList,function(e,t){t.currentPage=o})},afterFunc:function(e,n){var a=n.response.global.pagination.totalPages,i=e.config.global.minCurrentPage,r=e.config.global.maxCurrentPage,s=$.extend(!0,{},e.request.GOODS_BASE_QUERY,{currentPage:i}),l=$.extend(!0,{},e.request.GOODS_BASE_QUERY,{currentPage:r}),c=[],g=parseFloat(localStorage.getItem("toTop"));if(localStorage.removeItem("toTop"),e.config.global.currentPage===e.config.global.totalPages?$(e.element).find(".isLoading span").text("没有更多数据了..."):$(e.element).find(".isLoading span").text("请下拉加载..."),o>1){e.config.global.isMinComm=!1;var u=t.jsModel.send("GOODS_BASE_QUERY",s).done(function(t){if(t&&t.success){var o=t.obj;$.each(o.goodsList.reverse(),function(t,o){o.currentPage=i,e.renderData.global.response.goodsList.unshift(o)}),e.config.global.minCurrentPage=o.pagination.currentPage,e.config.global.totalPages=o.pagination.totalPages,e.config.global.isMinComm=!0}}).fail(function(){e.config.global.isMinComm=!0});c.push(u)}if(1!=r&&r<=a){e.config.global.isMaxComm=!1;var f=t.jsModel.send("GOODS_BASE_QUERY",l).done(function(t){if(t&&t.success){var o=t.obj;$.each(o.goodsList,function(t,o){o.currentPage=r,e.renderData.global.response.goodsList.push(o)}),o.pagination.currentPage===o.pagination.totalPages&&$(".isLoading span").text("没有更多数据了..."),e.config.global.maxCurrentPage=o.pagination.currentPage,e.config.global.totalPages=o.pagination.totalPages,e.config.global.isMaxComm=!0}}).fail(function(){e.config.global.isMaxComm=!0});c.push(f)}$.when.apply(null,c).done(function(){$(window).scrollTop(g),g=void 0})}}},config:{global:{isMaxComm:!0,isMinComm:!0}},request:{GOODS_BASE_QUERY:{upShelves:t.jsUtil.url.getParam("upShelves")?1:null,numPerPage:10,currentPage:o}},response:{global:{}},sendArr:["GOODS_BASE_QUERY"],reload:!1,".searchProduct-header li touchend":function(e){var t=this,o=$(e),n=t.config.global.popState;o.hasClass("active")&&!o.hasClass("choose_price")||(o.hasClass("choose_general")?(n.sortType=1,n.currentPage=1,t.config.global.sortType=1,delete t.request.GOODS_BASE_QUERY["sortList[0].sortField"],delete t.request.GOODS_BASE_QUERY["sortList[0].sortRule"]):o.hasClass("choose_new")?(n.sortType=2,n.currentPage=1,t.config.global.sortType=2,t.request.GOODS_BASE_QUERY["sortList[0].sortField"]="create_time",t.request.GOODS_BASE_QUERY["sortList[0].sortRule"]="desc"):o.hasClass("sortType3")?(n.sortType=4,n.currentPage=1,t.config.global.sortType=4,t.request.GOODS_BASE_QUERY["sortList[0].sortField"]="price",t.request.GOODS_BASE_QUERY["sortList[0].sortRule"]="asc"):(n.sortType=3,n.currentPage=1,t.config.global.sortType=3,t.request.GOODS_BASE_QUERY["sortList[0].sortField"]="price",t.request.GOODS_BASE_QUERY["sortList[0].sortRule"]="desc"),t.config.global.currentPage=1,t.request.GOODS_BASE_QUERY.currentPage=1,t.toRender("GOODS_BASE_QUERY",{currentPage:1},["global"]).done(function(){$("html,body").animate({scrollTop:0},300),t.config.global.maxCurrentPage=1,t.config.global.minCurrentPage=1}),t.jsUtil.url.setParam(n,"cover",{code:"searchProduct"}))},"{window} scroll":function(){var e=this,t=$(document),o=e.config.global.totalPages,n=e.config.global.maxCurrentPage,a=e.config.global.minCurrentPage,i=n===o,r=e.config.global.isMaxComm,s=e.config.global.isMinComm,l=$(window).scrollTop()+$(window).height()+350>$(document).height(),c=5*$(".component-searchProduct-content li.item-content").outerHeight(!0);i?t.find(".isLoading span").text("没有更多数据了..."):t.find(".isLoading span").text("请下拉加载..."),0==$(window).scrollTop()&&a>1&&s&&(e.config.global.isMinComm=!1,e.sendRequest("GOODS_BASE_QUERY",{currentPage:a-1}).done(function(t){if(t&&t.success){var o=t.obj;$.each(o.goodsList.reverse(),function(t,o){o.currentPage=a-1,e.renderData.global.response.goodsList.unshift(o)}),e.config.global.minCurrentPage=o.pagination.currentPage,e.config.global.totalPages=o.pagination.totalPages,e.config.global.isMinComm=!0,$(window).scrollTop(c)}}).fail(function(){e.config.global.isMinComm=!0})),l&&n<o&&r&&(e.config.global.isMaxComm=!1,e.sendRequest("GOODS_BASE_QUERY",{currentPage:n+1}).done(function(o){if(o&&o.success){var a=o.obj;$.each(a.goodsList,function(t,o){o.currentPage=n+1,e.renderData.global.response.goodsList.push(o)}),a.pagination.currentPage===a.pagination.totalPages&&t.find(".isLoading span").text("没有更多数据了..."),e.config.global.maxCurrentPage=a.pagination.currentPage,e.config.global.totalPages=a.pagination.totalPages,e.config.global.isMaxComm=!0}}).fail(function(){e.config.global.isMaxComm=!0}))},".component-searchProduct-content .search_addShoppingCart touchend":function(e){var t=this,o=$(e),n=t.modules.message,a=o.parents(".item-content"),i=o.parents(".item-content").attr("toUrl"),r=o.parents(".item-content").attr("goodsId"),s=t.renderData.global.response.goodsList;"yes"===a.attr("isSingleSpec")?$.each(s,function(e,o){if(o.goodsId==r){var i=1,s=o.goodsFileList&&o.goodsFileList[0]||{},l=o.goodsSpecsList&&o.goodsSpecsList[0]||{},c=l.stock||0,g=l.priceList||[],u=function(e){var t={},o=[],n=[],a=!1;return $.each(e,function(e,t){var i=1*t.min?1*t.min:0,r=1*t.max?1*t.max:1/0;o.push(r),n.push(i),a=!0}),a?(t.minQuantity=Math.min.apply(Math,n),t.maxQuantity=Math.max.apply(Math,o),t):{minQuantity:0,maxQuantity:1/0}},f=u(g).minQuantity,d=u(g).maxQuantity;if(!t.renderData.global.config.isLogin)return void n.refresh({title:"温馨提示",content:"您尚未登录，请先登录！",DOMClick:!1,cancelBtn:!0,confirmBtn:!0,cancelFun:function(){},confirmFun:function(){window.location.href="/login.html?isBack=1"}});if(i<f&&(i=f),c<=0)return void n.refresh({content:"当前商品库存不足, 无法加入购物车中！",confirmBtn:!1});if(f>c)return void n.refresh({content:"当前数量已达至商品库存量, 无法加入购物车中！",confirmBtn:!1});var m=function(e){var i=a.find("img"),r=i.clone(),c=t.modules.footer.element,g=c.find("component-footer-1 .icon_shoppingCart");r.length&&(r.offset({top:i.offset().top,left:i.offset().left}).css({opacity:"0.5",position:"absolute",height:"150px",width:"150px","z-index":"99999999"}).appendTo($("body")).animate({top:g.offset().top+20,left:g.offset().left+70,width:50,height:50},1e3,"linear"),r.animate({width:0,height:0},function(){$(this).detach()})),t.sendRequest("ORDER_SHOPPINGCART_CREATE",{type:o.type,itemId:l.itemId,supplierId:o.supplierId,supplierName:o.supplierName,goodsName:o.customGoodsName,goodsImg:s.path||"",quantity:e}).done(function(){t.modules.header.sendRequest("ORDER_SHOPPINGCART_COUNT",{}).done(function(e){t.modules.footer.renderData.global.response.attr("count",e.obj),n.refresh({content:"添加成功",confirmBtn:!1})})})};t.sendRequest("ORDER_SHOPPINGCART_COUNT_ID",{itemId:o.goodsSpecsList[0].itemId}).done(function(e){if(e&&e.success){var t=e.obj||0;if(null!=d&&0!=d)if(t>=d)n.refresh({content:"当前该商品在购物车中的数量已达到最大购买量, 无法继续加入购物车中！",confirmBtn:!1});else if(i+t>d){var o=d-t;n.refresh({title:"购物车数量上限",content:"最大量"+d+"件; 已添加:"+t+"件, 可添加"+o+"件! 是否继续？",DOMClick:!1,cancelBtn:!0,confirmBtn:!0,cancelFun:function(){},confirmFun:function(){m(o)}})}else m(i);else m(i)}else n.refresh({content:"查询购物车内该商品数量失败！",confirmBtn:!1})}).fail(function(){n.refresh({content:"网络信号弱，请刷新重试",confirmBtn:!1})})}}):i&&n.refresh({title:"温馨提示",content:"该商品含有多个规格，正前往商品详情页面中！",DOMClick:!1,confirmBtn:!1,timeOutFun:function(){var e,n=o.parents(".item-content"),a=n.attr("tourl"),i=n.attr("currentPage"),r=5*n.outerHeight(!0),s=$(window).scrollTop(),l=i-1;if(i>1){var c=$("li[currentPage="+l+"]");e=$(c[c.length-1]).offset().top-s-196>-r/5?s%r:s%r+r}else e=s%r;localStorage.setItem("toTop",e),t.jsUtil.url.setParam({currentPage:i},"cover"),location.href=a+"?currentPage="+i}})},".component-searchProduct-content .item-content a click":function(e){var t,o=this,n=$(e).parents(".item-content"),a=n.attr("tourl"),i=n.attr("currentPage"),r=5*n.outerHeight(!0),s=$(window).scrollTop(),l=i-1;if(i>1){var c=$("li[currentPage="+l+"]");t=$(c[c.length-1]).offset().top-s-196>-r/5?s%r:s%r+r}else t=s%r;localStorage.setItem("toTop",t),o.jsUtil.url.setParam({currentPage:i},"cover"),location.href=a+"?currentPage="+i}})});