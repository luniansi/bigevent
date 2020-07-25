$(function() {
    //调用接口获取用户的基本信息
    getUserinfo()

    //点击退出按钮退出登录
    $('#btn_tuichu').click(function() {
        //eg1
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //确定退出登录后销毁token;将页面跳转到登录页面
            localStorage.removeItem("token")
            location.href = '/login.html'

            //layui自带的
            layer.close(index);
        });
    })
})

//封装获取用户的函数
function getUserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            //否则就将用户名和用户头像渲染到页面中
            renderAvatar(res.data)

        },
        // complete: function(res) {
        //     if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
        //         localStorage.removeItem('token');
        //         location.href = '/login.html'
        //     }
        // }
    })
}
//封装渲染头像和用户名的函数
function renderAvatar(user) {
    //渲染用户名
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //渲染头像
    if (user.user_pic !== null) {
        //将图像显示在页面中
        $('.layui-nav-img').attr('src', 'user.user_pic').show()
        $('.text-avatar').hide()

    } else {
        //将用户名的第一个字符显示在页面中
        var first = name[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.text-avatar').html(first).show()
    }
}