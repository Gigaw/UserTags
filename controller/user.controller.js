const db = require('../db')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')

class UserController {
  async getUsers(req, res) {
    const users = await db.query('SELECT * FROM users')
    res.json(users.rows)
  }

  async getOneUser(req, res) {
    const id = req.params.id
    const query = 'SELECT * FROM users where id = $1'
    const user = await db.query(query, [id])
    res.json(user.rows[0])
  }

  async updateUser(req, res) {
    const {id, nickname, password, email} = req.body
    const query = 'UPDATE users set nickname = $1 where id = $2 RETURNING *'
    const user = await db.query(query, [nickname, id ])
    res.json(user.rows[0])
  }

  async deleteUser(req, res) {
    const id = req.params.id
    const query = 'DELETE FROM users where id = $1'
    const user = await db.query(query, [id])
    res.json(user.rows)
  }
}

module.exports = new UserController()