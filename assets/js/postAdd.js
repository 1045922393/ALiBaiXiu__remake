$(function () {

    // let time = new Date();
    // console.log(time.toUTCString())
    $('#created').val('2019-08-09T11:11')   //测试使用,后面需要注释掉

    //判断地址栏是否有id
    let id = tools.getLocationSearch(location.search).id;
    // console.log(id)
    //根据id的存在与否,去获取数据
    if (id) {
        //发起ajax
        $.ajax({
            url: '/getPostById?id=' + id,
            type: 'get',
            dataType: 'json',
            success: function (response) {
                // console.log(response);
                /**category_id: 1
                content: "<p>gg</p>"
                created: "2019-08-09 11:11:00"
                feature: "/uploads/upload_d031aaceea8b7b923ce7bd090b282969.jpg"
                id: 19
                likes: 0
                slug: "gg"
                status: "drafted"
                title: "gg"
                user_id: 5
                views: 0 */
                let res = response.data;
                $('#title').val(res.title)
                $('#content').val(res.content)
                $('#slug').val(res.slug)
                $('#uploadFeature').val(res.feature)
                $('#category').val(res.category_id)
                $('#status').val(res.status)
                // console.log()
                $('#created').val(res.created)
                $('#hiddenId').val(res.id)
                $('.showPic').attr('src', res.feature).show()
            }
        })
    }


    //动态获取分类

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