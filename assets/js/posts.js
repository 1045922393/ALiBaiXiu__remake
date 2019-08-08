$(function () {
    //发送ajax获得数据的数量
    let totalPostsNumber = 0;       //获得说有的数据
    let pageSize = 2;       //控制每页多少条数据
    $.ajax({
        url: '/getAllPosts',
        dataType: 'json',
        success: function (response) {
            if (response.code == '404') {
                alert(response.msg);
            } else {
                // console.log(response)
                totalPostsNumber = response.data
                let options = {
                    bootstrapMajorVersion: 3, //版本
                    currentPage: 1, //当前页数
                    numberOfPages: 2, //最多显示Page页
                    totalPages: Math.ceil(totalPostsNumber / pageSize), //所有数据可以显示的页数
                    onPageClicked: function (e, originalEvent, type, clickPage) {
                        // console.log("e");
                        // console.log(e);
                        // console.log("originalEvent");
                        // console.log(originalEvent);
                        // console.log("type");
                        // console.log(type);
                        // console.log("page");
                        // console.log(page);
                        getIndexPost({ pageNum: clickPage, pageSize: pageSize })
                        //clickPage为当前的第几页
                    }
                }
                $("#paginator").bootstrapPaginator(options);
            }
        }
    })
    getIndexPost()
    function getIndexPost(obj) {
        obj = obj || {};
        obj.pageNum = obj.pageNum || 1;
        obj.pageSize = obj.pageSize || pageSize;
        $.ajax({
            url: '/getPosts',
            data: { pageNum: obj.pageNum, pageSize: obj.pageSize },
            type: 'get',
            dataType: 'json',
            success: function (response) {
                // console.log(response)
                if (response.code == '404') {
                    alert(response.msg);
                } else {
                    let html = template('postTemplate', response.data)
                    $('tbody').html(html);
                }
            }
        })
    }
    //获取所有分类的ajax
    $.ajax({
        type: 'get',
        url: '/getPostsCate',
        dataType: 'json',
        success: function (response) {
            console.log(response)
            let html = `<option value="0">所有分类</option>`;
            response.data.forEach((val) => {
                html += `<option id="${val.slug}" value="${val.id}">${val.name}</option>`
            })
            $('#categoriy').html(html);
        }
    })
    $('#filter').on('click', function () {

    })
})