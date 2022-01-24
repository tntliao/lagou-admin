const express = require('express')
const router = express.Router()
const { addPosition, getPosition, removePosition } = require('../controllers/positions')
const uploadMiddleware = require('../middlewares/upload')

router.post('/add', uploadMiddleware, addPosition)
// router.post('/add', addPosition)
router.get('/getlist', getPosition)
router.delete('/remove', removePosition)
router.post('/upload', uploadMiddleware, (req, res, next) => {
    res.send({
        code: 1,
        message: '上传文件成功'
    })
})
module.exports = router