
//"http://localhost:8888";
//"https://front.cncoopbuy.com";
//"https://testfront.cncoopbuy.com";
var host = "http://localhost:8888";

/** 商品设置为可分销 */
function addDistribution(region) {
    $.ajax({
        url: host + "/Data/handle/distribution",
        method: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({ region: region, 100000221: ['100000217'] }),
        success:function(response){ console.log(response); },
        error:function(response){ console.log(response); }
    });
}

/** 商品设置为不可分销 */
function delDistribution(region) {
    $.ajax({
        url: host + "/Data/handle/distribution",
        method: "DELETE",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({ region: region, 100000221: ['100000217'] }),
        success:function(response){ console.log(response); },
        error:function(response){ console.log(response); }
    });
}