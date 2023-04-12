const express = require('express')
const router = express.Router()

const userController = require('../app/controllers/userController')

router.get('/login', userController.login)
router.get('/signup', userController.signup)
router.post('/store', userController.store)
router.post('/signin', userController.signin)
router.get('/logout', userController.logout)



module.exports = router