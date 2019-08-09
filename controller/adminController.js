const loginModel = require('../model/login_model')
module.exports = {
    checkLogin(req, res) {
        // console.log(req.body)
        let getObj = req.body;
        //去数据库拿数据,对比获得来的数据以及密码
        loginModel.checkLogin(getObj.email, (err, result) => {
            if (err) {
                res.send({ code: 304, msg: '查询错误' }) //这是数据库查询错误
                return;
            }
            //根据数据库返回的结果进行判断  
            if (!result) {
                //如果result为undefined, 那么表示并没有这邮箱,返回浏览器相对应信息
                res.json({ code: 304, msg: '邮箱不存在' });
            } else {
                //邮箱存在,则判断数据库的密码和获得来的密码是否一致
                if (result.password == getObj.password) {
                    //状态保持
                    req.session.isLogin = 'true'
                    //密码一致,返回验证成功信息
                    req.session.currentUser = result;
                    //将此用户保存再session中
                    res.json({ code: 200, msg: '登陆成功' });
                } else {
                    //密码不一致,返回错误信息
                    res.json({ code: 304, msg: '密码错误' })
                }
            }
        });
        // res.send()
    }
}