const auth = (req, res, next) => {
    if (req.cookies.username) {
        next()
    } else {
        res.send({
            code: 0,
            message: '当前还未登录'
        })
    }
}

exports.auth = auth