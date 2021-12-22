const express = require('express')
const router = express.Router()
const { addPosition, getPosition, removePosition } = require('../controllers/positions')
// const uploadMiddleware = require('../middlewares/upload')

// router.post('/add', uploadMiddleware, addPosition)
router.post('/add', addPosition)
router.post('/add', addPosition)
router.get('/getlist', getPosition)
router.delete('/remove', removePosition)
module.exports = router