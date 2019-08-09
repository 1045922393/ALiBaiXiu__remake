const formidable = require('formidable')
const path = require('path')
module.exports = {
    uploadsFeature(req, res) {
        let formid = new formidable.IncomingForm()  //创建对象
        formid.encoding = 'utf-8';               //设置键值对格式
        formid.uploadDir = './uploads';               //设置保存路径
        formid.keepExtensions = true;
        formid.parse(req, (err, fields, files) => {
            // console.log(files)
            if (err) {
                res.json({ code: 400, msg: '上传失败' })
            } else {
                let pathdata = path.basename(files.feature.path)//将路径返回
                res.json({
                    code: 200,
                    msg: '上传成功',
                    data: pathdata
                })
            }
        })
    }
}