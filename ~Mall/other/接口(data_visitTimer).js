
//"http://localhost:8888";
//"https://front.cncoopay.com";
//"https://testfront.cncoopay.com";
var host = "http://localhost:8888";


/** 启用访问记录定时器 */
function openTimer() {
    $.ajax({
        url: host + "/Data/handle/visit/timer",
        method: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({}),
        success:function(response){ console.log(response); },
        error:function(response){ console.log(response); }
    });
}

/** 关闭访问记录定时器 */
function closeTimer() {
    $.ajax({
        url: host + "/Data/handle/visit/timer",
        method: "DELETE",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({}),
        success:function(response){ console.log(response); },
        error:function(response){ console.log(response); }
    });
}

/** 启用访问记录定时器(一次性) */
function openOnceTimer() {
    $.ajax({
        url: host + "/Data/handle/visit/onceTimer",
        method: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({date: '2018/08/24 ~ 2018/08/26', timer: '0 10 10 21 9 *' }),
        success:function(response){ console.log(response); },
        error:function(response){ console.log(response); }
    });
}