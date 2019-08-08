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

        // connection.query(sql, function (err, result) {
        //     if (err) {
        //         callback;
        //     } else {
        //         console.log(result.length)
        //     }

        // })
        if (obj) {
            sql += ` limit ${(obj.pageNum - 1) * obj.pageSize},${obj.pageSize}`;
            // console.log(sql)
        }
        connection.query(sql, function (err, result) {
            if (err) {
                callback;
            } else {
                callback(err, result)
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
    }
}