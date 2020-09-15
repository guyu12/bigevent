$(function() {
    var layer = layui.layer
    var form = layui.form


    // 初始化富文本编辑器
    initEditor()
    initCate()

    // 渲染文章类别
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

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 点击选择封面按钮打开文件选择框
    $('#btnChooseImage').on('click', function() {
        $('#file').click()
    })

    // 监听$('#file')的change属性，得到选择的文件
    $('#file').on('change', function(e) {
        var files = e.target.files
        console.log(files);
        if (files.lengtn === 0) {
            return layer.msg('请选择图片')
        }
        // 拿到用户选择的文件
        var file = e.target.files[0]

        // 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)

        // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：

        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    var art_state = '已发布'

    // 点击草稿art_state变为草稿
    $('#btnSave2').on('click', function() {
        art_state = '草稿'
    })

    // 发布文章
    $('#form-pub').on('submit', function(e) {
        e.preventDefault()

        // 动态获取FormData
        var fd = new FormData($(this)[0])

        // 将文章状态存入
        fd.append('state', art_state)

        // 将裁剪后的图片，输出为文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作

                // 将图片存入
                fd.append('cover_img', blob)

                //发起请求
                $.ajax({
                    url: '/my/article/add',
                    type: 'post',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function(res) {
                        console.log(res);
                        if (res.status !== 0) {
                            return layer.msg(res.message)
                        }
                        layer.msg(res.message)
                        location.href = './art_list.html'
                    }
                })
            })
    })
})