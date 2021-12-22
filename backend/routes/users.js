const express = require('express')
const { auth } = require('../middlewares/auth')
const router = express.Router() 
const { addUser, getList, login, deleteUser, exitLogin, isAuth } = require('../controllers/users')


router.post('/adduser', auth, addUser)
router.get('/getlist', auth, getList)
router.post('/login', login)
router.delete('/delete', auth, deleteUser)
router.get('/exitlogin', auth, exitLogin)
router.get('/isauth', isAuth)


module.exports = router;
