$(function() {
    var layer = layui.layer
    var form = layui.form


    initArtCateList()

    // 调用函数渲染文章类别页面
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            type: 'get',
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 模板引擎渲染页面
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    var index = null

    // 点击添加类别弹出弹出框
    $('#btnAdd').on('click', function() {
        index = layer.open({
            title: '添加文章分类',
            type: 1,
            area: ['500px', '250px'],
            content: $('#tpl-add').html()
        })
    })

    //利用委托的方法新增文章分类
    $('body').on('submit', '#form-layui', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/article/addcates',
            type: 'post',
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                initArtCateList()
                layer.close(index)
            }
        })
    })

    var index1 = null

    // 利用委托的方法点击编辑弹出弹出框 修改文章分类
    $('body').on('click', '#btnEdit', function() {
        index1 = layer.open({
            title: '修改文章分类',
            type: 1,
            area: ['500px', '250px'],
            content: $('#tpl-edit').html()
        })
        var id = $(this).attr('data-id')
            // 利用id获取当前行数据
        $.ajax({
            url: '/my/article/cates/' + id,
            type: 'get',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('form-layui1', res.data)
            }
        })
    })

    //利用委托的方法修改文章分类
    $('body').on('submit', '#form-layui1', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/article/updatecate',
            type: 'post',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                initArtCateList()
                layer.close(index1)
            }
        })
    })


    // 点击删除弹出删除框
    $('body').on('click', '#btnDel', function() {
        var id = $(this).attr('data-id')
        layer.confirm('确定删除?', function(index) {
            //do something
            // 利用id调用接口删除当前行
            $.ajax({
                url: '/my/article/deletecate/' + id,
                type: 'get',
                success: function(res) {
                    if (res.status !== 0) {
                        console.log(res);
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    initArtCateList()
                }
            })
            layer.close(index);

        })

    })






})