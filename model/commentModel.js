const connection = require('./createConnection')
module.exports = {
    getAllComments(callback) {
        let sql = `SELECT comments.*,posts.title FROM \`comments\`
        join posts on posts.id = comments.post_id`;
        connection.query(sql, (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(null, result)
            }
        })
    },
    getPageComments(option, callback) {
        let sql = `SELECT comments.*,posts.title FROM \`comments\`
        join posts on posts.id = comments.post_id
        limit ${(option.currentPageNum - 1) * option.showNum},${option.showNum}`;
        connection.query(sql, (err, result) => {
            if (err) {
                callback(err)
            } else {
                console.log(result)
                callback(null, result)
            }
        })
    }

}