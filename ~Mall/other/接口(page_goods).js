
//"http://localhost:8888";
//"https://front.cncoopay.com";
//"https://testfront.cncoopay.com";
var host = "http://localhost:8888";

/** 商详页面创建 */
function addPage(region, page) {
    var pages = [];
    var datas = [];
    var dataObj = {
        goodsDetail:     {
            seo:     {
                title: "福利商城",
                keywords: "福利网站, 海淘网站,跨境购,母婴用品,进口商品,网上购物,保税区,跨境电商,跨境贸易",
                description: "福利网站, 跨境电商, 跨境贸易, 提供丰富的正品海外商品, 欢迎广大顾客光临购买！"
            },
            page:    "goodsDetail",
            file:    '100000221',
            path:    '/first4/second10/third212/',
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
                    code: "goodsDetail-1",
                    sort: 5,
                    area: "bodyCenter",
                    own:  null,
                    cont: {"id":10605,"brandId":"brand_353","goodsName":null,"brand":null,"tariff":0,"incrementTax":0.16,"hscode":null,"encode":null,"unit":null,"createTime":null,"updateTime":null,"opt":null,"goodsId":"100000221","supplierId":5,"supplierName":"广州仓gzc","customGoodsName":"日本Naris娜丽丝无敌防晒美白保湿粉饼9g","description":null,"status":null,"type":0,"popular":null,"hot":null,"fresh":null,"good":null,"origin":"日本","choice":null,"indexStatus":null,"detailPath":"http://106.14.185.13:8080/html/2171.html","specsInfo":null,"price":null,"realPrice":null,"thirdCategory":"third212","secondCategory":"second10","firstCategory":"first4","goodsFileList":[{"id":null,"goodsId":"100000221","path":null,"suffix":null}],"goodsSpecsList":[{"id":221730,"goodsId":"100000221","itemId":"100000217","itemCode":"GZKJ0495010039","sku":"GZKJ0495010039","promotion":null,"discount":null,"info":null,"weight":20,"exciseTax":0,"createTime":null,"updateTime":null,"opt":null,"thirdCategory":null,"secondCategory":null,"firstCategory":null,"minPrice":null,"maxPrice":null,"vipMinPrice":null,"vipMaxPrice":null,"realMinPrice":null,"realMaxPrice":null,"realVipMinPrice":null,"realVipMaxPrice":null,"status":null,"stock":null,"incrementTax":null,"priceList":[{"id":3011,"itemId":"100000217","min":0,"max":0,"price":109,"vipPrice":null,"deliveryPlace":null,"proxyPrice":0,"fxPrice":0,"retailPrice":null,"createTime":null,"updateTime":null,"opt":null}],"tagList":null,"conversion":1,"carton":null,"welfarePrice":0,"fx":1}],"couponList":null,"freePost":1,"freeTax":1,"accessPath":null,"href":"/first4/second10/third212/100000221.html","goodsTagRatio":null}
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

/** 商详页面删除 */
function delPage(region, page) {
    var pages = [];
    var datas = [];
    var dataObj = {
        goodsDetail:    {
            page:    "goodsDetail",
            file:    '100000221',
            path:    '/first4/second10/third212/',
            region:  region,
            system:  'fmpMall'
        },
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