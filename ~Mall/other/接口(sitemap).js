
//"http://localhost:8888";
//"https://front.cncoopay.com";
var host = "https://testfront.cncoopay.com";
// var host = "http://localhost:8888";

/** Sitemap 创建 */
function addSitemap(domain, region) {
    $.ajax({
        url: host + "/Sitemap/handle",
        method: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({ region: region, domain: domain }),
        success:function(response){ console.log(response); },
        error:function(response){ console.log(response); }
    });
}

/** Sitemap 删除 */
function delSitemap(domain, region) {
    $.ajax({
        url: host + "/Sitemap/handle",
        method: "DELETE",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({ region: region, domain: domain}),
        success:function(response){ console.log(response); },
        error:function(response){ console.log(response); }
    });
}