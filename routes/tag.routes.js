const Router = require('express')
const tagController = require('../controller/tag.controller')
const router = new Router()
const {check, body} = require('express-validator')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/tag', [
  authMiddleware,
  check('name', 'Поле name не должно быть пустым').isLength({min: 1})
], tagController.createTag)
router.get('/tag', authMiddleware, tagController.getTags)
router.delete('/tag/:id', authMiddleware, tagController.deleteTag)

module.exports = router