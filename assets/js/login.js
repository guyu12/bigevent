$(function() {
    // 点击登陆去登陆
    $('#link_login').on('click', function() {
        $('.reg_box').hide();
        $('.login_box').show();
    });
    // 点击注册去注册
    $('#link_reg').on('click', function() {
        $('.login_box').hide();
        $('.reg_box').show();
    });

    // 自定义校验规则
    // 获取layui的form表单模块
    var form = layui.form;
    var layer = layui.layer;
    // 调用verify方法，定义验证规则
    form.verify({
        // 校验密码
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 判断两次密码是否一致
        repwd: function(value) {
            var pwd = $('#passwords').val();
            if (pwd !== value) {
                return '两次密码输入不一致';
            }
        }
    });
    // 监听表单注册提交事件
    $('#form_reg').on('submit', function(e) {
        // 阻止默认行为
        e.preventDefault();
        // console.log($('.reg_box [name="username"]').val());
        $.ajax({
            url: '/api/reguser',
            type: 'post',
            data: {
                username: $('.reg_box [name="username"]').val(),
                password: $('.reg_box [name="password"]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录');
                $('#link_login').click();
            }
        })
    })

    // 监听表单登陆提交事件
    $('#form_login').on('submit', function(e) {
        // 阻止默认行为
        // console.log(111);
        e.preventDefault();

        $.ajax({
            url: '/api/login',
            type: 'post',
            data: $(this).serialize(),
            success: function(res) {

                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登陆成功');
                // console.log(res.token);
                localStorage.setItem('token', res.token)
                location.href = './index.html';
            }
        })


    })











})