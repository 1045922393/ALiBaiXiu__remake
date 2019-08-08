//posts的数据层
//引入mysql的封装连接
const connection = require('./createConnection');


module.exports = {
    getPosts(callback) {
        let sql = `select posts.*,users.nickname,categories.name from posts
        INNER JOIN users on posts.user_id = users.id
        inner join categories on categories.id = posts.category_id
        order by posts.created DESC
        limit 0,5`;
        connection.query(sql, function (err, result) {
            if (err) {
                callback;
            } else {
                callback(err, result)
            }

        })
    }
}