//每次调用ajax接口前先调用这个函数,option是形参
$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url


    //给含有/my/的接口,设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }

    }

    //全局统一挂载complate
    options.complete = function(res) {
        if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
            localStorage.removeItem('token');
            location.href = '/login.html'
        }
    }

})