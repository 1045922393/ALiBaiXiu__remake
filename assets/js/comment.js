$(function () {
    //定义一个对象,对象保存着所有变化的值
    var changing = {
        currentNum: 1, //当前显示的页数
        paginationNum: 3,  //分页器每页显示数量
        //paginationTotalPages: 1, //分页器总页数,需要根据服务器的返回数据来确定
        commentPageNum: 3,   //每一页显示的评论数量
    };
    getPaginationTotalPages(remarkPagination, getCurrentComments)

    //注册全选点击
    $('#chooseAll').on('click', () => {
        $('[type="checkbox"]').prop("checked", $('#chooseAll').prop('checked'))
        if ($('#chooseAll').prop('checked')) {
            $('.lotsMark').fadeIn(500)
        } else {
            $('.lotsMark').fadeOut(500)
        }
    })

    //注册监听点击事件
    $('tbody').on('click', '[type="checkbox"]', () => {
        //是否全选
        $('#chooseAll').prop('checked', $('tbody [type="checkbox"]:checked').length == changing.commentPageNum);
        if ($('tbody [type="checkbox"]:checked').length >= 2) {
            $('.lotsMark').fadeIn(500)
        } else {
            $('.lotsMark').fadeOut(500)
        }
    })








    //该函数只负责分页器的总页数
    function getPaginationTotalPages(callback, callback2) {
        callback = callback || function () { };//如果不传那么进行空回调;
        callback2 = callback2 || function () { };//如果不传那么进行空回调;

        $.ajax({
            type: 'get',
            dataType: 'json',
            url: '/getAllComments',
            success: function (res) {
                console.log(res)
                if (res.code == 200) {
                    changing.paginationTotalPages = Math.ceil(res.data.length / changing.commentPageNum)
                    console.log(changing)
                    // let commentArr = res.data;
                    // let html = template('commentTemplate', commentArr);
                    // $('tbody').html(html)
                    callback();     //根据情况是否要进行回调
                    callback2();     //根据情况是否要进行回调
                }
            }
        });
    };

    //该函数获得每一页的评论
    function getCurrentComments() {
        $.ajax({
            type: 'get',
            data: {
                currentPageNum: changing.currentNum,
                showNum: changing.commentPageNum
            },
            dataType: 'json',
            url: '/getPageComments',
            success: function (res) {
                // console.log(res)
                if (res.code == 200) {
                    // changing.paginationTotalPages = res.data.length
                    let commentArr = res.data;
                    let html = template('commentTemplate', commentArr);
                    $('tbody').html(html)
                    // callback();     //根据情况是否要进行回调
                    // callback2();     //根据情况是否要进行回调
                }
            }
        });
    }
    //该函数重做分页器
    function remarkPagination() {
        let options = {
            bootstrapMajorVersion: 3, //对应的bootstrap版本
            currentPage: changing.currentNum, //当前页数，这里是用的EL表达式，获取从后台传过来的值
            numberOfPages: changing.paginationNum, //每页页数
            totalPages: changing.paginationTotalPages, //总页数，这里是用的EL表达式，获取从后台传过来的值
            shouldShowPage: true,//是否显示该按钮
            itemTexts: function (type, page, current) {//设置显示的样式，默认是箭头
                switch (type) {
                    case "first":
                        return "首页";
                    case "prev":
                        return "上一页";
                    case "next":
                        return "下一页";
                    case "last":
                        return "末页";
                    case "page":
                        return page;
                }
            },
            //点击事件
            onPageClicked: function (event, originalEvent, type, page) {
                //将page赋予给全局变量的当前页
                changing.currentNum = page;
                //当前页加1后调用一次按获得服务器的需要数据
                getCurrentComments()

                //重置全选按钮
                $('#chooseAll').prop('checked', false)
            }
        }
        $('#pagination').bootstrapPaginator(options)
    }
})