const Router = require('express')
const userController = require('../controller/user.controller')
const router = new Router()
const {check, body} = require('express-validator')
const authMiddleware = require('../middleware/auth.middleware')

router.get('/user', userController.getUsers)
router.get('/user/:id', userController.getOneUser)
router.put('/user', authMiddleware, userController.updateUser)
router.delete('/user/:id', authMiddleware, userController.deleteUser)

module.exports = router