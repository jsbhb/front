
/** 初始化 --- 模块初始化
 *    @detail:     模块初始化
 *    @return:     无
 *    @author:    林鹏腾
 *    @date:      2018.05.16
 */
(function(){

    'use strict';

    var Module = {};

    window.app.setModule = function(role, element){

        var jsUtil  =               window.app.getPage('jsUtil');
        var jsData  =               window.app.getPage('jsData');
        var jsModel =               window.app.getPage('jsModel');
        var jsEvent =               window.app.getPage('jsEvent');
        var isLogin =               window.app.getPage('isLogin');
        var pathUrl =               window.app.getPage('pathUrl');
        var jumpUrl =               window.app.getPage('jumpUrl');
        var backUrl =               window.app.getPage('backUrl');
        var siteInfo =              window.app.getPage('siteInfo');
        var pageName =              window.app.getPage('pageName');
        var shopName =              window.app.getPage('shopName');
        var shopAbout =             window.app.getPage('shopAbout');
        var shopHeadImg =           window.app.getPage('shopHeadImg');
        var shopDescribe =          window.app.getPage('shopDescribe');
        var itemId =                window.app.getPage('itemId');
        var goodsId =               window.app.getPage('goodsId');
        var shopId =                window.app.getPage('shopId');
        var pushUserId =            window.app.getPage('pushUserId');
        var initList =              window.app.getPage('initList');
        var text_login =            window.app.getPage('text_login');
        var icon_back =             window.app.getPage('icon_back');
        var icon_home =             window.app.getPage('icon_home');
        var title_shop =            window.app.getPage('title_shop');
        var title_text =            window.app.getPage('title_text');
        var input =                 window.app.getPage('input');
        var icon_scan =             window.app.getPage('icon_scan');
        var icon_news =             window.app.getPage('icon_news');
        var icon_search =           window.app.getPage('icon_search');
        var icon_AddressManage =    window.app.getPage('icon_AddressManage');
        var icon_AddressSure =      window.app.getPage('icon_AddressSure');
        var icon_shopCartEdit =     window.app.getPage('icon_shopCartEdit');
        var icon_shopCartSave =     window.app.getPage('icon_shopCartSave');
        var icon_orderList =        window.app.getPage('icon_orderList');
        var icon_choose =           window.app.getPage('icon_choose');
        var icon_close =            window.app.getPage('icon_close');
        var input_cancel =          window.app.getPage('input_cancel');
        var info_shop =             window.app.getPage('info_shop');
        var icon_shopCart =         window.app.getPage('icon_shopCart');
        var home =                  window.app.getPage('home');
        var nav =                   window.app.getPage('nav');
        var shoppingCart =          window.app.getPage('shoppingCart');
        var personalCenter =        window.app.getPage('personalCenter');
        var goodsDetail =           window.app.getPage('goodsDetail');
        var gradientHide =          window.app.getPage('gradientHide');
        var sendArr =               [];


        if ((/^error-1-\d+$/).test(role)) {
            Module[role] =  new Vue({
                el: element,
                data: {},
                methods: {
                },
                created: function(){
                    $("body").css("background-color", "#f6f7f9");
                },
                mounted: function(){
                    var height = $("#body-center").css("height");
                    $(element).css("height", height);
                }
            });
        }
        if ((/^message-1-\d+$/).test(role)) {
            Module[role] =  new Vue({
                el: element,
                data: {
                    time: 0,
                    type: "info",
                    language: "zh",
                    content: null,
                    DOMClick: false,
                    cancelBtn: false,
                    confirmBtn: true,
                    cancelFun: function (){},
                    confirmFun: function (){},
                    timeOutFun: function (){},
                    isShowing: false
                },
                computed: {
                    typeClass: function(){
                        return this.type? 'icon_' + this.type: 'icon_info';
                    },
                    getHeaderText: function(){
                        var headerText = '';
                        if(this.language === "en"){
                            switch(this.type){
                                case "success": headerText = "Success"; break;
                                case "error":   headerText = "Error"; break;
                                case "warning": headerText = "Warning"; break;
                                default:        headerText = "Information";
                            }
                        }
                        else{
                            switch(this.type){
                                case "success": headerText = "成功"; break;
                                case "error":   headerText = "失败"; break;
                                case "warning": headerText = "警告"; break;
                                default:        headerText = "提示";
                            }
                        }
                        return headerText;
                    }
                },
                methods: {
                    refresh: function(options){
                        if(!this.isShowing){
                            this.time =        options.time !== undefined?         options.time:         0;
                            this.type =        options.type !== undefined?         options.type:        'info';
                            this.language =    options.language !== undefined?     options.language:    'zh';
                            this.content =     options.content !== undefined?      options.content:     '';
                            this.DOMClick =    options.DOMClick !== undefined?     options.DOMClick:    false;
                            this.cancelBtn =   options.cancelBtn !== undefined?    options.cancelBtn:   false;
                            this.confirmBtn =  options.confirmBtn !== undefined?   options.confirmBtn:  false;
                            this.cancelFun =   options.cancelFun !== undefined?    options.cancelFun:   function (){};
                            this.confirmFun =  options.confirmFun !== undefined?   options.confirmFun:  function (){};
                            this.timeOutFun =  options.timeOutFun !== undefined?   options.timeOutFun:  function (){};
                        }
                    }
                },
                watch: {
                    content: function(){
                        var that = this;
                        var $element = $(that.$el);
                        that.$nextTick(function(){
                            if (that.content && that.confirmBtn !== false) {
                                that.isShowing = true;
                                $element.css({"opacity": 0});
                                $element.animate({"opacity": 1}, 500, "linear", function(){ that.isShowing = false; });
                            }
                            else if (that.content){
                                that.isShowing = true;
                                $element.css({"opacity": 0});
                                $element.stop(true).animate({"opacity": 1}, 360, function(){
                                    setTimeout(function(){
                                        $element.animate({"opacity": 0}, 600, function(){
                                            that.timeOutFun();
                                            that.time =       0;
                                            that.type =       "info";
                                            that.language =   "zh";
                                            that.content =    null;
                                            that.DOMClick =   false;
                                            that.cancelBtn =  false;
                                            that.confirmBtn = true;
                                            that.cancelFun =  function (){};
                                            that.confirmFun = function (){};
                                            that.timeOutFun = function (){};
                                            that.isShowing =  false;
                                        });
                                    }, (that.time||2000));
                                });
                            }
                        });
                    }
                },
                mounted: function(){
                    var that = this;
                    var $element = $(that.$el);
                    $(document).on("touchend", function(ev){
                        var event = ev || window.event;
                        var $node = $(event.target||event.srcElement);
                        var isElement = $node.filter('.message-1-content').length > 0;
                        var isElChild = $node.parents(".message-1-content").length > 0;
                        var isConfirm = that.confirmBtn !== false;
                        var DOMClick = that.DOMClick !== false;
                        if(!isElement && !isElChild && isConfirm && DOMClick){
                            $element.animate({"opacity": 0}, 600, function(){
                                that.cancelBtn
                                    ? that.cancelFun()
                                    : that.confirmFun();
                                that.time =        0;
                                that.type =        "info";
                                that.language =    "zh";
                                that.content =     null;
                                that.DOMClick =    false;
                                that.cancelBtn =   false;
                                that.confirmBtn =  true;
                                that.cancelFun =   function (){};
                                that.confirmFun =  function (){};
                                that.timeOutFun =  function (){};
                                that.isShowing =   false;
                            });
                        }
                    });
                    $element.on("touchend", ".message-footer .btn_confirm", function(){
                        $element.animate({"opacity": 0}, 600, function(){
                            that.confirmFun();
                            that.time =        0;
                            that.type =        "info";
                            that.language =    "zh";
                            that.content =     null;
                            that.DOMClick =    false;
                            that.cancelBtn =   false;
                            that.confirmBtn =  true;
                            that.cancelFun =   function (){};
                            that.confirmFun =  function (){};
                            that.timeOutFun =  function (){};
                            that.isShowing =   false;
                        });
                    });
                    $element.on("touchend", ".message-footer .btn_cancel", function(){
                        $element.animate({"opacity": 0}, 600, function(){
                            that.cancelFun();
                            that.time =        0;
                            that.type =        "info";
                            that.language =    "zh";
                            that.content =     null;
                            that.DOMClick =    false;
                            that.cancelBtn =   false;
                            that.confirmBtn =  true;
                            that.cancelFun =   function (){};
                            that.confirmFun =  function (){};
                            that.timeOutFun =  function (){};
                            that.isShowing =   false;
                        });
                    });
                }
            });
        }
        if ((/^navInlet-1-\d+$/).test(role)){
            Module[role] =  new Vue({
                el: element,
                data: {},
                methods: {},
                beforeCreate: function(){},
                created: function(){},
                mounted: function(){}
            });
        }
        if ((/^navInlet-2-\d+$/).test(role)){
            Module[role] =  new Vue({
                el: element,
                data: {},
                methods: {},
                created: function(){},
                mounted: function(){}
            });
        }
        if ((/^alertDiscount-1-\d+$/).test(role)) {
            sendArr = isLogin? ["COUPON_NODE_QUERY"]: [];
            jsModel.send(sendArr, { "node": 1 }, true)
                .done(function(response){
                    var message = Module['message-1-1'];
                    var isExist = $.isArray(response) && response.length > 0;
                    var dataObj = isExist? response[0]: {};
                    Module[role] =  new Vue({
                        el: element,
                        data: {
                            isShow: window.localStorage.getItem("alertDiscount") && isExist
                        },
                        computed: {

                        },
                        methods: {

                        },
                        mounted: function(){
                            var that = this;
                            var $element = $(that.$el);
                            $element.on("touchend", ".alertDiscount-show .msg-btn", function(){
                                jsModel.send('COUPON_RECEIVE', {
                                    'couponId': dataObj.couponId
                                }).done(function(response){
                                    if(response.success){
                                        message.refresh({
                                            content: "领取成功！是否跳转到我的优惠券？",
                                            DOMClick: false,
                                            cancelBtn: true,
                                            confirmBtn: true,
                                            cancelFun:  function(){},
                                            confirmFun: function(){
                                                window.location.href = '/discount.html?jumpUrl=/personal-center.html';
                                            }
                                        });
                                        that.isShow = false;
                                        window.localStorage.removeItem("alertDiscount");
                                    } else {
                                        message.refresh({
                                            cancelBtn: false,
                                            confirmBtn: false,
                                            content:   response && response.errorMsg || "领取失败！"
                                        });
                                        that.isShow = false;
                                        window.localStorage.removeItem("alertDiscount");
                                    }
                                }).fail(function(){
                                    message.refresh({
                                        cancelBtn: false,
                                        confirmBtn: false,
                                        "content":   "领取失败！"
                                    });
                                    that.isShow = false;
                                    window.localStorage.removeItem("alertDiscount");
                                });
                            });
                            $element.on("touchend", ".alertDiscount-show .cancel-btn", function(){
                                $element.animate({"opacity": 0}, 600, function(){
                                    that.isShow = false;
                                    $element.css("opacity", 1);
                                    window.localStorage.removeItem("alertDiscount");
                                });
                            });
                        }
                    });
                });
        }
        if ((/^header-1-\d+$/).test(role)) {
            if(shopId){ sendArr.push("USER_SHOPINFO_QUERY") }
            if(isLogin){ sendArr.push("ORDER_SHOPPINGCART_COUNT") }
            Module[role] =  new Vue({
                el: element,
                data: {
                    title:               '',
                    searchCont:          '',
                    historyCache:        [],
                    text_login:          text_login,
                    icon_back:           icon_back,
                    icon_home:           icon_home,
                    title_shop:          title_shop,
                    title_text:          title_text,
                    input:               input,
                    icon_scan:           icon_scan,
                    icon_news:           icon_news,
                    icon_search:         icon_search,
                    icon_AddressManage:  icon_AddressManage,
                    icon_AddressSure:    icon_AddressSure,
                    icon_shopCartEdit:   icon_shopCartEdit,
                    icon_shopCartSave:   icon_shopCartSave,
                    icon_orderList:      icon_orderList,
                    icon_choose:         icon_choose,
                    icon_close:          icon_close,
                    input_cancel:        input_cancel,
                    info_shop:           info_shop,
                    icon_shopCart:       icon_shopCart,
                    initList:            initList,
                    shopName:            shopName,
                    shopAbout:           shopAbout,
                    shopHeadImg:         shopHeadImg,
                    shopDescribe:        shopDescribe,
                    shopInfo:            {},
                    shopCartCount:       0
                },
                computed: {

                },
                methods: {
                    titleHandle: function(pageName){
                        var that = this;
                        var title = null;
                        var tempTitle = document.querySelector("title").innerHTML;
                        var oldTitle = tempTitle && tempTitle.split(/-+/i).pop()||'';
                        switch (pageName){
                            case "index":
                                title = that.shopInfo.name + "--首页";
                                document.querySelector("title").innerHTML = title;
                                break;
                            case "customerService":
                                title = "中国供销海外购--客服热线";
                                document.querySelector("title").innerHTML = title;
                                break;
                            default:
                                title = that.shopInfo.name + "--" + oldTitle;
                                document.querySelector("title").innerHTML = title;
                                break;
                        }
                    }
                },
                beforeCreate: function(){
                    var that = this;
                    jsModel.send(["PAGE_HEADER1_QUERY_NODE"], [])
                        .done(function(response){
                            that.title = response && response.cont && response.cont[0] && response.cont[0].title || '';
                        });
                },
                created: function(){
                    var that = this;
                    jsModel.send(sendArr, [], true)
                        .done(function(response){
                            var shopInfo = {};
                            var shopCartCount = 0;
                            var message = Module['message-1-1'];
                            if(sendArr.length > 1){
                                shopInfo = response["USER_SHOPINFO_QUERY"] || {};
                                shopCartCount = response["ORDER_SHOPPINGCART_COUNT"] || 0;
                            }
                            if (sendArr.length === 1) {
                                shopId && (shopInfo = response || {});
                                isLogin && (shopCartCount = response || 0);
                            }
                            that.shopInfo = shopInfo;
                            that.shopCartCount = shopCartCount;
                            that.shopInfo.headImg = that.shopInfo.headImg || that.shopHeadImg;
                            that.shopInfo.aboutus = that.shopInfo.aboutus || that.shopAbout;
                            that.shopInfo.name = that.shopInfo.name || that.shopName;
                            that.shopInfo.description = that.shopDescribe;
                            that.titleHandle(pageName);
                        });
                    that.shopInfo.headImg = that.shopInfo.headImg || that.shopHeadImg;
                    that.shopInfo.aboutus = that.shopInfo.aboutus || that.shopAbout;
                    that.shopInfo.name = that.shopInfo.name || that.shopName;
                    that.shopInfo.description = that.shopDescribe;
                    that.titleHandle(pageName);
                },
                mounted: function(){
                    var that = this;
                    var $element = $(that.$el);
                    $element.on("touchend",   ".header-left   .icon_scan",       function () {
                        var message = Module['message-1-1'];
                        if(jsUtil.weChat.browser()){
                            if(wx){
                                wx.ready(function(){
                                    wx.scanQRCode({
                                        needResult: 1,
                                        scanType: ["qrCode","barCode"],
                                        success: function (res) {
                                            res && res.resultStr && (window.location.href = res.resultStr);
                                        }
                                    });
                                });
                            }
                            else {
                                message.refresh({ confirmBtn: false, content: "暂且无法使用扫一扫功能，敬请谅解！"});
                            }
                        } else {
                            message.refresh({ confirmBtn: false, content: "请在微信端进行操作！"});
                        }
                    });
                    $element.on("touchend",   ".header-left    .text_login",     function () {
                        if(jumpUrl){ window.location.href = "/login.html?jumpUrl=" + jumpUrl }
                        if(!jumpUrl){ window.location.href = "/login.html" }
                    });
                    $element.on("touchend",   ".header-left    .icon_back",      function () {
                        jsUtil.url.jumpPage(backUrl, -1, true);
                    });
                    $element.on("touchend",   ".header-left    .icon_home",      function () {
                        window.location.href = "/index.html";
                    });
                    $element.on("focus",      ".header-input    input",          function (e) {
                        var tempCache= [];
                        var ev = e || window.event;
                        var $node = $(ev.currentTarget);
                        var $parent = $node.parents(".header-input");
                        var historyCache = JSON.parse(window.localStorage.getItem("historyCache"))||[];
                        $parent.addClass("isFocus");
                        $("html,body").animate({scrollTop: 0});
                        $(document).find("#footer-1-1").css("display", "none");
                        $(Module['searchHistory-1-1'].$el).css({"display": "block"});
                        $(Module['searchHistory-1-1'].$el).animate({"left": "0"}, 500);
                        that.input = true;
                        that.input_search = true;
                        that.input_cancel = true;
                        that.icon_scan = false;
                        that.icon_news = false;
                        that.info_shop = false;
                        that.icon_back = false;
                        that.icon_home = false;
                        that.text_edit = false;
                        that.text_save = false;
                        that.icon_close = false;
                        that.title_shop = false;
                        that.title_text = false;
                        that.text_login = false;
                        that.text_manage = false;
                        that.text_choose = false;
                        that.icon_search = false;
                        that.icon_shopCart = false;
                        that.text_orderList = false;
                        $.each(historyCache, function(index, obj){ tempCache.push(obj); });
                        Module['searchHistory-1-1'].historyCache = tempCache;
                    });
                    $element.on("keyup",      ".header-input    input",          function () {
                        var goodsName = $element.find(".header-input input").val();
                        var placeholder = $element.find(".header-input input").attr("placeholder");
                        if(!goodsName && placeholder){ goodsName = placeholder }
                        if(jsEvent.keyboard.keyboardCode === 13){
                            if (goodsName.trim()) {
                                var historyList = [];
                                var historyCache = JSON.parse(window.localStorage.getItem("historyCache"))||[];
                                $.each(historyCache, function(key, obj){ historyList.push(obj.goodsName); });
                                var index = $.inArray(goodsName, historyList);
                                index !== -1 && historyCache.splice(index, 1);
                                historyCache.unshift({ goodsName: goodsName });
                                historyCache.splice(9, historyCache.length-9);
                                $element.find(".header-input > input").blur();
                                window.localStorage.setItem("historyCache", JSON.stringify(historyCache));
                                window.location.href = encodeURI("/searchProduct.html?goodsName=" + goodsName);
                            } else {
                                window.location.href = "/searchProduct.html?upShelves=1";
                            }
                        }
                    });
                    $element.on("touchend",   ".header-input   .i_clear",        function (e) {
                        var ev = e || window.event;
                        var $node = $(ev.currentTarget);
                        $node.parent().find("input").val("");
                    });
                    $element.on("touchend",   ".header-right   .input_cancel",   function () {
                        that.input = false;
                        that.input_search = false;
                        that.input_cancel = false;
                        $(Module['searchHistory-1-1'].$el).animate({"left": "101%"}, 500, function () {
                            $(Module['searchHistory-1-1'].$el).css({"display": "none"});
                        });
                        $.each(that.initList, function(name, state){ that[name] = state;});
                        $("body").css({"position": "static", "overflow": "visible"});
                        $(document).find("#footer-1-1").css("display", "block");
                        $element.find(".header-input").removeClass("isFocus");
                        $element.find(".header-input input").blur();
                    });
                    $element.on("touchend",   ".header-right   .icon_search",    function () {
                        that.input = true;
                        that.$nextTick(function(){ $element.find(".header-input input").focus(); });
                    });
                    $element.on("touchend",   ".header-right   .icon_close",     function () {
                        jsUtil.url.jumpPage(backUrl, -1, true);
                    });
                    $element.on("touchend",   ".header-right   .info_shop",      function () {
                        if(jumpUrl){
                            window.location.href = "/index.html?jumpUrl=" + jumpUrl;
                        }else{
                            window.location.href = "/index.html";
                        }
                    });
                    $element.on("touchend",   ".header-right   .icon_shopCart",  function () {
                        window.location.href = "/shoppingCart.html"
                    });
                    $element.on("touchend",   ".header-right   .icon_orderList", function () {
                        window.location.href = "/orderList.html?jumpUrl=" + pathUrl;
                    });
                    $element.on("touchend",   ".header-right   .icon_choose",    function () {
                        var type = Module['discount-1-1'].type;
                        var orderInfo = Module['discount-1-1'].orderInfo;
                        var supplierId = Module['discount-1-1'].supplierId;
                        var showDiscount = Module['discount-1-1'].showDiscount;
                        var JSON_showDiscount = JSON.stringify(showDiscount||{});
                        var JSON_ordersInfo = window.localStorage.getItem("ordersInfo");
                        var ordersInfo = JSON.parse(JSON_ordersInfo);
                        if(ordersInfo && type && supplierId){
                            ordersInfo.typeObj[type][supplierId] = orderInfo;
                            JSON_ordersInfo = JSON.stringify(ordersInfo||{});
                            window.localStorage.removeItem("orderInfo");
                            window.localStorage.setItem("ordersInfo", JSON_ordersInfo);
                            window.localStorage.setItem("showDiscount", JSON_showDiscount);
                            jsUtil.url.jumpPage(jumpUrl, -1, true);
                        }
                    });
                    $element.on("touchend",   ".header-right   .icon_news",    function () {
                        var message = Module['message-1-1'];
                        message.refresh({ confirmBtn: false, content: "咨询功能暂未开放，敬请谅解！"});
                    });
                }
            });
        }
        if ((/^prompt-1-\d+$/).test(role)) {
            Module[role] =  new Vue({
                el: element,
                data: {
                    content: ''
                },
                computed: {

                },
                methods: {},
                beforeCreate: function(){
                },
                created: function(){

                },
                mounted: function(){
                    var that = this;
                    var $content = $(that.$el).find('.body');
                    var width = parseFloat($content.css('width'));
                    if(width > 720) $content.addClass('isMove');
                }
            });
        }
        if ((/^banner-1-\d+$/).test(role)) {
            Module[role] =  new Vue({
                el: element,
                data: {
                    gradientHide: gradientHide
                },
                computed: {

                },
                methods: {},
                beforeCreate: function(){
                },
                created: function(){

                },
                mounted: function(){
                    var that = this;
                    var $element = $(that.$el);
                    $element.roller({
                        loop: true,
                        eVisual: $element.find(".banner-bannerImg ul"),
                        eRoller: $element.find(".banner-bannerImg ul li"),
                        eButton: $element.find(".banner-carousel-spots .spot"),
                        beRollFunc: function(that, sortId){
                            var btnId = that.$eRoller.eq(sortId-1).attr("rollId");
                            that.$eButton.removeClass("active").eq(btnId-1).addClass("active");
                        },
                        edRollFunc: function(that){}
                    })
                }
            });
        }
        if ((/^introduce-1-\d+$/).test(role)) {
            Module[role] =  new Vue({
                el: element,
                data: {},
                computed: {},
                methods: {},
                beforeCreate: function(){},
                created: function(){},
                mounted: function(){}
            });
        }
        if ((/^advertising-1-\d+$/).test(role)) {
            Module[role] =  new Vue({
                el: element,
                data: {},
                computed: {},
                methods: {},
                beforeCreate: function(){},
                created: function(){},
                mounted: function(){}
            });
        }
        if ((/^advertising-2-\d+$/).test(role)) {
            Module[role] =  new Vue({
                el: element,
                data: {},
                computed: {},
                methods: {},
                beforeCreate: function(){},
                created: function(){},
                mounted: function(){}
            });
        }
        if ((/^goodsList-1-\d+$/).test(role)) {
            Module[role] =  new Vue({
                el: element,
                data: {},
                computed: {},
                methods: {
                    isShow: function(len){
                        return len%2 === 1? true: false;
                    },
                    showPrice: function(price){
                        return price*1 > 0? '￥' + (price*1).toFixed(2): "￥0.00";
                    }
                },
                beforeCreate: function(){},
                created: function(){},
                mounted: function(){
                }
            });
        }
        if ((/^goodsList-2-\d+$/).test(role)) {
            Module[role] =  new Vue({
                el: element,
                data: {},
                methods: {
                    showPrice: function(price){
                        return price*1 > 0? '￥' + (price*1).toFixed(2): "￥0.00";
                    }
                },
                created: function(){},
                mounted: function(){}
            });
        }
        if ((/^goodsList-3-\d+$/).test(role)) {
            Module[role] =  new Vue({
                el: element,
                data: {},
                methods: {
                    showPrice: function(price){
                        return price*1 > 0? '￥' + (price*1).toFixed(2): "￥0.00";
                    },
                    imgSrc: function(type){
                        var result = '';
                        if(type === 0 || type === "0"){
                            result = '/images/platform/tag/icon_cross.png';
                        }
                        if(type === 2 || type === "2"){
                            result = '/images/platform/tag/icon_normal.png';
                        }
                        return result;
                    },
                    tagExist: function(tagPath){
                        var result = false;
                        var isString = typeof tagPath === 'string';
                        var tagList = isString && tagPath && tagPath.split(",");
                        $.each(tagList||[], function(index, name){
                            if(name === "爆款" || name === "必选" || name === "热销" || name === "优选" ){
                                result = true;
                                return false;
                            }
                        });
                        return result;
                    },
                    tagHandle: function(tagPath){
                        var tags = [];
                        var isString = typeof tagPath === 'string';
                        var tagList = isString && tagPath && tagPath.split(",") || [];
                        $.each(tagList||[], function(index, name){
                            switch (name) {
                                case '必选':
                                    $.inArray('/images/platform/goodsList/goodsList-tag1.png', tags) === -1 &&
                                    tags.push('/images/platform/goodsList/goodsList-tag1.png');
                                    break;
                                case '爆款':
                                    $.inArray('/images/platform/goodsList/goodsList-tag2.png', tags) === -1 &&
                                    tags.push('/images/platform/goodsList/goodsList-tag2.png');
                                    break;
                                case '热销':
                                    $.inArray('/images/platform/goodsList/goodsList-tag3.png', tags) === -1 &&
                                    tags.push('/images/platform/goodsList/goodsList-tag3.png');
                                    break;
                                case '优选':
                                    $.inArray('/images/platform/goodsList/goodsList-tag4.png', tags) === -1 &&
                                    tags.push('/images/platform/goodsList/goodsList-tag4.png');
                                    break;
                            }
                        });
                        return tags;
                    }
                },
                created: function(){
                },
                mounted: function(){
                    var h = [0, 0, 0];
                    $(this.$el).find(".commodity-item").each(function(index){
                        var k = index%3;
                        var height = ($(this).height() * 1) + 10;
                        $(this).css({top: h[k], left: k * 240});
                        h[k] = h[k] + height;
                    });
                    $(this.$el).find(".commodity-center").css('height', Math.max.apply(null, h) + 'px');
                }
            });
        }
        if ((/^footer-1-\d+$/).test(role)) {
            var message = Module['message-1-1'];
            Module[role] =  new Vue({
                el: element,
                data: {
                    nav: nav,
                    home: home,
                    shoppingCart: shoppingCart,
                    personalCenter: personalCenter,
                    goodsDetail: goodsDetail,
                    isLogin: isLogin,
                    count: 0
                },
                computed: {},
                methods: {},
                beforeCreate: function(){
                    var that = this;
                    if(isLogin){
                        jsModel.send("ORDER_SHOPPINGCART_COUNT", {})
                            .done(function(response){
                                if(response && response.success){
                                    that.count = response.obj;
                                }
                            })
                    }
                },
                created: function(){},
                mounted: function(){
                    var that = this;
                    var $element = $(that.$el);
                    $element.on("touchend", ".footer-goodsDetail .icon_top", function(){
                        $("html,body").animate({scrollTop: 0}, 500);
                    });
                    $element.on("touchend", ".footer-goodsDetail .icon_back", function(){
                        var goodsDetail = Module['goodsDetail-1-1'];
                        if(goodsDetail){
                            goodsDetail.alertShow = false;
                            goodsDetail.alertBgShow = false;
                            $element.find(".footer-goodsDetail .icon_top").css("display", "block");
                            $element.find(".footer-goodsDetail .icon_back").css("display", "none");
                            $("html,body").animate({scrollTop: 0});
                        }
                    });
                    $element.on("click",    ".footer-goodsDetail .text_toBuy", function(){
                        var crossOrderMaxPrice = jsData.platform.rule.crossOrder.maxPrice;
                        var normalOrderMinPrice = jsData.platform.rule.normalOrder.minPrice;
                        var goodsDetail = Module['goodsDetail-1-1'];
                        var bool = goodsDetail.alertShow;
                        if(goodsDetail && !bool){
                            goodsDetail.alertShow = true;
                            goodsDetail.alertBgShow = true;
                            $("html,body").animate({scrollTop: 0});
                            $element.find(".footer-goodsDetail .icon_top").css("display", "none");
                            $element.find(".footer-goodsDetail .icon_back").css("display", "block");
                        } else if(goodsDetail) {
                            $("html,body").animate({scrollTop: 0});
                            var ordersInfo = { typeObj:{} };
                            var stock = goodsDetail.stock || 0;
                            var quantity = goodsDetail.quantity;
                            var minQuantity = goodsDetail.minQuantity;
                            var maxQuantity = goodsDetail.maxQuantity;
                            var name = $(goodsDetail.$el).find("[itemContCode]").attr("itemContCode")||"";
                            var itemObj = goodsDetail.itemCont[name] || {};
                            if(!isLogin){
                                message.refresh({
                                    content: "您尚未登录，是否先进行登录!",
                                    DOMClick: false,
                                    cancelBtn: true,
                                    confirmBtn: true,
                                    cancelFun: function () {
                                        goodsDetail.alertShow = false;
                                        goodsDetail.alertBgShow = false;
                                        $element.find(".footer-goodsDetail .icon_top").css("display", "block");
                                        $element.find(".footer-goodsDetail .icon_back").css("display", "none");
                                    },
                                    confirmFun: function () {
                                        window.location.href = "/login.html?jumpUrl=" + goodsDetail.pathUrl;
                                    }
                                });
                                return;
                            }
                            if(name === 'itemHide'){
                                message.refresh({confirmBtn: false, content: "请选择完规格，再加入购物车！"});
                                return;
                            }
                            if(name === 'downShelf'){
                                message.refresh({confirmBtn: false, content:"该商品所选规格已下架, 无法购买下单！"});
                                return;
                            }
                            if(stock<=0 || stock < minQuantity){
                                message.refresh({confirmBtn: false, content: "当前商品库存不足, 无法加入购物车中！"});
                                return;
                            }
                            var type = itemObj.type;
                            var itemId = itemObj.itemId;
                            var supplierId = itemObj.supplierId;
                            var supplierName = itemObj.supplierName;
                            var typeName = type===0? "跨境": type===2? "一般": type===1? "大贸": "";
                            ordersInfo.orderCount = 1;
                            ordersInfo.typeObj[type] = {};
                            ordersInfo.typeObj[type][supplierId] = {};
                            ordersInfo.typeObj[type][supplierId].taxFee = 0;
                            ordersInfo.typeObj[type][supplierId].postFee = 0;
                            ordersInfo.typeObj[type][supplierId].exciseTaxFee = 0;
                            ordersInfo.typeObj[type][supplierId].incrementTaxFee = 0;
                            ordersInfo.typeObj[type][supplierId].type = type;
                            ordersInfo.typeObj[type][supplierId].typeName = typeName;
                            ordersInfo.typeObj[type][supplierId].supplierId = supplierId;
                            ordersInfo.typeObj[type][supplierId].supplierName = supplierName;
                            ordersInfo.typeObj[type][supplierId].supplierWeight = itemObj.weight * quantity;
                            ordersInfo.typeObj[type][supplierId].supplierPrice = itemObj.price * quantity;
                            ordersInfo.typeObj[type][supplierId].supplierVipPrice = itemObj.vipPrice * quantity;
                            ordersInfo.typeObj[type][supplierId].supplierRealPrice = itemObj.realPrice * quantity;
                            ordersInfo.typeObj[type][supplierId].supplierRealVipPrice = itemObj.realVipPrice * quantity;
                            ordersInfo.typeObj[type][supplierId].itemObj = {};
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId] = {};
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].quantity = quantity;
                            //ordersInfo.typeObj[type][supplierId].itemObj[itemId].ids = itemObj.ids;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].status = itemObj.status;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].itemId = itemObj.itemId;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].goodsId = itemObj.goodsId;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].itemImg = itemObj.goodsImg;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].itemCode = itemObj.itemCode;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].goodsName = itemObj.goodsName;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].firstCategory = itemObj.firstCategory;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].secondCategory = itemObj.secondCategory;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].thirdCategory = itemObj.thirdCategory;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].picPath = itemObj.picPath || itemObj.goodsImg;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].exciseTax = itemObj.exciseTax;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].incrementTax = itemObj.incrementTax;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].priceList = itemObj.priceList;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].tagList = itemObj.tagList;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].tagFunId = itemObj.tagFunId;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].preSaleName = itemObj.preSaleName;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].preSaleDesc = itemObj.preSaleDesc;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].type = itemObj.type;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].href = itemObj.href;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].freePost = itemObj.freePost;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].freeTax = itemObj.freeTax;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].sku = itemObj.sku;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].info = itemObj.info;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].stock = itemObj.stock>0? itemObj.stock: 0;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].weight = itemObj.weight;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].price = itemObj.price;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].vipPrice = itemObj.vipPrice;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].realPrice = itemObj.realPrice;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].realVipPrice = itemObj.realVipPrice;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].minPrice = itemObj.minPrice;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].maxPrice = itemObj.maxPrice;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].vipMinPrice = itemObj.vipMinPrice;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].vipMaxPrice = itemObj.vipMaxPrice;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].realMinPrice = itemObj.realMinPrice;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].realMaxPrice = itemObj.realMaxPrice;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].realVipMinPrice = itemObj.realVipMinPrice;
                            ordersInfo.typeObj[type][supplierId].itemObj[itemId].realVipMaxPrice = itemObj.realVipMaxPrice;
                            if(itemObj.type*1 === 2){
                                if(itemObj.realPrice * quantity < normalOrderMinPrice && itemObj.supplierId * 1 === 6){
                                    message.refresh({ confirmBtn: false, content: "一般贸易商品订单需满" + normalOrderMinPrice + "元才可下单！"});
                                }else{
                                    window.location.href = encodeURI("/orderConfirm.html?jumpUrl=" + goodsDetail.pathUrl);
                                }
                            }else if(itemObj.type*1 === 0){
                                if(itemObj.realPrice * quantity > crossOrderMaxPrice && quantity*1 > 1){
                                    message.refresh({ confirmBtn: false, content: "跨境商品单笔订单价格不得超过" + crossOrderMaxPrice + "元！"});
                                }
                                else{
                                    window.location.href = encodeURI("/orderConfirm.html?jumpUrl=" + goodsDetail.pathUrl);
                                }
                            }
                            goodsDetail.alertShow = false;
                            goodsDetail.alertBgShow = false;
                            window.localStorage.setItem("showDiscount", "{}");
                            window.localStorage.setItem("ordersInfo", JSON.stringify(ordersInfo));
                            $element.find(".footer-goodsDetail .icon_top").css("display", "block");
                            $element.find(".footer-goodsDetail .icon_back").css("display", "none");
                        }
                    });
                    $element.on("click",    ".footer-goodsDetail .text_addShopCart", function(){
                        var header = Module['header-1-1'];
                        var footer = Module['footer-1-1'];
                        var goodsDetail = Module['goodsDetail-1-1'];
                        var bool = goodsDetail.alertShow;
                        if(goodsDetail && !bool){
                            goodsDetail.alertShow = true;
                            goodsDetail.alertBgShow = true;
                            $("html,body").animate({scrollTop: 0});
                            $element.find(".footer-goodsDetail .icon_top").css("display", "none");
                            $element.find(".footer-goodsDetail .icon_back").css("display", "block");
                        } else if(goodsDetail){
                            $("html,body").animate({scrollTop: 0});
                            var stock = goodsDetail.stock || 0;
                            var quantity = goodsDetail.quantity;
                            var minQuantity = goodsDetail.minQuantity;
                            var maxQuantity = goodsDetail.maxQuantity;
                            var name = $(goodsDetail.$el).find("[itemContCode]").attr("itemContCode")||"";
                            var itemObj = goodsDetail.itemCont[name];
                            var createFunc = function(quantity){
                                var cart = $(header.$el).find('.header-right .icon_shopCart');
                                var imgtodrag = $(goodsDetail.$el).find(".goodsDetail-alert-body-msg-left a img");
                                var imgclone = imgtodrag.clone();
                                if(imgclone.length){
                                    imgclone.offset({
                                        top: imgtodrag.offset().top+200,
                                        left: imgtodrag.offset().left+350
                                    }).css({
                                        'opacity': '0.5',
                                        'position': 'absolute',
                                        'height': '150px',
                                        'width': '150px',
                                        'z-index': '99999999'
                                    }).appendTo($('body')).animate({
                                        'top': cart.offset().top + 10,
                                        'left': cart.offset().left + 10,
                                        'width': 50,
                                        'height': 50
                                    }, 1000, 'linear');
                                    imgclone.animate({
                                        'width': 0,
                                        'height': 0
                                    }, function () {
                                        $(this).detach();
                                    });
                                }
                                jsModel.send("ORDER_SHOPPINGCART_CREATE", {
                                    type: itemObj.type,
                                    itemId: itemObj.itemId,
                                    supplierId: itemObj.supplierId,
                                    supplierName: itemObj.supplierName,
                                    goodsName: itemObj.goodsName,
                                    goodsImg: itemObj.goodsImg,
                                    quantity: quantity
                                }).done(function(response){
                                    if(response && response.success){
                                        jsModel.send("ORDER_SHOPPINGCART_COUNT",{})
                                            .done(function(response2){
                                                if(response2 && response2.success){
                                                    header.shopCartCount = response2.obj || 0;
                                                    message.refresh({confirmBtn: false, content:'添加成功'});
                                                }
                                            });
                                    }
                                });
                                goodsDetail.alertShow = false;
                                goodsDetail.alertBgShow = false;
                                $element.find(".footer-goodsDetail .icon_top").css("display", "block");
                                $element.find(".footer-goodsDetail .icon_back").css("display", "none");
                            };
                            if(!isLogin){
                                message.refresh({
                                    content: "您尚未登录，是否先登录！",
                                    DOMClick: false,
                                    cancelBtn: true,
                                    confirmBtn: true,
                                    cancelFun: function () {
                                        goodsDetail.alertShow = false;
                                        goodsDetail.alertBgShow = false;
                                        $element.find(".footer-goodsDetail .icon_top").css("display", "block");
                                        $element.find(".footer-goodsDetail .icon_back").css("display", "none");
                                    },
                                    confirmFun: function () {
                                        window.location.href = "/login.html?jumpUrl=" + goodsDetail.pathUrl;
                                    }
                                });
                                return;
                            }
                            if(name === 'itemHide'){
                                message.refresh({confirmBtn: false, content: "请选择完规格，再加入购物车！"});
                                return;
                            }
                            if(name === 'downShelf'){
                                message.refresh({confirmBtn: false, content:"该商品所选规格已下架, 无法购买下单！"});
                                return;
                            }
                            if(stock<=0 || stock < minQuantity){
                                message.refresh({confirmBtn: false, content: "当前商品库存不足, 无法加入购物车中！"});
                                return;
                            }
                            jsModel.send("ORDER_SHOPPINGCART_COUNT_ID", {
                                itemId: itemObj.itemId
                            }).done(function(response){
                                if(response && response.success){
                                    var count = response.obj||0;
                                    if(count>=maxQuantity){
                                        message.refresh({
                                            content: "当前该商品在购物车中的数量已达到最大购买量, 无法继续加入购物车中！",
                                            confirmFun: function () {
                                                goodsDetail.alertShow = false;
                                                goodsDetail.alertBgShow = false;
                                                $element.find(".footer-goodsDetail .icon_top").css("display", "block");
                                                $element.find(".footer-goodsDetail .icon_back").css("display", "none");
                                            }
                                        });
                                    }else if(quantity+count > maxQuantity){
                                        var newQuantity = maxQuantity - count;
                                        message.refresh({
                                            content: "该商品可允许最大购买量为:" + maxQuantity + "件; 目前在购物车中已有:" + count + "件, 最多可往购物车中加入" + newQuantity +"件! 是否继续？",
                                            DOMClick: false,
                                            cancelBtn: true,
                                            confirmBtn: true,
                                            cancelFun: function () {
                                                goodsDetail.alertShow = false;
                                                goodsDetail.alertBgShow = false;
                                                $element.find(".footer-goodsDetail .icon_top").css("display", "block");
                                                $element.find(".footer-goodsDetail .icon_back").css("display", "none");
                                            },
                                            confirmFun: function () {
                                                createFunc(newQuantity);
                                            }
                                        });
                                    }else{
                                        createFunc(quantity);
                                    }
                                }
                            })
                        }
                    });
                }
            });
        }
        if ((/^scrollTop-1-\d+$/).test(role)) {
            Module[role] =  new Vue({
                el: element,
                data: {
                    show: false
                },
                computed: {},
                methods: {},
                beforeCreate: function(){},
                created: function(){},
                mounted: function(){
                    var that = this;
                    var $element = $(that.$el);
                    that.show = $(window).scrollTop() >= 1500;
                    $(window).on("scroll", function(){
                        that.show = $(window).scrollTop() >= 1500;
                    });
                    $element.on("touchend", ".scrollTop-1-content .scrollTop", function(){
                        $("html,body").animate({scrollTop: 0}, 500);
                    });
                }
            });
        }
        if ((/^searchHistory-1-\d+$/).test(role)) {
            jsModel.send(['PAGE_NAVIGATION'], {}, true)
                .done(function(response){
                    var hotSearchList = [];
                    $.each(response || [], function(index, navObj){
                        hotSearchList.push({
                            firstId: navObj.id,
                            industryName: navObj.industryName
                        })
                    });
                    Module[role] =  new Vue({
                        el: element,
                        data: {
                            historyCache: window.localStorage.getItem('historyCache') || [],
                            hotSearchList: hotSearchList
                        },
                        computed: {},
                        methods: {},
                        beforeCreate: function(){},
                        created: function(){},
                        mounted: function(){
                            var that = this;
                            var $element = $(that.$el);
                            var message = Module['message-1-1'];
                            $element.on("touchend", ".searchHistory-1-content li", function(e){
                                var ev = e || window.event;
                                var $node = $(ev.target||ev.srcElement);
                                var goodsName = $node.text() && $node.text().trim() || "";
                                var firstCategory = $node.attr("firstId") && $node.attr("firstId").trim() || "";
                                var secondCategory = $node.attr("secondId") && $node.attr("secondId").trim() || "";
                                var thirdCategory = $node.attr("thirdId") && $node.attr("thirdId").trim() || "";
                                if(!jsEvent.touch.touchIsMoved){
                                    var historyList = [];
                                    var historyCache = JSON.parse(window.localStorage.getItem("historyCache"))||[];
                                    $.each(historyCache, function(index, obj){ historyList.push(obj.goodsName); });
                                    var index = $.inArray(goodsName, historyList);
                                    if(index !== -1){ historyCache.splice(index,1); }
                                    historyCache.unshift({
                                        goodsName: goodsName,
                                        firstId: firstCategory,
                                        secondId: secondCategory,
                                        thirdId: thirdCategory
                                    });
                                    historyCache.splice(9, historyCache.length-9);
                                    window.localStorage.setItem("historyCache", JSON.stringify(historyCache));
                                    window.location.href = encodeURI("/searchProduct.html?goodsName="+goodsName+"&firstCategory="+firstCategory+"&secondCategory="+secondCategory+"&thirdCategory="+thirdCategory);
                                }
                            });
                            $element.on("touchend", ".searchHistory-1-content .icon_delete ", function(){
                                message.refresh({
                                    content: "是否清除所有搜索内容？",
                                    DOMClick: false,
                                    cancelBtn: true,
                                    confirmBtn: true,
                                    cancelFun: function(){},
                                    confirmFun: function(){
                                        window.localStorage.setItem("historyCache", JSON.stringify([]));
                                        that.historyCache = [];
                                    }
                                });
                            });
                        }
                    });
                });
        }
        if ((/^goodsDetail-1-\d+$/).test(role)) {
            var header = Module['header-1-1'];
            var message = Module['message-1-1'];
            jsModel.send('GOODS_ID_QUERY_NODE', { goodsId: goodsId })
                .done(function(dataObj) {
                    Module[role] =  new Vue({
                        el: element,
                        data: {
                            pathUrl: pathUrl,
                            isFreePost: null,
                            alertBgShow: false,
                            alertShow: false,
                            status: null,
                            stock: 0,
                            quantity: 1,
                            minQuantity: 0,
                            maxQuantity: Infinity,
                            spcExciseTax: 0,
                            spcIncrementTax: 0,
                            spcCarton: '',
                            spcPrice: "0.00",
                            spcVipPrice: "0.00",
                            spcRealPrice: "0.00",
                            spcRealVipPrice: "0.00",
                            itemContCode: "itemHide",
                            quantityTimer: null,
                            quantityDes: "",
                            couponList: [],
                            objArr: [],
                            mdData: dataObj && dataObj.cont || {}
                        },
                        computed: {

                        },
                        methods: {
                            getItemObj: function(classify){
                                var that = this;
                                var regex;
                                var index = 0;
                                var regexArr = [];
                                var activeObj = {};
                                var codeArr = that.codeArr;
                                var itemCont = that.itemCont;
                                var objArr = that.objArr = [];
                                var oItemKey = $.extend(true, {}, that.itemKey);
                                $.each(oItemKey||{}, function(name){
                                    if(!classify[name]) { classify[name] = "[^;]*"; }
                                });
                                $.each(classify||{}, function(name, value){
                                    var k1 = $.inArray(name, codeArr);
                                    k1 !== -1 && (regexArr[k1] = value);
                                });
                                regex = new RegExp('^' + regexArr.join(";") + '$', "");
                                $.each(itemCont, function(name, obj){
                                    if(regex.test(name)){
                                        objArr.push(itemCont[name]);
                                        that.itemContCode = name;
                                        that.itemContTagList = obj.tagList;
                                        that.itemContTag = { preSaleName: obj.preSaleName, preSaleDesc: obj.preSaleDesc };
                                        that.stock = obj.stock>0? obj.stock: 0;
                                        that.status = obj.status;
                                        index++;
                                    }
                                    $.each(classify, function(n1){
                                        var tempArr = [], tempRegex;
                                        var tempObj = $.extend(true, {}, classify);
                                        $.each(tempObj||{}, function(n2, o2){
                                            var k2 = $.inArray(n2, codeArr);
                                            n1 === n2 && (tempArr[k2] = "[^;]*");
                                            n1 !== n2 && k2 !== -1 && (tempArr[k2] = o2);
                                        });
                                        tempRegex = new RegExp('^' + tempArr.join(";") + '$', "");
                                        if(tempRegex.test(name)) {
                                            $.each(name.split(";"), function (i, n) {
                                                if (n) {
                                                    var cName = that.codeArr[i];
                                                    if(cName === n1){
                                                        activeObj[cName] = activeObj[cName] || [];
                                                        $.inArray(n, activeObj[cName]) === -1 && activeObj[cName].push(n);
                                                    }
                                                }
                                            });
                                        }
                                    });
                                });
                                $.each(activeObj, function(name, keyArr){
                                    $.each(keyArr, function(kIndex, keyName){
                                        var keyIndex = $.inArray(keyName, oItemKey[name]);
                                        if(keyIndex !== -1){ oItemKey[name].splice(keyIndex,1); }
                                    })
                                });
                                if(index !== 1){
                                    that.stock = Infinity;
                                    that.itemContTagList = [];
                                    that.itemContCode = "itemHide";
                                    that.itemContTag = null;
                                }
                                else if(that.status === 0){
                                    that.itemContCode = "downShelf";
                                    message.refresh({ confirmBtn: false, content: "该商品所选规格已下架, 请选择其他规格！" });
                                }
                                else if(that.stock <= 0){
                                    that.itemContCode = "noStock";
                                }
                                that.setItemCont();
                                return oItemKey;
                            },
                            setItemCont: function(){
                                var that = this;
                                var priceArr = [];
                                var vipPriceArr = [];
                                var realPriceArr = [];
                                var realVipPriceArr = [];
                                var minQuantityArr = [];
                                var maxQuantityArr = [];
                                var incrementTaxArr = [];
                                var exciseTaxArr = [];
                                $.each(that.objArr, function(name, obj){
                                    var quantity = that.quantity;
                                    var numRegionObj = that.getNumRegion(obj.priceList);
                                    var minQuantity = numRegionObj.minQuantity;
                                    var maxQuantity = numRegionObj.maxQuantity;
                                    minQuantityArr.push(minQuantity);
                                    maxQuantityArr.push(maxQuantity);
                                    that.minQuantity = minQuantity;
                                    that.maxQuantity = maxQuantity;
                                    if(that.itemContCode !== "itemHide"){
                                        quantity = quantity > maxQuantity? maxQuantity: quantity;
                                        quantity = quantity < minQuantity? minQuantity: quantity;
                                        quantity = quantity > obj.stock? obj.stock: quantity;
                                        quantity = quantity > 0? quantity: 1;
                                        that.spcCarton = obj.carton;
                                        that.quantity = quantity;
                                    }
                                    var priceListObj = that.getPriceList(obj.priceList, quantity);
                                    obj.realVipPrice = priceListObj.realVipPrice;
                                    obj.realPrice = priceListObj.realPrice;
                                    obj.vipPrice = priceListObj.vipPrice;
                                    obj.price = priceListObj.price;
                                    priceArr.push(priceListObj.price);
                                    vipPriceArr.push(priceListObj.vipPrice);
                                    realPriceArr.push(priceListObj.realPrice);
                                    realVipPriceArr.push(priceListObj.realVipPrice);
                                    incrementTaxArr.push(obj.incrementTax);
                                    exciseTaxArr.push(obj.exciseTax);
                                    minQuantityArr.push(minQuantity);
                                    maxQuantityArr.push(maxQuantity);
                                });
                                if(priceArr.length===0){ priceArr[0]=null }
                                if(vipPriceArr.length===0){ priceArr[0]=null }
                                if(realPriceArr.length===0){ priceArr[0]=null }
                                if(realVipPriceArr.length===0){ priceArr[0]=null }
                                if(minQuantityArr.length===0){ minQuantityArr[0]=0 }
                                if(maxQuantityArr.length===0){ maxQuantityArr[0]=Infinity }
                                if(incrementTaxArr.length===0){ incrementTaxArr[0]=0 }
                                if(exciseTaxArr.length===0){ exciseTaxArr[0]=0 }
                                var minQuantity = Math.min.apply(Math, minQuantityArr);
                                var maxQuantity = Math.max.apply(Math, maxQuantityArr);
                                var minExciseTax = Math.min.apply(Math, exciseTaxArr)*100;
                                var maxExciseTax = Math.max.apply(Math, exciseTaxArr)*100;
                                var minIncrementTax = Math.min.apply(Math, incrementTaxArr)*100;
                                var maxIncrementTax = Math.max.apply(Math, incrementTaxArr)*100;
                                var minPrice = Math.min.apply(Math, priceArr);
                                var maxPrice = Math.max.apply(Math, priceArr);
                                var minVipPrice = Math.min.apply(Math, vipPriceArr);
                                var maxVipPrice = Math.max.apply(Math, vipPriceArr);
                                var minRealPrice = Math.min.apply(Math, realPriceArr);
                                var maxRealPrice = Math.max.apply(Math, realPriceArr);
                                var minRealVipPrice = Math.min.apply(Math, realVipPriceArr);
                                var maxRealVipPrice = Math.max.apply(Math, realVipPriceArr);
                                minPrice = (minPrice !== Infinity? minPrice: 0).toFixed(2);
                                maxPrice = (minPrice !== -Infinity? maxPrice: 0).toFixed(2);
                                minVipPrice = (minVipPrice !== Infinity? minVipPrice: 0).toFixed(2);
                                maxVipPrice = (maxVipPrice !== -Infinity? maxVipPrice: 0).toFixed(2);
                                minRealPrice = (minRealPrice !== Infinity? minRealPrice: 0).toFixed(2);
                                maxRealPrice = (maxRealPrice !== -Infinity? maxRealPrice: 0).toFixed(2);
                                minRealVipPrice = (minRealVipPrice !== Infinity? minRealVipPrice: 0).toFixed(2);
                                maxRealVipPrice = (maxRealVipPrice !== -Infinity? maxRealVipPrice: 0).toFixed(2);
                                that.spcPrice = minPrice === maxPrice? minPrice: minPrice+"~"+maxPrice;
                                that.spcVipPrice = minVipPrice === maxVipPrice? minVipPrice: minVipPrice+"~"+maxVipPrice;
                                that.spcRealPrice = minRealPrice === maxRealPrice? minRealPrice: minRealPrice+"~"+maxRealPrice;
                                that.spcRealVipPrice = minRealVipPrice === maxRealVipPrice? minRealVipPrice: minRealVipPrice+"~"+maxRealVipPrice;
                                that.spcExciseTax = minExciseTax === maxExciseTax? minExciseTax: minExciseTax+"~"+maxExciseTax;
                                that.spcIncrementTax = minIncrementTax === maxIncrementTax? minIncrementTax: minIncrementTax+"~"+maxIncrementTax;
                                if(minQuantity && maxQuantity && minQuantity!==-Infinity && maxQuantity!==Infinity){
                                    that.quantityDes = "当前允许购买量为: "+minQuantity+"~"+maxQuantity;
                                }else if(minQuantity && minQuantity!==-Infinity){
                                    that.quantityDes = "当前最小购买量为: "+minQuantity;
                                }else if(maxQuantity && maxQuantity!==Infinity){
                                    that.quantityDes = "当前最大购买量为: "+maxQuantity;
                                }else{
                                    that.quantityDes = "";
                                }
                            },
                            getNumRegion: function(priceList){
                                var infoObj = {};
                                var infoObj_max = [];
                                var infoObj_min = [];
                                var isExist = false;
                                $.each(priceList, function(name, obj){
                                    var min = obj.min*1? obj.min*1: 0;
                                    var max = obj.max*1? obj.max*1: Infinity;
                                    infoObj_max.push(max);
                                    infoObj_min.push(min);
                                    isExist = true;
                                });
                                if(isExist){
                                    infoObj.minQuantity = Math.min.apply(Math, infoObj_min);
                                    infoObj.maxQuantity = Math.max.apply(Math, infoObj_max);
                                    return infoObj;
                                }else{
                                    return {
                                        minQuantity: 0,
                                        maxQuantity: Infinity
                                    }
                                }
                            },
                            getPriceList: function(priceList, quantity){
                                var prices = {};
                                var infoObj = {};
                                var priceArr = [];
                                var infoObj_max = [];
                                var infoObj_min = [];
                                var infoObj_price = [];
                                var infoObj_vipPrice = [];
                                var infoObj_realPrice = [];
                                var infoObj_realVipPrice = [];
                                var isExist = false;
                                $.each(priceList, function(name, obj){
                                    var min = obj.min? obj.min: 0;
                                    var max = obj.max? obj.max: Infinity;
                                    var price = (obj.price||obj.price===0)? (obj.price*1).toFixed(2): null;
                                    var vipPrice = (obj.vipPrice||obj.vipPrice===0)? (obj.vipPrice*1).toFixed(2): null;
                                    var realPrice = price? (obj.discount? (obj.price*obj.discount/10).toFixed(2): (obj.price*1).toFixed(2)): null;
                                    var realVipPrice = vipPrice? (obj.discount? (obj.vipPrice*obj.discount/10).toFixed(2): (obj.vipPrice*1).toFixed(2)): null;
                                    priceArr.push({
                                        prices: {
                                            price: price,
                                            vipPrice: vipPrice,
                                            realPrice: realPrice,
                                            realVipPrice: realVipPrice
                                        },
                                        min: min,
                                        max: max
                                    });
                                    infoObj_min.push(min);
                                    infoObj_max.push(max);
                                    infoObj_price.push(price);
                                    infoObj_vipPrice.push(vipPrice);
                                    infoObj_realPrice.push(realPrice);
                                    infoObj_realVipPrice.push(realVipPrice);
                                    isExist = true;
                                });
                                if(isExist){
                                    infoObj.min =  Math.min.apply(Math, infoObj_min);
                                    infoObj.max =  Math.max.apply(Math, infoObj_max);
                                    infoObj.minPrice = Math.min.apply(Math, infoObj_price);
                                    infoObj.vipMinPrice =  Math.min.apply(Math, infoObj_vipPrice);
                                    infoObj.realMinPrice =  Math.min.apply(Math, infoObj_realPrice);
                                    infoObj.realVipMinPrice =  Math.min.apply(Math, infoObj_realVipPrice);
                                    infoObj.maxPrice = Math.max.apply(Math, infoObj_price);
                                    infoObj.vipMaxPrice =  Math.max.apply(Math, infoObj_vipPrice);
                                    infoObj.realMaxPrice =  Math.max.apply(Math, infoObj_realPrice);
                                    infoObj.realVipMaxPrice =  Math.max.apply(Math, infoObj_realVipPrice);
                                    if( quantity < infoObj.min){
                                        return {
                                            price: infoObj.maxPrice,
                                            vipPrice: infoObj.vipMaxPrice,
                                            realPrice: infoObj.realMaxPrice,
                                            realVipPrice: infoObj.realVipMaxPrice
                                        }
                                    }
                                    else if(quantity > infoObj.max){
                                        return {
                                            price: infoObj.minPrice,
                                            vipPrice: infoObj.vipMinPrice,
                                            realPrice: infoObj.realMinPrice,
                                            realVipPrice: infoObj.realVipMinPrice
                                        }
                                    }
                                    else{
                                        $.each(priceArr, function(n, o){
                                            if(quantity>=o.min && quantity<=o.max){
                                                prices = {
                                                    price: o.prices.price,
                                                    vipPrice: o.prices.vipPrice,
                                                    realPrice: o.prices.realPrice,
                                                    realVipPrice: o.prices.realVipPrice
                                                };
                                                return false
                                            }
                                        });
                                        return prices;
                                    }
                                }
                                else{
                                    return {
                                        price: null,
                                        vipPrice: null,
                                        realPrice: null,
                                        realVipPrice: null
                                    }
                                }
                            },
                            imgSrc: function(type){
                                var result = '';
                                switch(type){
                                    case 0: result = '/images/platform/tag/icon_cross_big.png'; break;
                                    case 2: result = '/images/platform/tag/icon_normal_big.png'; break;
                                }
                                return result;
                            },
                            imgType: function(type){
                                var result = '';
                                switch(type){
                                    case 0: result = true; break;
                                    case 2: result = false; break;
                                }
                                return result;
                            },
                            getTags: function(tag){
                                var tags = [];
                                $.each(tag||[], function(i, o){
                                    switch (o.tagName) {
                                        case '必选': $.inArray('icon_tag1', tags) === -1 && tags.push("icon_tag1"); break;
                                        case '爆款': $.inArray('icon_tag2', tags) === -1 && tags.push("icon_tag2"); break;
                                        case '热销': $.inArray('icon_tag3', tags) === -1 && tags.push("icon_tag3"); break;
                                        case '优选': $.inArray('icon_tag4', tags) === -1 && tags.push("icon_tag4"); break;
                                    }
                                });
                                return tags;
                            },
                            returnMsg: function(exciseTax, incrementTax){
                                var str = '';
                                var that = this;
                                var freeTax = this.mdData.freeTax;
                                var freePost = this.mdData.freePost;
                                switch(freeTax){
                                    case 0: str += '<li>消费税率：<span>'+exciseTax+'%</span></li><li>增值税率：<span>'+incrementTax+'%</span></li>'; break;
                                    case 1: str += '<li>消费税率：<span>包税</span></li>'; break;
                                }
                                switch(freePost){
                                    case 0: str += ''; break;
                                    case 1: str += '<li>配送方式：<span>包邮</span></li>'; break;
                                    case 2: str += '<li>配送方式：<span>' + (that.isFreePost? '包邮': '邮费到付') + '</span></li>'; break;
                                }
                                return str;
                            },
                            returnSupplierName: function(){
                                var returnVal = "";
                                switch(this.mdData.supplierName){
                                    case "天天仓": returnVal = '保税TT仓'; break;
                                    case "粮油仓": returnVal = '保税LY仓'; break;
                                    case "行云仓": returnVal = '保税XY仓'; break;
                                    case "富邦仓": returnVal = '保税FB仓'; break;
                                    default:      returnVal = this.mdData.supplierName;
                                }
                                return returnVal;
                            },
                            classifyTouchend: function(e){
                                var that = this;
                                var classify = {};
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                if(!$node.hasClass('lose')){
                                    var $groups = $node.parents(".classifyGroup");
                                    $node.toggleClass('active').siblings().removeClass('active');
                                    $groups.find(".classify").removeClass('lose');
                                    $groups.find(".classify.active").each(function(){
                                        var data_name = $(this).attr("data-name") || "";
                                        var data_val = $(this).attr("data-val") || "";
                                        classify[data_name] = data_val;
                                    });
                                    $.each(that.getItemObj(classify), function(name, array){
                                        $.each(array, function(index, val){
                                            $groups.find("[data-name='"+name+"'][data-val='"+val+"']").addClass("lose");
                                        });
                                    });
                                }
                                if(that.itemContCode !== "itemHide"){
                                    var itemId = this.objArr[0].itemId;
                                    if (itemId) { jsUtil.url.setParam({itemId: itemId}, 'cover')}
                                    if (itemId) { that.pathUrl = jsUtil.path.setParam(that.pathUrl, {itemId: itemId})}
                                }
                            },
                            inputInput: function(){
                                var that = this;
                                var $element = $(this.$el);
                                var stock = that.stock || 0;
                                var minQuantity = that.minQuantity;
                                var maxQuantity = that.maxQuantity;
                                var itemCode = $element.find("[itemContCode]").attr("itemContCode");
                                var quantity = (/\D/).test(that.quantity)? that.quantity.replace(/\D/g,""): that.quantity;
                                clearTimeout(that.quantityTimer);
                                that.quantityTimer = setTimeout(function(){
                                    quantity = quantity*1 > 0? quantity*1: 1;
                                    if(itemCode!=="itemHide"){
                                        if(stock<=0 || (quantity <= stock && minQuantity && stock < minQuantity)){
                                            message.refresh({
                                                cancelBtn: false,
                                                confirmBtn: false,
                                                content: "当前商品库存不足！",
                                                timeOutFun: function() {
                                                    quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                                                    quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                                                    quantity = quantity > stock? stock: quantity;
                                                    that.quantity = quantity*1 > 0? quantity*1: 1;
                                                    that.setItemCont();
                                                }
                                            });
                                        }
                                        else if(quantity>stock){
                                            message.refresh({
                                                cancelBtn: false,
                                                confirmBtn: false,
                                                content:"当前数量大于库存可用量！",
                                                timeOutFun: function() {
                                                    quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                                                    quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                                                    quantity = quantity > stock? stock: quantity;
                                                    that.quantity = quantity*1 > 0? quantity*1: 1;
                                                    that.setItemCont();
                                                }
                                            });
                                        }
                                        else if(maxQuantity && quantity>maxQuantity){
                                            message.refresh({
                                                cancelBtn: false,
                                                confirmBtn: false,
                                                content: "当前数量已大于最大购买量！",
                                                timeOutFun: function() {
                                                    quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                                                    quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                                                    quantity = quantity > stock? stock: quantity;
                                                    that.quantity = quantity*1 > 0? quantity*1: 1;
                                                    that.setItemCont();
                                                }
                                            })
                                        }
                                        else if(minQuantity && quantity<minQuantity){
                                            message.refresh({
                                                cancelBtn: false,
                                                confirmBtn: false,
                                                content: "当前数量已低于最小购买量！",
                                                timeOutFun: function() {
                                                    quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                                                    quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                                                    quantity = quantity > stock? stock: quantity;
                                                    that.quantity = quantity*1 > 0? quantity*1: 1;
                                                    that.setItemCont();
                                                }
                                            })
                                        }
                                    }
                                }, 650);
                            },
                            inputBlur: function(){
                                var that = this;
                                var $element = $(this.$el);
                                var stock = that.stock || 0;
                                var minQuantity = that.minQuantity;
                                var maxQuantity = that.maxQuantity;
                                var itemCode = $element.find("[itemContCode]").attr("itemContCode");
                                var quantity = (/\D/).test(that.quantity)? that.quantity.replace(/\D/g,""): that.quantity;
                                if(itemCode!=="itemHide"){
                                    quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                                    quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                                    quantity = quantity > stock? stock: quantity;
                                }
                                that.quantity = quantity*1 > 0? quantity*1: 1;
                                that.setItemCont();
                            },
                            quantityTouchend: function(e){
                                var that = this;
                                var ev = e || window.event;
                                var $element = $(this.$el);
                                var $node = $(ev.currentTarget);
                                var itemCode = $element.find("[itemContCode]").attr("itemContCode");
                                var stock = that.stock || 0;
                                var quantity = that.quantity;
                                var oldQuantity = that.quantity;
                                var minQuantity = that.minQuantity;
                                var maxQuantity = that.maxQuantity;
                                if($node.hasClass("btn_plus")){
                                    quantity = quantity*1 + 1;
                                    quantity = quantity*1 > 0? quantity*1: 1;
                                }
                                if($node.hasClass("btn_minus")){
                                    quantity = quantity*1 - 1;
                                    quantity = quantity*1 > 0? quantity*1: 1;
                                }
                                if(itemCode!=="itemHide"){
                                    if(stock<=0 || (quantity <= stock && minQuantity && stock < minQuantity)){
                                        message.refresh({
                                            cancelBtn: false,
                                            confirmBtn: false,
                                            content: "当前商品库存不足！"
                                        });
                                    }
                                    else if(quantity>stock){
                                        message.refresh({
                                            cancelBtn: false,
                                            confirmBtn: false,
                                            content:"当前数量已是库存可用量！"
                                        });
                                    }
                                    else if(maxQuantity && quantity>maxQuantity){
                                        message.refresh({
                                            cancelBtn: false,
                                            confirmBtn: false,
                                            content: "当前数量已是最大购买量！"
                                        })
                                    }
                                    else if(minQuantity && quantity<minQuantity){
                                        message.refresh({
                                            cancelBtn: false,
                                            confirmBtn: false,
                                            content: "当前数量已是最小购买量！"
                                        })
                                    }
                                    quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                                    quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                                    quantity = quantity > stock? stock: quantity;
                                    that.quantity = quantity*1 > 0? quantity*1: 1;
                                    that.setItemCont();
                                }
                            }
                        },
                        beforeCreate: function(){
                            var that = this;
                            jsModel.send('GOODS_STOCK_QUERY', {goodsId: goodsId})
                                .done(function(response){
                                    if(response && response.success && response.obj){
                                        $.each(that.itemCont, function(name, obj){
                                            $.each(response.obj, function(id, data){
                                                if(obj.itemId === data.itemId){ obj.stock = data.stock }
                                            })
                                        });
                                        if (itemId) {
                                            that.getItemObj(that.itemIdMap[itemId] || {});
                                        } else {
                                            that.getItemObj({});
                                        }
                                    }
                                });
                        },
                        beforeMount: function(){
                            if (itemId) {
                                this.getItemObj(this.itemIdMap[itemId] || {});
                            } else {
                                this.getItemObj({});
                            }
                        },
                        created: function(){
                            var that = this;
                            var name = '';
                            var type = '';
                            var length = 0;
                            var codeArr = [];
                            var itemKey = {};
                            var itemCont = {};
                            var itemIdMap = {};
                            $.each(that.mdData.goodsSpecsList, function(index, obj){
                                var tObj = {};
                                var tArr = [];
                                var keyName = "";
                                tObj.infoObj = JSON.parse(obj.info||"{}");
                                tObj.goodsId = that.mdData.goodsId;
                                tObj.goodsName = that.mdData.customGoodsName;
                                tObj.firstCategory = that.mdData.firstCategory;
                                tObj.secondCategory = that.mdData.secondCategory;
                                tObj.thirdCategory = that.mdData.thirdCategory;
                                tObj.supplierId = that.mdData.supplierId;
                                tObj.supplierName = that.mdData.supplierName;
                                tObj.goodsFileObj = $.isArray(that.mdData.goodsFileList) && that.mdData.goodsFileList[0];
                                tObj.goodsImg = tObj.goodsFileObj && tObj.goodsFileObj.path || '';
                                tObj.type = that.mdData.type;
                                tObj.href = that.mdData.href;
                                tObj.freePost = that.mdData.freePost;
                                tObj.freeTax = that.mdData.freeTax;
                                tObj.info = obj.info;
                                tObj.carton = obj.carton;
                                tObj.itemId = obj.itemId;
                                tObj.itemCode = obj.itemCode;
                                tObj.status = obj.status;
                                tObj.minPrice = obj.minPrice;
                                tObj.maxPrice = obj.maxPrice;
                                tObj.vipMinPrice = obj.vipMinPrice;
                                tObj.vipMaxPrice = obj.vipMaxPrice;
                                tObj.realMinPrice = obj.realMinPrice;
                                tObj.realMaxPrice = obj.realMaxPrice;
                                tObj.realVipMinPrice = obj.realVipMinPrice;
                                tObj.realVipMaxPrice = obj.realVipMaxPrice;
                                tObj.incrementTax = that.mdData.incrementTax;
                                tObj.exciseTax = obj.exciseTax;
                                tObj.priceList = obj.priceList;
                                tObj.weight = obj.weight;
                                tObj.stock = obj.stock>0? obj.stock: 0;
                                tObj.sku = obj.sku;
                                tObj.tagList = [];
                                $.each(obj.tagList||[], function(i, o){
                                    if (o.tagName === '预售') {
                                        tObj.tagFunId = o.tagFunId;
                                        tObj.preSaleName = o.tagName;
                                        tObj.preSaleDesc = o.description;
                                    }
                                    if (o.tagName === '一般贸易(包邮)') {
                                        that.isFreePost = true;
                                    }
                                    tObj.tagList.push(o);
                                });
                                $.each(tObj.infoObj, function(name, value){
                                    if($.inArray(value, itemKey[name]) === -1){
                                        itemKey[name] = itemKey[name] || [];
                                        keyName = value.replace(";", "");
                                        itemKey[name].push(value.replace(";", ""));
                                    }
                                    if($.inArray(name, codeArr) === -1){
                                        codeArr.push(name);
                                    }
                                    var index = $.inArray(name, codeArr);
                                    tArr[index] = value;
                                });
                                var name = tArr.join(";");
                                itemCont[name] = tObj;
                                itemIdMap[tObj.itemId] = tObj.infoObj;
                                length++;
                            });
                            that.length = length;
                            that.codeArr = codeArr;
                            that.itemKey = itemKey;
                            that.itemCont = itemCont;
                            that.itemIdMap = itemIdMap;
                            $.each(that.mdData.couponList||[],function(index,obj){
                                name = obj.name.split('/')[0];
                                type = obj.name.split('/')[1];
                                type = (type !== undefined ? type.trim() : '');
                                that.couponList[index] = {
                                    type: type,
                                    name: name,
                                    couponId: obj.couponId,
                                    receiveStatus: obj.receiveStatus
                                };
                            });
                            if($.isEmptyObject(that.mdData) || that.mdData.status === 0){
                                message.refresh({
                                    content: "该商品已下架，请重新选择商品！",
                                    confirmBtn: false,
                                    timeOutFun: function () { window.history.go(-1); }
                                })
                            }
                        },
                        mounted: function(){
                            var that = this;
                            var $element = $(that.$el);
                            var $groups = $element.find(".classifyGroup");
                            if((/\.html$|\.htm$/i).test(that.mdData.detailPath)){
                                $(that.$el).find('.detailMsgContent').load(that.mdData.detailPath);
                            }
                            $.each(itemId && that.itemIdMap[itemId] || [], function(name, val){
                                $groups.find("[data-name='"+name+"'][data-val='"+val+"']").addClass("active");
                            });
                            $element.find(".banner-bannerImg").roller({
                                time: 5000,
                                loop: $element.find(".bannerImg_li").length > 0,
                                eVisual: $element.find(".banner-bannerImg > ul"),
                                eRoller: $element.find(".bannerImg_li"),
                                beRollFunc: function(that, sortId){
                                    var rollId = that.$eRoller.eq(sortId-1).attr("rollId");
                                    $element.find(".banner-carousel-text .index").text(rollId);
                                },
                                edRollFunc: function(that){}
                            });
                            $element.on("touchend", ".goodsDetail-discount .btn_lookDetail", function(e){
                                var ev = e || window.event;
                                var $node = $(ev.target||ev.srcElement);
                                var $parent = $node.parents(".goodsDetail-discount");
                                if($parent.hasClass("close")){
                                    $node.text("关闭");
                                    $parent.removeClass("close");
                                }else{
                                    $node.text("展开");
                                    $parent.addClass("close");
                                }
                            });
                            $element.on("touchend", ".goodsDetail-discount .btn_needReceive", function(e){
                                var ev = e || window.event;
                                var $node = $(ev.target||ev.srcElement);
                                var $parent = $node.parents("li[couponId]");
                                var couponId = $parent.attr("couponId");
                                if(!isLogin){
                                    message.refresh({
                                        content: "您尚未登录，请先登录！",
                                        confirmFun: function () {
                                            window.location.href = "/login.html?jumpUrl=" + pathUrl;
                                        }
                                    });
                                }else if(!couponId){
                                    message.refresh({
                                        confirmBtn: false,
                                        content: "未获取到该优惠券编号"
                                    });
                                }else{
                                    jsModel.send('COUPON_RECEIVE',{
                                        'couponId': couponId
                                    }).done(function(response){
                                        if(response.success){
                                            message.refresh({
                                                content:   "领取成功！",
                                                confirmBtn: false
                                            });
                                            $node.removeClass("btn btn_needReceive");
                                            $node.addClass("received");
                                            $node.text("已领取");
                                        }else{
                                            message.refresh({
                                                content:    response && response.errorMsg || "领取失败！",
                                                confirmBtn: false
                                            });
                                        }
                                    }).fail(function(){
                                        message.refresh({
                                            "content":   "领取失败！",
                                            "confirmBtn": false
                                        });
                                    });
                                }
                            });
                        }
                    });
                });
        }
        if ((/^customerService-1-\d+$/).test(role)){
            Module[role] =  new Vue({
                el: element,
                data: {
                    QQ:        siteInfo.qq,
                    name:      siteInfo.name,
                    address:   siteInfo.address,
                    emailBox:  siteInfo.emailBox,
                    telephone: siteInfo.telephone,
                    isCall: true
                },
                methods: {
                    callTelephone: function(){
                        var that = this;
                        var now = new Date();
                        var day = now.getDay();
                        var hour = now.getHours();
                        var isWeek = day === 0 || day === 6;
                        var isFree = hour < 9 || hour > 17;
                        var message = Module['message-1-1'];
                        if(isWeek || isFree){
                            message.refresh({
                                "content":   "客服在线时间为周一至周五9:00 - 18:00，敬请谅解！",
                                "confirmBtn": false
                            });
                            that.isCall = false;
                        } else {
                            that.isCall = true;
                        }
                    }
                },
                created: function(){

                },
                mounted: function(){

                }
            });
        }
        if ((/^amount-access-1-\d+$/).test(role)){
            Module[role] =  new Vue({
                el: element,
                data: {
                    userName:     '',
                    userPhone:    '',
                    userWechat:   '',
                    visitTime:    '-1',
                    userCity:     '',
                    userCityOk:   false,
                    userProvince: '',
                    userContent:  '',
                    isClick    :  true
                },
                methods: {
                    changeName:    function(e){
                        var that = this;
                        var $this = $(e.currentTarget);
                        var userName = $this.val();
                        if(userName !== ''){
                            that.userName = userName;
                            $this.removeClass('state_error');
                        } else {
                            that.userName = '';
                            $this.addClass('state_error');
                        }
                    },
                    changePhone:   function(e){
                        var that = this;
                        var $this = $(e.currentTarget);
                        var userPhone = $this.val();
                        if(userPhone !== '' && (/^1(3|4|5|7|8)\d{9}$/gi).test(userPhone)){
                            that.userPhone = userPhone;
                            $this.removeClass('state_error');
                        }else{
                            that.userPhone = '';
                            $this.addClass('state_error');
                        }
                    },
                    changeWechat:  function(e){
                        var that = this;
                        var $this = $(e.currentTarget);
                        var userWechat = $this.val();
                        if(userWechat !== ''){
                            that.userWechat = userWechat;
                        }else{
                            that.userWechat = '';
                        }
                    },
                    changeVisit:   function(e){
                        var that = this;
                        var $this = $(e.currentTarget);
                        var visitTime = $this.val();
                        if(visitTime !== '-1'){
                            that.visitTime = visitTime;
                            $this.removeClass('state_error');
                        }else{
                            that.visitTime = '';
                            $this.addClass('state_error');
                        }
                    },
                    changeProvince:function(e){
                        var that = this;
                        var $this = $(e.currentTarget);
                        var $parent = $this.parent();
                        var tProvince = $this.val();
                        if(tProvince !== '---- 所在省 ----'){
                            that.userProvince = tProvince;
                            $this.removeClass('state_error');
                        }else{
                            that.userProvince = '';
                            $this.addClass('state_error');
                        }
                        if ($parent.find(".userAddress-city option").length <= 1) {
                            that.userCity = '';
                            that.userCityOk = true;
                            $this.removeClass('state_error');
                        }
                        if ($parent.find(".userAddress-city option").length > 1) {
                            that.userCity = '';
                            that.userCityOk = false;
                            $this.removeClass('state_error');
                        }
                    },
                    changeCity: function(e){
                        var that = this;
                        var $this = $(e.currentTarget);
                        var tCity = $this.val();
                        var optionLength = $this.find('option').length;
                        if(optionLength !== 1){
                            if(tCity !== '---- 所在市 ----'){
                                that.userCity = tCity;
                                $this.removeClass('state_error');
                            }else{
                                that.userCity = '';
                                $this.addClass('state_error');
                            }
                        }else{
                            that.userCity = '';
                            $this.removeClass('state_error');
                        }
                    },
                    changeContent: function(e){
                        var that = this;
                        var $this = $(e.currentTarget);
                        var userContent = $this.val();
                        if(userContent !== ''){
                            that.userContent = userContent;
                            $this.removeClass('state_error');
                        }else{
                            that.userContent = '';
                            $this.addClass('state_error');
                        }
                    },
                    listSubmit: function(){
                        var that = this;
                        var isContinue = true;
                        var $element = $(that.$el);
                        var message = Module['message-1-1'];
                        if(that.userName === '')      { isContinue = false; $element.find("#itemUserName").addClass('state_error'); }
                        if(that.userPhone === '')     { isContinue = false; $element.find("#itemUserPhone").addClass('state_error'); }
                        if(that.visitTime === '-1')   { isContinue = false; $element.find("#itemVisitTime").addClass('state_error'); }
                        if(that.userProvince === '')  { isContinue = false; $element.find("#itemUserProvince").addClass('state_error'); }
                        if(that.userCityOk === false) { isContinue = false; $element.find("#itemUserCity").addClass('state_error'); }
                        if(that.userContent === '')   { isContinue = false; $element.find("#itemUserContent").addClass('state_error'); }
                        if(isContinue){
                            if(that.isClick){
                                var data = {
                                    'userName'    : that.userName,
                                    'userPhone'   : that.userPhone,
                                    'userWechat'  : that.userWechat,
                                    'visitTime'   : that.visitTime,
                                    'userAddress' : that.userProvince + that.userCity,
                                    'userContent' : that.userContent
                                };
                                jsModel.send('VISIT_JSON_CREATE_NODE', data)
                                    .done(function(response){
                                        if(response.success){
                                            message.refresh({
                                                "content": "您的申请已提交成功，我们将在3个工作日之内联系到您。",
                                                "confirmBtn": true,
                                                "cancelBtn": false,
                                                "confirmFun": function(){ window.location.href = '/'; }
                                            });
                                            setTimeout(function(){
                                                that.isClick = true;
                                            }, 10000);
                                        }else{
                                            message.refresh({
                                                "confirmBtn": false,
                                                "content":   "提交失败，请检查网络是否通畅."
                                            });
                                            setTimeout(function(){
                                                that.isClick = true;
                                            }, 10000);
                                        }
                                    });
                                that.isClick = false;
                            }
                            else{
                                message.refresh({
                                    "content":   "请勿频繁操作，请稍后重试。",
                                    "confirmBtn": false
                                });
                            }
                        }else{
                            message.refresh({
                                "content": "请填写必要信息，方便我们联系到您。",
                                "confirmBtn": false
                            });
                        }
                    }
                },
                created: function(){
                    var that = this;
                    var shopId = localStorage.getItem('shopId') || 2;
                    that.shopId = shopId;
                    if(shopId == 287){
                        $(document).attr("title","俄速通海外购--加入我们");
                    }
                    wx.ready(function () {
                        jsUtil.path.setParam(window.location.href,{'shopId':shopId});
                        wx.onMenuShareAppMessage({
                            title: '中国供销海外购-全国加盟', // 分享标题
                            desc: '优质的产品、完善的服务，中国供销海外购诚邀您的加盟！', // 分享描述
                            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: 'https://' + window.location.host + '/images/platform/weixinShare/ico_mp.jpg', // 分享图标
                            success: function (res) {

                            }
                        });
                        wx.onMenuShareTimeline({
                            title: '中国供销海外购-全国加盟', // 分享标题
                            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: 'https://' + window.location.host + '/images/platform/weixinShare/ico_mp.jpg', // 分享图标
                            success: function(res){

                            }
                        });
                    });
                },
                mounted: function(){
                    $('.userAddress').picker();
                }
            });
        }
    };

    window.app.getModule = function(name){
        return typeof name === "string" && name.trim()? Module[name]: Module;
    };

}());