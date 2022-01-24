const fs = require('fs')
const path = require('path')
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    fs.readdir(path.join(__dirname, '../public/uploads'), (err, file) => {
        if (err) throw err
        const imgList = file.map((item, index) => {
            let stat = fs.statSync(path.join(__dirname, '../public/uploads', item));
            return {
                id: index,
                name: item,
                ctime: stat.ctime,
                url: `http://tntliao.cn/uploads/${item}`
            }
        })
        res.send(imgList)
    })
})

module.exports = router