$(function() {
    //获取用户基本信息 
    getUser()




    //封装用户基本信息
    function getUser() {
        $.ajax({
            url: '/my/userinfo',
            type: 'get',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                //渲染头像
                renderAvater(res.data)
            }
        })
    }
    //渲染头像
    function renderAvater(user) {
        // 渲染用户名
        var name = user.user_pic || user.username;
        $('#welcome').html('欢迎&nbsp&nbsp' + name)
            // 判断头像
        if (user.user_pic == null) {
            //文字头像
            $('.layui-nav-img').hide()
            $('.text-event').html(name.substr(0, 1).toUpperCase()).show()
        } else {
            //图片头像
            $('.text-event').hide()
            $('.layui-nav-img').prpo('src', user.user_pic)
        }


    }




})