const { Users } = require('../utils/db')
//添加用户
const addUser = ({ username, password, createTime }) => {
    const users = new Users({
        username,
        password,
        createTime
    })
    //save已经保存到数据库返回出去的是一个promise对象
    return users.save()
}
//查询用户 || 登录
const findUser = (username) => {
    return Users.findOne({ username })
}
//获取所有用户列表
const getUserList = () => {
    return Users.find({})
}
//删除用户
const removeUser = (id) => {
    return Users.deleteOne({ id })
}

exports.addUser = addUser
exports.findUser = findUser
exports.getUserList = getUserList
exports.removeUser = removeUser