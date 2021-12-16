const userModel = require('../models/users')
const { encryption, decrypt } = require('../utils/tools')

// 添加用户
const addUser = async (req, res, next) => {
    res.set('content-type', 'application/json')
    let { username, password } = req.body
    //加密的密码
    password = await encryption(password)
    //查找是否已存在
    const findResult = await userModel.findUser(username)

    if (findResult) {
        //已存在
        res.send({
            code: 0,
            message: '当前用户已存在'
        })
    } else {
        //未存在
        await userModel.addUser({ username, password, createTime: new Date().getTime() })
        res.send({
            code: 1,
            message: '注册成功'
        })
    }

}
// 获取用户列表
const getList = async (req, res, next) => {
    console.log(req);
    res.set('content-type', 'application/json')
    const list = await userModel.getUserList()
    res.send({
        code: 1,
        list
    })
}
// 登录
const login = async (req, res, next) => {
    const { username, password } = req.body
    const findInfo = await userModel.findUser(username)

    if (findInfo) {
        const flag = await decrypt(password, findInfo.password)
        if (flag) {
            //设置cookie
            res.set('Set-Cookie', `username=${username}; Path=/; HttpOnly`)
            //删除cookie
            // res.clearCookie('username')

            res.send({
                code: 1,
                message: `登录成功，欢迎${username}`,
                // loken
            })
        } else {
            res.send({
                code: 0,
                message: '密码错误，请检查当前密码'
            })
        }

    } else {
        res.send({
            code: 0,
            message: '当前用户未注册，请联系管理员'
        })
    }

}
//删除用户
const deleteUser = async (req, res, next) => {
    console.log(req);
    const { id } = req.body
    const result = await userModel.removeUser(id)
    console.log(result);
    if (result) {
        res.send({
            code: 1,
            message: '删除用户成功'
        })
    } else {
        res.send({
            code: 0,
            message: '删除用户失败'
        })
    }
}
//退出登录
const exitLogin = (req, res, next) => {
    res.clearCookie('username')
    res.send({
        code: 1,
        message: '退出登录成功'
    })
}
//检查有没有登录
const isAuth = (req, res, next) => {
    if (req.cookies.username) {
        res.send({
            code: 1,
            message: '当前已登录'
        })
    } else {
        res.send({
            code: 0,
            message: '当前未登录'
        })
    }
}
exports.addUser = addUser
exports.getList = getList
exports.login = login
exports.deleteUser = deleteUser
exports.exitLogin = exitLogin
exports.isAuth = isAuth