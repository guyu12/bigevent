$(function() {
    // alert(111)
    var form = layui.form;
    form.verify({
        // 校验昵称
        nickname: [
            /^[\u0391-\uFFE5A-Za-z0-9]{1,6}$/, '昵称必须1-6个字符之间'
        ]
    })
    initUserInfo()
        // 获取用户基本信息
    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('用户信息获取失败')
                }
                // console.log(res);
                // formUserInfo
                // 调用form.val 方法给表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置按钮重置表单
    $("#btnReset").on('click', function(e) {
            // 阻止默认行为
            e.preventDefault();
            initUserInfo();
        })
        // 提交修改用户信息
    $('.layui-form').on('submit', function(e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            type: 'post',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('修改用户信息失败')
                }
                layui.layer.msg('修改用户信息成功');
                // 调用父页面里面的方法
                window.parent.getUserInfo()
                    // console.log(window.parent.getUserInfo());

            }
        })
    })







})