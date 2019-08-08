$(function () {
    //发送ajax获得数据的数量
    let totalPostsNumber = 0;       //获得说有的数据
    // let pageSize = 2;       //控制每页多少条数据
    let searchObj = {
        categoriy: 0,
        status: 'all',
        pageNum: 1,
        pageSize: 2
    }
    let options = {
        bootstrapMajorVersion: 3, //版本
        currentPage: 1, //当前页数
        numberOfPages: 2, //最多显示Page页
        onPageClicked: function (e, originalEvent, type, clickPage) {
            searchObj.pageNum = clickPage;
            // option.currentPage = clickPage;
            getIndexPost(searchObj)
        }
    }
    $.ajax({
        url: '/getAllPosts',
        dataType: 'json',
        success: function (response) {
            if (response.code == '404') {
                alert(response.msg);
            } else {
                // console.log(response)
                totalPostsNumber = response.data
                options.totalPages = Math.ceil(totalPostsNumber / searchObj.pageSize);//所有数据可以显示的页数
                $("#paginator").bootstrapPaginator(options);
            }
        }
    })
    getIndexPost(searchObj)
    function getIndexPost(obj) {
        // obj = obj || {};
        // obj.pageNum = obj.pageNum || 1;
        // obj.pageSize = obj.pageSize || 2;
        $.ajax({
            url: '/getPosts',
            data: obj,
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

    $('#filter').on('click', function () {
        // searchObj = {
        //     categoriy: $('#categoriy').val(),
        //     status: $('#status').val()
        // }
        searchObj.categoriy = $('#categoriy').val();
        searchObj.status = $('#status').val()
        searchObj.pageNum = 1;
        console.log(searchObj)
        // console.log(obj)
        getIndexPost(searchObj)
        $("#paginator").bootstrapPaginator(options);
    })








    //获取所有分类的ajax,确保无问题
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




})