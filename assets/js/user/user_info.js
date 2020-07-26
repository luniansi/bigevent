$(function() {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        //给用户昵称添加验证规则,需要在6个字符以下
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间'
            }
        }

    })

    inituserInfo()
        //封装获取用户信息的函数
    function inituserInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                //调用form.val()快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    //点击重置按钮,将表单里面的内容,重置到获取的时候
    $('#btnreset').click(function(e) {
        e.preventDefault()
        inituserInfo()
    })

    //给表单注册监听事件
    $('.layui-form').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息更新失败')
                }
                //否则就将用户信息更新到页面上
                window.parent.getUserinfo()
            }
        })
    })


})