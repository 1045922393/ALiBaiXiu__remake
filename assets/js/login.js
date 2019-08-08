$(function () {
    $('#email')
    $('#password')
    $('#login').on('click', function () {
        //判断邮箱与密码是否输入正确格式
        if (!(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test($('#email').val()))) {
            // console.log('输入有误')
            $('#errorWarming span').text('请输入正确邮箱')
            $('#errorWarming').stop(true, true).slideDown(1000).delay(1000).slideUp(1000)
            return;
        }
        if (!$('#password').val()) {
            $('#errorWarming span').text('请输入密码')
            $('#errorWarming').stop(true, true).slideDown(1000).delay(1000).slideUp(1000)
            return;
        }
        //获得邮箱和密码后发送异步请求
        let data = decodeURIComponent($('form').serialize())
        console.log(data)
        $.ajax({
            url: '/checkLogin',
            data,
            type: 'post',
            success: function (response) {
                // console.log(response)
                if (response.code == 304) {
                    $('#errorWarming span').text(response.msg)
                    $('#errorWarming').stop(true, true).slideDown(1000).delay(1000).slideUp(1000)
                } else {
                    alert(response.msg);
                    location.href = '/admin/index.html'
                }
            }
        })
    })

})