
//"http://localhost:8888";
//"https://front.cncoopay.com";
//"https://testfront.cncoopay.com";
var host = "http://localhost:8888";

/** 区域中心页面创建 */
function addPage(region, page) {
    var pages = [];
    var datas = [];
    var dataObj = {
        nav:              {
            seo:     {
                title: "福利商城",
                keywords: "福利网站, 海淘网站,跨境购,母婴用品,进口商品,网上购物,保税区,跨境电商,跨境贸易",
                description: "福利网站, 跨境电商, 跨境贸易, 提供丰富的正品海外商品, 欢迎广大顾客光临购买！"
            },
            page:    "nav",
            file:    'nav',
            path:    '',
            region:  region,
            system:  'fmpMall',
            module: [
                {
                    code: "message-1",
                    sort: 1,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDiscount-1",
                    sort: 2,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-1",
                    sort: 3,
                    area: "bodyHeader",
                    own:  null,
                    cont: [{
                        title: 'Swisse'
                    }]
                },
                {
                    code: "prompt-1",
                    sort: 4,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "nav-1",
                    sort: 5,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "footer-1",
                    sort: 6,
                    area: "bodyFooter",
                    own:  null,
                    cont: null
                },
                {
                    code: "scrollTop-1",
                    sort: 7,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "searchHistory-1",
                    sort: 8,
                    area: "body",
                    own:  null,
                    cont: null
                }
            ]
        },
        error:            {
            seo: {
                title: "福利商城--404页面",
                keywords: "福利商城,海淘网站,跨境购,母婴用品,进口商品,网上购物,保税区,跨境电商,跨境贸易",
                description: "福利商城, 跨境电商, 跨境贸易, 提供丰富的正品海外商品, 欢迎广大顾客光临购买！"
            },
            page:    "error",
            file:    'error',
            path:    '',
            region:  region,
            system:  "fmpMall",
            module: [
                {
                    code: "message-1",
                    sort: 1,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDiscount-1",
                    sort: 2,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-1",
                    sort: 3,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "prompt-1",
                    sort: 4,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "error-1",
                    sort: 5,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "footer-1",
                    sort: 6,
                    area: "bodyFooter",
                    own:  null,
                    cont: null
                },
                {
                    code: "scrollTop-1",
                    sort: 7,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "searchHistory-1",
                    sort: 8,
                    area: "body",
                    own:  null,
                    cont: null
                }
            ]
        },
        customerService:  {
            seo: {
                title: "福利商城--客服热线",
                keywords: "福利商城,海淘网站,跨境购,母婴用品,进口商品,网上购物,保税区,跨境电商,跨境贸易",
                description: "福利商城, 跨境电商, 跨境贸易, 提供丰富的正品海外商品, 欢迎广大顾客光临购买！"
            },
            page:    "customerService",
            file:    'customerService',
            path:    '',
            region:  region,
            system:  'fmpMall',
            module: [
                {
                    code: "message-1",
                    sort: 1,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDiscount-1",
                    sort: 2,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-1",
                    sort: 3,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "prompt-1",
                    sort: 4,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "customerService-1",
                    sort: 5,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "footer-1",
                    sort: 6,
                    area: "bodyFooter",
                    own:  null,
                    cont: null
                },
                {
                    code: "scrollTop-1",
                    sort: 7,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "searchHistory-1",
                    sort: 8,
                    area: "body",
                    own:  null,
                    cont: null
                }
            ]
        }
    };
    page?
        pages = [].concat(page):
        pages = Object.keys(dataObj);
    pages.forEach(function(name){
        dataObj[name] && datas.push(dataObj[name]);
    });
    datas.forEach(function(data){
        $.ajax({
            url: host + "/Page/handle",
            method: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(data),
            success:function(response){ console.log(response); },
            error:function(response){   console.log(response); }
        });
    });
}

/** 区域中心页面删除 */
function delPage(region, page) {
    var pages = [];
    var datas = [];
    var dataObj = {
        nav:              {
            page:    "nav",
            file:    'nav',
            path:    '',
            region:  region,
            system:  'fmpMall'
        },
        error:            {
            page:    "error",
            file:    'error',
            path:    '',
            region:  region,
            system:  "fmpMall"
        },
        customerService:  {
            page:    'customerService',
            file:    'customerService',
            path:    '',
            region:  region,
            system:  'fmpMall'
        }
    };
    page?
        pages = [].concat(page):
        pages = Object.keys(dataObj);
    pages.forEach(function(name){
        dataObj[name] && datas.push(dataObj[name]);
    });
    datas.forEach(function(data){
        $.ajax({
            url: host + "/Page/handle",
            method: "DELETE",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(data),
            success:function(response){ console.log(response); },
            error:function(response){ console.log(response); }
        });
    });
}