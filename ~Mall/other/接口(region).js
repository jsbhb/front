
//"http://localhost:8888";
//"https://front.cncoopay.com";
//"https://testfront.cncoopay.com";
var host = "http://localhost:8888";


/** 区域中心创建 */
function addRegion(region) {
    $.ajax({
        url: host + "/Region/handle",
        method: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
            region: region,
            gradeId: 2,
            domainName: 'https://test2.cncoopay.com/',
            mDomainName: 'https://test.cncoopay.com/',
            fDomainName: 'https://test3.cncoopay.com/',
        }),
        success:function(response){ console.log(response); },
        error:function(response){ console.log(response); }
    });
}


/** 区域中心更新 */
function putRegion(region) {
    $.ajax({
        url: host + "/Region/handle",
        method: "PUT",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
            gradeId: 55,
            region: region,
            domainName: 'http://127.0.0.1:8081',
            mDomainName: 'http://127.0.0.1:8082',
            fDomainName: 'http://127.0.0.1:8083',
            malls: ['pcMall']
        }),
        success:function(response){ console.log(response); },
        error:function(response){ console.log(response); }
    });
}


/** 区域中心删除 */
function delRegion(region) {
    $.ajax({
        url: host + "/Region/handle",
        method: "DELETE",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({region: region}),
        success:function(response){ console.log(response); },
        error:function(response){ console.log(response); }
    });
}