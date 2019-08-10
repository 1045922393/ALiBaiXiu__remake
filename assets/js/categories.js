$(function () {
    //发送ajax获取动态分类
    $.ajax({
        type: 'get',
        url: '/getPostsCate',
        dataType: 'json',
        success: function (res) {
            if (res.code == 200) {
                console.log(res)
                let html = '';
                res.data.forEach((val) => {
                    html += ` <tr>
                    <td class="text-center"><input type="checkbox"></td>
                    <td>${val.name}</td>
                    <td>${val.slug}</td>
                    <td class="text-center">
                      <a href="javascript:;" class="btn btn-info btn-xs editCate" data-id="${val.id}" data-name="${val.name}" data-slug="${val.slug}">编辑</a>
                      <a href="javascript:;" class="btn btn-danger btn-xs delCate">删除</a>
                    </td>
                  </tr>`
                })
                $('tbody').html(html)
            }
        }
    });

    $('tbody').on('click', '.editCate', function () {
        // console.log(this.dataset)
        $('#name').val(this.dataset.name);
        $('#slug').val(this.dataset.slug);
        $('#cateid').val(this.dataset.id)
        $('#subNew').attr('type', 'hidden')
        $('#subEdit').attr('type', 'button')
        $('#quitEdit').attr('type', 'button')
    })
    $('#quitEdit').on('click', function () {
        $('#name').val(null);
        $('#slug').val(null);
        $('#cateid').val(null)
        $('#subNew').attr('type', 'button')
        $('#subEdit').attr('type', 'hidden')
        $('#quitEdit').attr('type', 'hidden')
    })

    $('#subNew').on('click', function () {
        $('#cateid').val(null)
        if (!($('#name').val() && $('#slug').val())) {
            alert('请输入名称/别名')
            return;
        }
        let data = $('form').serialize();
        $.ajax({
            data: data,
            type: 'get',
            url: '/submitCate',
            dataType: 'json',
            success: function (res) {
                // console.log(res)
                if (res.code == 200) {
                    alert(res.msg)
                    //     $('<tr>').html(`
                    //     <td class="text-center"><input type="checkbox"></td>
                    //     <td>${$('#name').val()}</td>
                    //     <td>${$('#slug').val()}</td>
                    //     <td class="text-center">
                    //       <a href="javascript:;" class="btn btn-info btn-xs editCate" data-id="${val.id}" data-name="${val.name}" data-slug="${val.slug}">编辑</a>
                    //       <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
                    //     </td>
                    //   `);
                    $('tbody').append($('<tr>').html(`
                    <td class="text-center"><input type="checkbox"></td>
                    <td>${$('#name').val()}</td>
                    <td>${$('#slug').val()}</td>
                    <td class="text-center">
                      <a href="javascript:;" class="btn btn-info btn-xs editCate" data-id="${res.data.id}" data-name="${$('#name').val()}" data-slug="${$('#slug').val()}">编辑</a>
                      <a href="javascript:;" class="btn btn-danger btn-xs delCate">删除</a>
                    </td>
                  `))
                } else {
                    alert(res.msg)
                }
            }
        })
    })
    $('#subEdit').on('click', function () {
        if (!($('#name').val() && $('#slug').val())) {
            alert('请输入名称/别名')
        }
        let data = $('form').serialize();
        $.ajax({
            data: data,
            type: 'get',
            url: '/submitCate',
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    alert(res.msg)
                    //     $('tbody').append($('<tr>').html(`
                    //     <td class="text-center"><input type="checkbox"></td>
                    //     <td>${$('#name').val()}</td>
                    //     <td>${$('#slug').val()}</td>
                    //     <td class="text-center">
                    //       <a href="javascript:;" class="btn btn-info btn-xs editCate" data-id="${res.data.id}" data-name="${$('#name').val()}" data-slug="${$('#slug').val()}">编辑</a>
                    //       <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
                    //     </td>
                    //   `))
                    $(`[data-id="${$('#cateid').val()}"]`).parents('tr').html(`
                    <td class="text-center"><input type="checkbox"></td>
                    <td>${$('#name').val()}</td>
                    <td>${$('#slug').val()}</td>
                    <td class="text-center">
                      <a href="javascript:;" class="btn btn-info btn-xs editCate" data-id="${res.data.id}" data-name="${$('#name').val()}" data-slug="${$('#slug').val()}">编辑</a>
                      <a href="javascript:;" class="btn btn-danger btn-xs delCate">删除</a>
                    </td>
                  `)
                } else {
                    alert(res.msg)
                }
            }
        })
    });
    $('tbody').on('click', '.delCate', function () {
        // console.log($(this).siblings('a').data('id'))
        let thisF = this;
        if (confirm('确定要删除该分类吗?')) {
            let delId = $(this).siblings('a').data('id')
            $.ajax({
                type: 'get',
                data: { id: delId },
                dataType: 'json',
                url: '/delCategory',
                success: function (res) {
                    console.log(res)
                    if (res.code == 200) {
                        $(thisF).parents('tr').remove()

                        $('#quitEdit').click()  //归零编辑
                    }
                }
            })
        }

    })
})