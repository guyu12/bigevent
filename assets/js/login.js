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













})