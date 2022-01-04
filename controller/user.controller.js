const db = require('../db')

class UserController {
  async createUser(req, res) {
    const {email, nickname, password} = req.body
    const query = 'INSERT INTO users (email, password, nickname) values ($1, $2, $3) RETURNING *'
    const newUser = await db.query(query, [email, password, nickname])
    res.json(newUser.rows[0])
  }

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