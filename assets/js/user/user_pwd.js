$(function() {
    var form = layui.form;
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            samPwd: function(value) {
                if (value === $('.oldPwd').val()) {
                    return '新密码与原密码不能相同'
                }
            },
            rePwds: function(value1) {
                // console.log(value1);
                // console.log($('.newPwd').val());
                if (value1 !== $('.newPwd').val()) {
                    return '两次密码不一致'
                }
            }
        })
        // 提交密码更新
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            type: 'post',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('密码更新成功')
                $('.layui-form')[0].reset()
                localStorage.removeItem('token')
                top.window.location.href = '../login.html'

            }
        })
    })











})