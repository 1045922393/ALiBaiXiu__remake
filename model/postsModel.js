//posts的数据层
//引入mysql的封装连接
const connection = require('./createConnection');


module.exports = {
    getPosts(obj, callback) {
        let sql = `select posts.*,users.nickname,categories.name from posts
        INNER JOIN users on posts.user_id = users.id
        inner join categories on categories.id = posts.category_id where 1=1 
        ${obj && obj.categoriy != 0 ? ` and category_id= '${obj.categoriy}'` : ` `} 
        ${obj && obj.status != 'all' ? ` and posts.status='${obj.status}'` : ` `} 
        order by posts.created DESC `;
        let allLength = 0;
        connection.query(sql, function (err, result) {
            if (err) {
                callback;
            } else {
                // console.log(result.length)
                allLength = result.length;
                if (obj) {
                    sql += ` limit ${(obj.pageNum - 1) * obj.pageSize},${obj.pageSize}`;
                    // console.log(sql)
                }
                connection.query(sql, function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, { arr: result, allLength: allLength })
                    }

                })
            }

        })

    },
    getCategories(callback) {
        let sql = `SELECT * FROM \`categories\``;
        connection.query(sql, (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(null, result)
            }
        })
    },
    addPost(addObj, callback) {
        let sql = `insert into posts set ?`             //?占位符
        connection.query(sql, addObj, (err, result) => {    //传入占位符的对象必须实参的数量以及名字一致,如果是自增的字段也需要给其设置null
            console.log(addObj)
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    },
    editPost(addObj, callback) {
        let sql = `update posts set ? where id = ?`             //?占位符
        connection.query(sql, [addObj, addObj.id], (err, result) => {    //传入占位符的对象必须实参的数量以及名字一致,如果是自增的字段也需要给其设置null
            console.log(addObj)
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    },
    getPostById(id, callback) {
        //传进来的是一个对象
        let sql = `select * from posts where id ='${id.id}'`;
        // select * from posts where id = '1'
        connection.query(sql, (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(null, result[0])
            }
        })
    }
}