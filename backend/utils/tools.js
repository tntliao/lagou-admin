const bcrypt = require('bcrypt')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

// 加密
const encryption = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                reject(err)
            } else {
                resolve(hash)
            }
        })
    })
}

// 判断两个密码是否一致
const decrypt = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}


/* 私钥生成公钥 */
// 私钥
const private = (username) => {
    const privateKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_private_key.pem'))
    const token = jwt.sign({ username }, privateKey, { algorithm: 'RS256' })
    console.log(token)
    return token
}

// 公钥
const public = (token) => {
    const publicKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_public_key.pem'))
    const result = jwt.verify(token, publicKey)
    return result
}
private('asdasdsad')

exports.encryption = encryption
exports.decrypt = decrypt
exports.private = private
exports.public = public