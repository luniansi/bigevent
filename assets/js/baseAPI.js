//每次调用ajax接口前先调用这个函数,option是形参
$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})