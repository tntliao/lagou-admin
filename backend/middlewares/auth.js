const { public } = require('../utils/tools')

const auth = (req, res, next) => {
    const token = req.headers.token || ''
    const result = public(token)

    if (result.username) {
        next()
    } else {
        res.send({
            code: 0,
            message: '当前还未登录'
        })
    }
}

exports.auth = auth