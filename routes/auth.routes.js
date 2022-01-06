const Router = require('express')
const authController = require('../controller/auth.controller')
const router = new Router()
const {check, body} = require('express-validator')

router.post('/registration', [
  check('email', 'Некорректный email').isEmail().normalizeEmail(),
  check('nickname', 'Некорректный nickname').not().isEmpty().trim().escape(),
  check('password', 'Пороль должен быть длинной от 6 до 10 символов').isLength({min: 6, max: 10}) ,
], authController.registration)
router.post('/login', [
  check('email', 'Некорректный email').isEmail().normalizeEmail(),
  check('password', 'Пороль должен быть длинной от 6 до 10 символов').isLength({min: 6, max: 10}) ,
], authController.login)

module.exports = router