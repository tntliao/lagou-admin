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


//加密
const private = (username) => {
    const privateKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_private_key.pem'))
    const token = jwt.sign({ username }, privateKey, { algorithm: 'HS256' })
    console.log(token)
    return token
}

// 解密
const public = (token) => {
    if (token) {
        const publicKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_private_key.pem'))
        const result = jwt.verify(token, publicKey)
        return result
    } else {
        return { username: '' }
    }

}

exports.encryption = encryption
exports.decrypt = decrypt
exports.private = private
exports.public = public