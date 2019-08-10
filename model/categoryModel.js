const connection = require('./createConnection')
module.exports = {
    submitCate(saveObj, callback) {
        let sql;
        if (saveObj.id) {
            sql = `update categories set ? where id = '${saveObj.id}'`
        } else {
            sql = `insert into categories set ?`
        }
        connection.query(sql, saveObj, (err, result) => {
            if (err) {
                callback(err)
            } else {
                //查询提交后的数据,主要获取id
                let sql2 = `select * from categories where name = '${saveObj.name}'`;
                connection.query(sql2, (err, result2) => {
                    callback(null, result2[0]);
                })

            }
        })
    }
}