//posts那边的逻辑代码在这文件下
//引入postsModel
const postsModel = require('../model/postsModel')
module.exports = {
    getPosts(req, res) {
        // console.log(req.query)
        postsModel.getPosts(req.query, (err, result) => {
            if (err) {
                res.json({ code: 404, msg: '查询错误' })
            } else {
                // console.log(result);
                res.json({ code: 200, msg: '查询成功', data: result })
            }
        })

    },
    getAllPosts(req, res) {
        // console.log(req.query)
        postsModel.getPosts(null, (err, result) => {
            if (err) {
                res.json({ code: 404, msg: '查询错误' })
            } else {
                // console.log(result);
                res.json({ code: 200, msg: '查询成功', data: result })
                //获得发表的总数量
            }
        })

    },
    getPostsCate(req, res) {
        postsModel.getCategories((err, arr) => {
            if (err) {
                res.json({ code: 404, msg: '获得分类失败' })
            } else {
                res.json({ code: 200, msg: '获得分类成功', data: arr })
            }
        })
    },
    addPost(req, res) {
        // console.log(req.body);
        // console.log(req.session)
        let addObj = req.body;
        addObj.views = 0;
        addObj.likes = 0;
        addObj.id = null;
        addObj.user_id = req.session.currentUser.id;
        // console.log(addObj)
        postsModel.addPost(addObj, (err) => {
            if (err) {
                res.json({ code: 400, msg: '添加错误' })
            } else {
                res.json({ code: 200, msg: '添加成功' })
            }
        })
    }
}