$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
        var dt = new Date(date)

        var y = dt.getFullYear()
        var m = (dt.getMonth() + 1).toString().padStart(2, 0)
        var d = dt.getDate().toString().padStart(2, 0)

        var hh = dt.getHours().toString().padStart(2, 0)
        var mm = dt.getMinutes().toString().padStart(2, 0)
        var ss = dt.getSeconds().toString().padStart(2, 0)

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }


    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    initTable()

    initCate()

    // 渲染表格
    function initTable() {
        $.ajax({
            url: '/my/article/list',
            type: 'get',
            data: q,
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }

        })
    }

    // 发起请求渲染文章分类下拉框
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            type: 'get',
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-cate', res)
                $('#cate_id').append(htmlStr)
                form.render()
            }
        })
    }

    // 实现筛选功能
    $('#layui-form').on('submit', function(e) {
        e.preventDefault()
        q.cate_id = $('#cate_id').val()
        q.state = $('#state').val()
        initTable()
    })

    // 分页

    function renderPage(total) {


        //执行一个laypage实例
        laypage.render({
            elem: 'pageBox', //注意，这里的 pageBox 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize, //每页显示的条数
            curr: q.pagenum, //起始页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function(obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                q.pagenum = obj.curr
                    // console.log(obj.limit); //得到每页显示的条数
                q.pagesize = obj.limit
                    //首次不执行
                if (!first) {
                    initTable()
                }
            }
        })
    }

    // 代理的方法点击删除弹出弹出框
    $('body').on('click', '.btnDel', function() {
        var num = $('.btnDel').length
            // console.log(num);
        var id = $(this).attr('data-id')
            // console.log(id);
        layer.confirm('确定删除?', function(index) {
            //do something
            // 利用id调用接口删除当前行
            $.ajax({
                url: '/my/article/delete/' + id,
                type: 'get',
                success: function(res) {
                    if (res.status !== 0) {
                        console.log(res);
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    if (num === 1) {
                        q.pagenum = q.pagenum - 1
                    }
                    initTable()
                }
            })
            layer.close(index)

        })

    })





})