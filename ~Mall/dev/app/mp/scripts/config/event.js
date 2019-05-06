/** 初始化 --- 前端事件
 *    @detail:     前端事件
 *    @return:     无
 *    @author:    林鹏腾
 *    @date:      2018.05.16
 */
(function(){

    'use strict';

    var jsData  =   window.app.getApi('jsData');
    var jsUtil  =   window.app.getApi('jsUtil');
    var jsModel =   window.app.getApi('jsModel');
    var jsEvent =   window.app.getApi('jsEvent');
    var centerId =  jsData.userInfo.centerId;
    var redirect =  jsData.location.redirect;


    /** 全局事件 */
    $(document).on("click", "[href*='void(0)'],[href='#'],[href='']", function(){
        //注意此处不要阻止默认事件
        $(this).removeAttr("href");
    });


    /** 微信JSSDK验证
     */
    if(centerId && jsUtil.weChat.browser()){
        $.when(jsModel.send("THIRD_WECHAT_CONFIG", {url: redirect}))
            .done(function(response){
                wx.config({
                    debug:     false,
                    appId:     response.obj.appid,
                    nonceStr:  response.obj.nonceStr,
                    timestamp: response.obj.timestamp,
                    signature: response.obj.signature,
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'scanQRCode','hideMenuItems']
                });
                wx.ready(function () {
                    wx.hideMenuItems({
                        menuList: ['menuItem:share:qq','menuItem:share:QZone','menuItem:share:weiboApp','menuItem:share:facebook']
                    });
                });
            });
    }

    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?0f0c265cc703e3fcde5395755170efcd";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);

    })();

}());
