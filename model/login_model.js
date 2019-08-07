const mysql = require('mysql');
let connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'albx',
    dateStrings: true
});

module.exports = {
    checkLogin(checkEmail, callback) {
        let sql = `select * from users where email ='${checkEmail}'`;
        connection.query(sql, (err, result) => {
            if (err) {
                callback(err)
            }
            // console.log(result)
            callback(null, result[0]);
        })
    }
}