define([],function(){"use strict";var t=window.capi.get();can.mustache.registerHelper("look",function(e){var n=t.jsUtil.mustache.getContent(e),s=t.jsUtil.mustache.getDepContent(e);console.dir(n),console.dir(s)}),can.mustache.registerHelper("isExist",function(e,n){var s=t.jsUtil.mustache.getDepContent(e,"object");return can.isEmptyObject(s)?n.inverse(s||this):n.fn(s||this)}),can.mustache.registerHelper("setRenderRange",function(e,n,s,r){var i=t.jsUtil.mustache.getContent(e,"number"),c=t.jsUtil.mustache.getContent(n,"number"),u=t.jsUtil.mustache.getContent(s,"number");return c>=0&&i>=c&&(-1===u||i<c+s)?r.fn(r.context||this):r.inverse(r.context||this)}),can.mustache.registerHelper("addElementClass",function(e,n,s){var r=t.jsUtil.mustache.getContent(e),i=t.jsUtil.mustache.getContent(n),c=t.jsUtil.mustache.getContent(s);if("number"==typeof r&&(r=r.toString()),"number"==typeof i&&(i=i.toString()),r&&i&&c)return r===i?c:""}),can.mustache.registerHelper("zIndexDesc",function(e,n){var s=t.jsUtil.mustache.getContent(e,"number"),r=t.jsUtil.mustache.getContent(n,"number");if(s>=0&&r>0)return r-1*s}),can.mustache.registerHelper("zIndexAsc",function(e,n){var s=t.jsUtil.mustache.getContent(e,"number"),r=t.jsUtil.mustache.getContent(n,"number");if(s>=0&&r>0)return r+1*s})});