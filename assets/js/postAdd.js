$(function () {
    //动态获取分类
    // let time = new Date();
    // console.log(time.toUTCString())
    $('#created').val('2019-08-09T11:11')


    $.ajax({
        type: 'get',
        url: '/getPostsCate',
        dataType: 'json',
        success: function (res) {
            if (res.code == 200) {
                let html = '';
                res.data.forEach((val) => {
                    html += `<option id="${val.slug}" value="${val.id}">${val.name}</option>`
                })
                $('#category').html(html);

            }
        }
    });
    //富文本框替换文本框
    CKEDITOR.replace('content');
    //注册提交事件
    $('.btn-primary').on('click', function () {
        // CKEDITOR.instances.content.updateElement()
        CKEDITOR.instances.content.updateElement(); //同步textarea的值

        let data = decodeURIComponent($('form.row').serialize());
        console.log(data)
        //发起ajax
        $.ajax({
            type: 'post',
            url: '/addPost',
            data: data,
            dataType: 'json',
            success: (res) => {
                if (res.code == 200) {
                    alert(res.msg);
                    location.href = "/admin/posts.html"
                } else {
                    $('.warningmsg span').text(res.msg)
                    $('.warningmsg').stop(true, true).slideDown(500).delay(3000).slideUp(500)
                }
            }
        })
    })
    //注册提交图片事件
    $('#feature').on('change', function () {
        let fd = new FormData();
        //使用  FormData()  来转换文件流
        // console.log(this.files[0])
        fd.append('feature', this.files[0]);
        //发起ajax提交图片
        $.ajax({
            type: 'post',
            url: '/uploadsFeature',
            contentType: false,//让ajax不用转换格式
            processData: false,//让ajax不用转换格式
            data: fd,
            success: function (res) {
                if (res.code == 200) {
                    // console.log(res)
                    $('.showPic').attr('src', '/uploads/' + res.data).show()
                    $('#uploadFeature').val('/uploads/' + res.data)
                    // console.log(res.msg)
                } else {
                    $('.warningmsg span').text(res.msg)
                    $('.warningmsg').stop(true, true).slideDown(500).delay(3000).slideUp(500)
                }
            }
        })
    })


})