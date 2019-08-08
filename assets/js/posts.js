$(function () {
    $.ajax({
        url: '/getPosts',
        data: { pageNum: 1, pageSize: 2 },
        type: 'get',
        dataType: 'json',
        success: function (response) {
            // console.log(response)
            if (response.code == '404') {
                alert(response.msg);
            } else {
                let html = template('postTemplate', response.data)
                $('tbody').html(html)
            }
        }
    })
})