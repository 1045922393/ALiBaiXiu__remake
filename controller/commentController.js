const commentModel = require('../model/commentModel')

module.exports = {
    getAllComments(req, res) {
        commentModel.getAllComments((err, result) => {
            if (err) {
                res.json({ code: 400, msg: '获取评论失败' })
            } else {
                res.json({ code: 200, msg: '获取评论成功', data: result })
            }
        })
    },
    getPageComments(req, res) {
        let option = req.query;
        commentModel.getPageComments(option, (err, result) => {
            if (err) {
                res.json({ code: 400, msg: '获取评论失败' })
            } else {
                res.json({ code: 200, msg: '获取评论成功', data: result })
            }
        })
    }
}