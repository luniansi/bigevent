$(function() {
    //给密码框添加表单验证
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //给信密码添加规则,不能和原密码相同
        samepwd: function(value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        //给确认密码添加验证规则,需要和新密码相同
        onepwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '密码两次输入不一致'
            }
        }
    })


    //监听表单提交事件

    $('.layui-form').submit(function(e) {
        e.preventDefault()
            //发送ajax请求重置密码
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败!')
                }
                //成功将表单重置成空
                $('.layui-form')[0].reset()
            }
        })
    })


})