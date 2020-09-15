  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
      // 1.2 配置选项
  const options = {
      // 纵横比
      aspectRatio: 1,
      // 指定预览区域
      preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  //   点击上传按钮更换图片
  $('#btnChooseImage').on('click', function() {
      $('#file').click()
  })

  //   当选择的input发生状态变化时，可以获取到选择的值
  $('#file').on('change', function(e) {
      //   console.log(e)
      var filelist = e.target.files
      console.log(filelist)
      if (filelist.lengtn === 0) {
          return layui.layer.msg('请选择图片')
      }

      //   拿到用户选择的图片
      var file = e.target.files[0]
          //   根据选择的文件，创建一个对应的 URL 地址：
      var newImgURL = URL.createObjectURL(file)
          //   先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域
      $image
          .cropper('destroy') // 销毁旧的裁剪区域
          .attr('src', newImgURL) // 重新设置图片路径
          .cropper(options) // 重新初始化裁剪区域
  })

  // 点击确定按钮上传图片
  $('#btnUpload').on('click', function(e) {
      e.preventDefault()
          // 获取裁剪的图片
      console.log(111)
      var dataURL = $image
          .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
              width: 100,
              height: 100
          })
          .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
          // 调用函数上传图片
      $.ajax({
          url: '/my/update/avatar',
          type: 'post',
          data: {
              avatar: dataURL,
          },
          success: function(res) {
              console.log(res)
              if (res.status !== 0) {
                  return layui.layer.msg('头像上传失败')
              }
              layui.layer.msg('头像上传成功')
              window.parent.getUserInfo()
          }
      })

  })