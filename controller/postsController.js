//posts那边的逻辑代码在这文件下
//引入postsModel
const postsModel = require('../model/postsModel')
module.exports = {
    getPosts(req, res) {
        postsModel.getPosts((err, result) => {
            if (err) {
                res.json({ code: 404, msg: '查询错误' })
            } else {
                // console.log(result);
                res.json({ code: 200, msg: '查询成功', data: result })
            }
        })
    }
}