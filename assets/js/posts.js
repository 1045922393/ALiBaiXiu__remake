$(function () {





    //发送ajax获得数据的数量
    let totalPostsNumber = 0;       //获得说有的数据
    // let pageSize = 2;       //控制每页多少条数据
    let searchObj = {
        categoriy: 0,       //默认所有分类
        status: 'all',          //默认所有状态
        pageNum: 1,
        pageSize: 3
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
    $.ajax({        //一开始去获取所有的数据的长度
        url: '/getAllPosts',
        dataType: 'json',
        success: function (response) {
            if (response.code == '404') {
                alert(response.msg);
            } else {
                // console.log(response)
                totalPostsNumber = response.data.allLength;
                options.totalPages = Math.ceil(totalPostsNumber / searchObj.pageSize);//所有数据可以显示的页数
                // console.log(response)
                $("#paginator").bootstrapPaginator(options);
            }
        }
    })
    getIndexPost(searchObj)
    function getIndexPost(obj, callback) {
        // obj = obj || {};
        // obj.pageNum = obj.pageNum || 1;
        // obj.pageSize = obj.pageSize || 2;
        callback = callback || function () { }
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
                    //options.totalPages = Math.ceil(response.data.allLength / searchObj.pageSize);//所有数据可以显示的页数
                    // $("#paginator").bootstrapPaginator(options);
                    let html = template('postTemplate', response.data.arr)
                    $('tbody').html(html);
                    callback(response.data.allLength);  //返回获得所有的数据的长度
                }
            }
        })
    }

    $('#filter').on('click', function () {//点击一次筛选,那么去重新定义一次所筛选的数据的总长度
        // searchObj = {
        //     categoriy: $('#categoriy').val(),
        //     status: $('#status').val()
        // }
        searchObj.categoriy = $('#categoriy').val();
        searchObj.status = $('#status').val()
        searchObj.pageNum = 1;
        // console.log(searchObj)
        // console.log(obj)
        getIndexPost(searchObj, (length) => {
            options.totalPages = Math.ceil(length / searchObj.pageSize);
            $("#paginator").bootstrapPaginator(options);
        })

    })

    //获取所有分类的ajax,确保无问题
    $.ajax({
        type: 'get',
        url: '/getPostsCate',
        dataType: 'json',
        success: function (response) {
            // console.log(response)
            let html = `<option value="0">所有分类</option>`;
            response.data.forEach((val) => {
                html += `<option id="${val.slug}" value="${val.id}">${val.name}</option>`
            })
            $('#categoriy').html(html);
        }
    })

    $('tbody').on('click', '.btn-xs.btn-danger', function (e) {
        // console.log($(this).data('id'))
        if (confirm('确定要删除此数据吗?')) {
            let delId = $(this).data('id');
            $.ajax({
                url: '/delPostById?id=' + delId,
                type: 'get',
                // data: delId,
                dataType: 'json',
                success: function (res) {
                    if (res.code == 200) {
                        alert('删除成功');
                        location.reload()
                    } else {
                        alert('服务器异常')
                    }
                }
            })
        }
    })


})