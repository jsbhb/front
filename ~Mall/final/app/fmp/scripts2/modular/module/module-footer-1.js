define(["config.page.render"],function(e){"use strict";var o=window.capi.get(),n=o.jsData.userInfo.isLogin,r=(o.jsData.userInfo.welfareVip,n?["ORDER_SHOPPINGCART_COUNT/global/count"]:[]);return e.extend({tags:{global:"<component-footer-1></component-footer-1>"},region:{global:{cfgDynamic:!0,reqDynamic:!0,resDynamic:!0}},config:{global:{isCall:!0}},request:{ORDER_SHOPPINGCART_COUNT:{platformSource:7}},response:{},sendArr:r,reload:!1})});