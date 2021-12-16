const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/lagou-admin')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    createTime: String
})
// 第二个users是 创建集合 的名字
const Users = mongoose.model('users', userSchema)
exports.Users = Users