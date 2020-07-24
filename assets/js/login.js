$(function() {
    //给登录和注册div分别添加点击事件,
    //登录页面
    $('.ri_de').on('click', 'a', function() {
            $('.login-box').show()
            $('.reg-box').hide()

        })
        //注册页面
    $('.ri_zhu').on('click', 'a', function() {
            $('.reg-box').show()
            $('.login-box').hide()

        })
        //自定义表单验证规则
    var form = layui.form;
    var layer = layui.layer;
    // console.log(form);
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //给确认密码加验证,val需要与pwd相等
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (value != pwd) {
                return alert('两次密码输入不一致')
            }

        }


    })

    //监听注册表单,调用接口文档
    $('#form_reg').on('submit', function(e) {
            e.preventDefault()
            var data = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            }

            // var data = $(this).serialize();
            // console.log(data)
            $.post('/api/reguser', data, function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功,请登录!')
                $('.ri_de a').click()
            })
        })
        //监听登录表单,调用接口跳转到首页
    $('#form_login').submit(function(e) {
        e.preventDefault()
        var data = $(this).serialize();
        console.log(data);
        $.post('/api/login', data, function(res) {
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message)
                //将登录成功的token值存放到本地存储中
            localStorage.setItem('token', res.token);
            location.href = "/index.html";
        })
    })
})