const db = require('../db')

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
    try {
      const id = req.params.id
      const user = req.user;
      if (user !== id) {
        res.status(403).json({message: 'you have no rights'}) 
      }
      const query = 'DELETE FROM users where id = $1'
      await db.query(query, [id])
      res.json({message: 'user deleted'})
    } catch (e) {
      console.log('deleteUserError', e.message);
      res.status(500).json({success: false, message: 'server error'});
    }
  }
}

module.exports = new UserController()