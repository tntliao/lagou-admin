const multer = require('multer')
const path = require('path')
const mime = require('mime')
let filename = ''

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads'))
    },
    filename: function (req, file, cb) {
        let extName = mime.getExtension(file.mimetype)
        filename = file.fieldname + '-' + Date.now() + '.' + extName
        cb(null, filename)
    }
})

const limits = {
    fileSize: 200000,
    files: 1
}

const fileFilter = (req, file, cb) => {
    const acceptType = [
        'image/png',
        'image/jpg',
        'image/jpeg',
        'image/gif'
    ]
    const flag = acceptType.includes(file.mimetype)

    if (flag) {
        cb(null, true) //上传文件
    } else {
        cb(new Error('文件类型不正确')) //不上传文件
    }
}
const upload = multer({
    storage,
    limits,
    fileFilter
}).single('companyLogo')

const uploadMiddleware = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.send({
                code: 0,
                message: '文件体积太大'
            })
            return
        } else if (err) {
            res.send({
                code: 0,
                message: err.message
            })
            return
        } else {
            req.companyLogo = filename
            next()
            /* res.send({
                code: 1,
                message: '文件上传成功'
            }) */
        }
    })
}



module.exports = uploadMiddleware  