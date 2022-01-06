const db = require('../db')
const {validationResult} = require('express-validator')

class TagController {
  async createTag(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({message: 'Ошибка при создании тега', errors: errors.errors})
      }
      const {name} = req.body
      const {id}  = req.user
      const query = 'INSERT INTO tags (name, creator, sortorder) values ($1, $2, $3) RETURNING *'
      const tag = await db.query(query, [name, id, 0])
      res.json(tag.rows[0])
    } catch (e) {
      console.log('create tag error', e.message)
      res.status(400).json({message: e.message})
    }
    
  }

  // Пока нет смысла
  // async getTag(req, res) {
  // }

  async getTags(req, res) {
    try {
      const {id} = req.user
      const query = 'SELECT * FROM tags WHERE creator = $1'
      const tags = await db.query(query, [id])
      res.json(tags.rows)
    } catch (e) {
      console.log('get tags error', e.message)
      res.status(400).json({message: e.message})
    }
  }

  async deleteTag(req, res) {
    try {
      const id = req.params.id
      const query = 'DELETE FROM tags WHERE id = $1'
      const tags = await db.query(query, [id])
      res.json(tags.rows)
    } catch (e) {
      console.log('get tags error', e.message)
      res.status(400).json({message: e.message})
    }
  }
  
  // Пока нет смысла
  // async updateTag(req, res) {
  // }
}

module.exports = new TagController()