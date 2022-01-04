const jwt = require('jsonwebtoken')
const { secret } = require('../config')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(403).json({message: 'Пользоватеь не авторизован'})
    }
    const decodedData = jwt.verify(token, secret)
    req.user = decodedData
    next()
  } catch (e) {
    console.log('auth middleware error', e.message)
    return res.status(403).json({message: 'Пользоватеь не авторизован'})
  }
}