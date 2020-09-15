$(function() {
    //获取用户基本信息 
    getUserInfo();
    //点击按钮实现退出功能
    var layer = layui.layer;
    $("#btnLogout").on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //清空存储的 token
            localStorage.removeItem('token')
                // 跳到登陆页面 
            location.href = './login.html'
            layer.close(index);
        });
    })
})

//封装用户基本信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        type: 'get',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            //渲染头像
            renderAvater(res.data)
        },
        // 无论成功与否都有
        // complete: function(res) {
        //     console.log(res);
        //     if (res.responseJSON.message === '身份认证失败！' && res.responseJSON.status === 1) {

        //         location.href = './login.html';
        //         localStorage.removeItem('token');
        //     }
        // }
    })
}

//渲染头像
function renderAvater(user) {
    // 渲染用户名
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
        // 判断头像
    if (user.user_pic == null) {
        //文字头像
        $('.layui-nav-img').hide()
        $('.text-event').html(name[0].toUpperCase()).show()
    } else {
        //图片头像
        $('.text-event').hide()
        $('.layui-nav-img').prop('src', user.user_pic)
    }


}