
//"http://localhost:8888";
//"https://front.cncoopay.com";
//"https://testfront.cncoopay.com";
// var host = "http://localhost:8888";
var host = "https://testfront.cncoopay.com";

/** 区域中心页面创建 */
function addPage(region, page) {
    var pages = [];
    var datas = [];
    var dataObj = {
        error:            {
            seo: {
                title: "中国供销海外购--404页面",
                keywords: "中国供销海外购,海淘网站,跨境购,母婴用品,进口商品,网上购物,保税区,跨境电商,跨境贸易",
                description: "中国供销海外购, 跨境电商, 跨境贸易, 提供丰富的正品海外商品, 欢迎广大顾客光临购买！"
            },
            page:   "error",
            file:   'error',
            path:   '',
            region: region,
            system: "mpMall",
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
        bargainRule:     {
            seo: {
                title: "中国供销海外购--",
                keywords: "中国供销海外购,海淘网站,跨境购,母婴用品,进口商品,网上购物,保税区,跨境电商,跨境贸易",
                description: "中国供销海外购, 跨境电商, 跨境贸易, 提供丰富的正品海外商品, 欢迎广大顾客光临购买！"
            },
            page:   "bargainRule",
            file:   'bargainRule',
            path:   '',
            region: region,
            system: "mpMall",
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
                    code: "prompt-1",
                    sort: 4,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "bargainRule-1",
                    sort: 5,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "scrollTop-1",
                    sort: 6,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "searchHistory-1",
                    sort: 7,
                    area: "body",
                    own:  null,
                    cont: null
                }
            ]
        },
        amountAccess:     {
            seo: {
                title: "中国供销海外购--加入我们",
                keywords: "中国供销海外购,海淘网站,跨境购,母婴用品,进口商品,网上购物,保税区,跨境电商,跨境贸易",
                description: "中国供销海外购, 跨境电商, 跨境贸易, 提供丰富的正品海外商品, 欢迎广大顾客光临购买！"
            },
            page:   "amount-access",
            file:   'amount-access',
            path:   '',
            region: region,
            system: "mpMall",
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
                    code: "prompt-1",
                    sort: 4,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "amount-access-1",
                    sort: 5,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "scrollTop-1",
                    sort: 6,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "searchHistory-1",
                    sort: 7,
                    area: "body",
                    own:  null,
                    cont: null
                }
            ]
        },
        customerService:  {
         seo: {
             title: "中国供销海外购--客服热线",
             keywords: "中国供销海外购,海淘网站,跨境购,母婴用品,进口商品,网上购物,保税区,跨境电商,跨境贸易",
             description: "中国供销海外购, 跨境电商, 跨境贸易, 提供丰富的正品海外商品, 欢迎广大顾客光临购买！"
         },
         page:    "customerService",
         file:    'customerService',
         path:    '',
         region:  region,
         system:  'mpMall',
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
     },
        ghmzIndex:  {
            seo: {
                title: "中国供销海外购--美妆频道页",
                keywords: "母婴加盟,进口商品加盟,海外购加盟,o2o加盟,新零售加盟,连锁加盟,区域加盟,美妆加盟,合伙人加盟,旗舰店加盟,跨境电商,母婴用品,县域加盟,供销e家进口商品,中国供销海外购加盟,整店输出",
                description: "母婴加盟,进口商品加盟,海外购加盟,o2o加盟,新零售加盟,连锁加盟,区域加盟,美妆加盟,合伙人加盟,旗舰店加盟,跨境电商,母婴用品,县域加盟,供销e家进口商品,中国供销海外购加盟,整店输出"
            },
            page: "ghmzIndex",
            file: 'ghmzIndex',
            path: '',
            region: region,
            system: "mpMall",
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
                    code: "themeBanner-1",
                    sort: 5,
                    area: "bodyCenter",
                    own:  null,
                    cont: [
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/uOWt2ZkTThcrat2N1bomgr5tq45_960_480T1807061455_960_480.jpg?imageView&thumbnail=750x375&quality=95'
                        }
                    ]
                },
                {
                    code: "themeNavInlet-1",
                    sort: 6,
                    area: "bodyCenter",
                    own:  null,
                    cont: [
                        {
                            href: '/',
                            picPath: 'http://h2.appsimg.com/a.appsimg.com/upload/flow/2019/02/18/130/15504564747589.png'
                        },
                        {
                            href: '/',
                            picPath: 'http://h2.appsimg.com/a.appsimg.com/upload/flow/2019/02/18/113/15504569283475.png'
                        },
                        {
                            href: '/',
                            picPath: 'http://h2.appsimg.com/a.appsimg.com/upload/flow/2019/02/18/108/15504572194312.png'
                        },
                        {
                            href: '/',
                            picPath: 'http://h2.appsimg.com/a.appsimg.com/upload/flow/2019/02/18/10/15504576033867.png'
                        }
                    ]
                },
                {
                    code: "themeNavInlet-2",
                    sort: 7,
                    area: "bodyCenter",
                    own:  null,
                    cont: [
                        {
                            href: '/',
                            picPath: 'https://a.appsimg.com/upload/brand/upcb/2019/02/18/86/ias_155047238417416_1135x545_85.jpg'
                        },
                        {
                            href: '/',
                            picPath: 'https://a.appsimg.com/upload/brand/upcb/2019/02/15/171/ias_155022745057913_1135x545_85.jpg'
                        },
                        {
                            href: '/',
                            picPath: 'https://a.appsimg.com/upload/brand/upcb/2019/02/21/73/ias_155071439299975_1135x545_85.jpg'
                        }
                    ]
                },
                {
                    code: "themeFloor-1",
                    sort: 8,
                    area: "bodyCenter",
                    own:  {
                        title: '卸妆1'
                    },
                    cont: [
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/cf1e498cdbbb4cd783cf6717569185881530780677794jj8baidm12392.jpg?imageView&thumbnail=244x244&quality=95&type=webp',
                            goodsName: 'JAYJUN 水光悦颜花漾定制礼盒 共15片JAYJUN 水光悦颜花漾定制礼盒 共15片',
                            price: '129.00',
                            realPrice: '150.00',
                            description: '百元级就能集齐的水光全家'
                        },
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/cf1e498cdbbb4cd783cf6717569185881530780677794jj8baidm12392.jpg?imageView&thumbnail=244x244&quality=95&type=webp',
                            goodsName: 'JAYJUN 水光悦颜花漾定制礼盒 共15片',
                            price: '129.00',
                            realPrice: '150.00',
                            description: '百元级就能集齐的水光全家'
                        },
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/cf1e498cdbbb4cd783cf6717569185881530780677794jj8baidm12392.jpg?imageView&thumbnail=244x244&quality=95&type=webp',
                            goodsName: 'JAYJUN 水光悦颜花漾定制礼盒 共15片',
                            price: '129.00',
                            realPrice: '150.00',
                            description: '百元级就能集齐的水光全家'
                        },
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/cf1e498cdbbb4cd783cf6717569185881530780677794jj8baidm12392.jpg?imageView&thumbnail=244x244&quality=95&type=webp',
                            goodsName: 'JAYJUN 水光悦颜花漾定制礼盒 共15片',
                            price: '129.00',
                            realPrice: '150.00',
                            description: '百元级就能集齐的水光全家'
                        },
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/cf1e498cdbbb4cd783cf6717569185881530780677794jj8baidm12392.jpg?imageView&thumbnail=244x244&quality=95&type=webp',
                            goodsName: 'JAYJUN 水光悦颜花漾定制礼盒 共15片',
                            price: '129.00',
                            realPrice: '150.00',
                            description: '百元级就能集齐的水光全家'
                        },
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/cf1e498cdbbb4cd783cf6717569185881530780677794jj8baidm12392.jpg?imageView&thumbnail=244x244&quality=95&type=webp',
                            goodsName: 'JAYJUN 水光悦颜花漾定制礼盒 共15片',
                            price: '129.00',
                            realPrice: '150.00',
                            description: '百元级就能集齐的水光全家'
                        },
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/cf1e498cdbbb4cd783cf6717569185881530780677794jj8baidm12392.jpg?imageView&thumbnail=244x244&quality=95&type=webp',
                            goodsName: 'JAYJUN 水光悦颜花漾定制礼盒 共15片',
                            price: '129.00',
                            realPrice: '150.00',
                            description: '百元级就能集齐的水光全家'
                        },
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/cf1e498cdbbb4cd783cf6717569185881530780677794jj8baidm12392.jpg?imageView&thumbnail=244x244&quality=95&type=webp',
                            goodsName: 'JAYJUN 水光悦颜花漾定制礼盒 共15片',
                            price: '129.00',
                            realPrice: '150.00',
                            description: '百元级就能集齐的水光全家'
                        }
                    ]
                },
                {
                    code: "themeFloor-1",
                    sort: 9,
                    area: "bodyCenter",
                    own:  {
                        title: '卸妆1'
                    },
                    cont: [
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/cf1e498cdbbb4cd783cf6717569185881530780677794jj8baidm12392.jpg?imageView&thumbnail=244x244&quality=95&type=webp',
                            goodsName: 'JAYJUN 水光悦颜花漾定制礼盒 共15片JAYJUN 水光悦颜花漾定制礼盒 共15片',
                            price: '129.00',
                            realPrice: '150.00',
                            description: '百元级就能集齐的水光全家'
                        },
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/cf1e498cdbbb4cd783cf6717569185881530780677794jj8baidm12392.jpg?imageView&thumbnail=244x244&quality=95&type=webp',
                            goodsName: 'JAYJUN 水光悦颜花漾定制礼盒 共15片',
                            price: '129.00',
                            realPrice: '150.00',
                            description: '百元级就能集齐的水光全家'
                        },
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/cf1e498cdbbb4cd783cf6717569185881530780677794jj8baidm12392.jpg?imageView&thumbnail=244x244&quality=95&type=webp',
                            goodsName: 'JAYJUN 水光悦颜花漾定制礼盒 共15片',
                            price: '129.00',
                            realPrice: '150.00',
                            description: '百元级就能集齐的水光全家'
                        },
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/cf1e498cdbbb4cd783cf6717569185881530780677794jj8baidm12392.jpg?imageView&thumbnail=244x244&quality=95&type=webp',
                            goodsName: 'JAYJUN 水光悦颜花漾定制礼盒 共15片',
                            price: '129.00',
                            realPrice: '150.00',
                            description: '百元级就能集齐的水光全家'
                        },
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/cf1e498cdbbb4cd783cf6717569185881530780677794jj8baidm12392.jpg?imageView&thumbnail=244x244&quality=95&type=webp',
                            goodsName: 'JAYJUN 水光悦颜花漾定制礼盒 共15片',
                            price: '129.00',
                            realPrice: '150.00',
                            description: '百元级就能集齐的水光全家'
                        },
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/cf1e498cdbbb4cd783cf6717569185881530780677794jj8baidm12392.jpg?imageView&thumbnail=244x244&quality=95&type=webp',
                            goodsName: 'JAYJUN 水光悦颜花漾定制礼盒 共15片',
                            price: '129.00',
                            realPrice: '150.00',
                            description: '百元级就能集齐的水光全家'
                        },
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/cf1e498cdbbb4cd783cf6717569185881530780677794jj8baidm12392.jpg?imageView&thumbnail=244x244&quality=95&type=webp',
                            goodsName: 'JAYJUN 水光悦颜花漾定制礼盒 共15片',
                            price: '129.00',
                            realPrice: '150.00',
                            description: '百元级就能集齐的水光全家'
                        },
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/cf1e498cdbbb4cd783cf6717569185881530780677794jj8baidm12392.jpg?imageView&thumbnail=244x244&quality=95&type=webp',
                            goodsName: 'JAYJUN 水光悦颜花漾定制礼盒 共15片',
                            price: '129.00',
                            realPrice: '150.00',
                            description: '百元级就能集齐的水光全家'
                        }
                    ]
                },
                {
                    code: "themeFloor-1",
                    sort: 10,
                    area: "bodyCenter",
                    own:  {
                        title: '卸妆1'
                    },
                    cont: [
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/cf1e498cdbbb4cd783cf6717569185881530780677794jj8baidm12392.jpg?imageView&thumbnail=244x244&quality=95&type=webp',
                            goodsName: 'JAYJUN 水光悦颜花漾定制礼盒 共15片JAYJUN 水光悦颜花漾定制礼盒 共15片',
                            price: '129.00',
                            realPrice: '150.00',
                            description: '百元级就能集齐的水光全家'
                        },
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/cf1e498cdbbb4cd783cf6717569185881530780677794jj8baidm12392.jpg?imageView&thumbnail=244x244&quality=95&type=webp',
                            goodsName: 'JAYJUN 水光悦颜花漾定制礼盒 共15片',
                            price: '129.00',
                            realPrice: '150.00',
                            description: '百元级就能集齐的水光全家'
                        },
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/cf1e498cdbbb4cd783cf6717569185881530780677794jj8baidm12392.jpg?imageView&thumbnail=244x244&quality=95&type=webp',
                            goodsName: 'JAYJUN 水光悦颜花漾定制礼盒 共15片',
                            price: '129.00',
                            realPrice: '150.00',
                            description: '百元级就能集齐的水光全家'
                        },
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/cf1e498cdbbb4cd783cf6717569185881530780677794jj8baidm12392.jpg?imageView&thumbnail=244x244&quality=95&type=webp',
                            goodsName: 'JAYJUN 水光悦颜花漾定制礼盒 共15片',
                            price: '129.00',
                            realPrice: '150.00',
                            description: '百元级就能集齐的水光全家'
                        },
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/cf1e498cdbbb4cd783cf6717569185881530780677794jj8baidm12392.jpg?imageView&thumbnail=244x244&quality=95&type=webp',
                            goodsName: 'JAYJUN 水光悦颜花漾定制礼盒 共15片',
                            price: '129.00',
                            realPrice: '150.00',
                            description: '百元级就能集齐的水光全家'
                        },
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/cf1e498cdbbb4cd783cf6717569185881530780677794jj8baidm12392.jpg?imageView&thumbnail=244x244&quality=95&type=webp',
                            goodsName: 'JAYJUN 水光悦颜花漾定制礼盒 共15片',
                            price: '129.00',
                            realPrice: '150.00',
                            description: '百元级就能集齐的水光全家'
                        },
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/cf1e498cdbbb4cd783cf6717569185881530780677794jj8baidm12392.jpg?imageView&thumbnail=244x244&quality=95&type=webp',
                            goodsName: 'JAYJUN 水光悦颜花漾定制礼盒 共15片',
                            price: '129.00',
                            realPrice: '150.00',
                            description: '百元级就能集齐的水光全家'
                        },
                        {
                            href: '/',
                            picPath: 'https://haitao.nosdn1.127.net/cf1e498cdbbb4cd783cf6717569185881530780677794jj8baidm12392.jpg?imageView&thumbnail=244x244&quality=95&type=webp',
                            goodsName: 'JAYJUN 水光悦颜花漾定制礼盒 共15片',
                            price: '129.00',
                            realPrice: '150.00',
                            description: '百元级就能集齐的水光全家'
                        }
                    ]
                },
                {
                    code: "scrollTop-1",
                    sort: 12,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "searchHistory-1",
                    sort: 13,
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
        error:            {
            page:   "error",
            file:   'error',
            path:   '',
            region: region,
            system: "mpMall"
        },
        amountAccess:     {
            page:   "amount-access",
            file:   'amount-access',
            path:   '',
            region: region,
            system: "mpMall"
        },
        customerService:  {
            page:    'customerService',
            file:    'customerService',
            path:    '',
            region:  region,
            system:  'mpMall'
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

