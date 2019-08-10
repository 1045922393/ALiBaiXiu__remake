const categoryModel = require('../model/categoryModel')

module.exports = {
    submitCate(req, res) {
        // console.log(req.query);
        // res.send()
        let saveObj = req.query;
        console.log(saveObj)
        if (!saveObj.id) {
            saveObj.id = null;
        }
        categoryModel.submitCate(saveObj, (err, result) => {
            if (err) {
                res.json({ code: 400, msg: "提交分类错误" })
            } else {
                res.json({ code: 200, msg: "提交分类成功", data: result })
            }
        })
    }
}