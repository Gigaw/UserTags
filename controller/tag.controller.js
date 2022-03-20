const db = require("../db");
const { validationResult } = require("express-validator");

class TagController {
  async createTag(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при создании тега", errors: errors.errors });
      }
      const { name } = req.body;
      const { id } = req.user;
      const query =
        "INSERT INTO tags (name, creator, sortorder) values ($1, $2, $3) RETURNING *";
      const query2 = "INSERT INTO user_tags (user_id, tag_id) values ($1, $2)";
      const { rows } = await db.query(query, [name, id, 0]);
      const tag = rows[0];
      const userTagsResponse = await db.query(query2, [id, tag.id]);
      const userTags = userTagsResponse.rows;
      res.json(userTags && tag);
    } catch (e) {
      console.log("create tag error", e.message);
      res.status(500).json({ message: "server error" });
    }
  }

  async getTags(req, res) {
    try {
      const { id } = req.user;
      const query = "SELECT * FROM tags WHERE creator = $1";
      const tags = await db.query(query, [id]);
      res.json(tags.rows);
    } catch (e) {
      console.log("get tags error", e.message);
      res.status(500).json({ message: "server error" });
    }
  }

  async getUserTags(req, res) {
    try {
      const { id } = req.user;

      // SELECT
      //     ut.*,
      //     t1.name AS home_team_name,
      //     t2.name AS guest_team_name
      // FROM
      //     user_tags AS ut
      //     INNER JOIN user AS u ON ut.user_id = u.id
      //     INNER JOIN tag AS t ON ut.tag_id = t.id;

      const query = "";
    } catch (e) {
      console.log("get user tags error", e.message);
      res.status(500).json({ message: "server error" });
    }
  }

  async deleteTag(req, res) {
    try {
      const id = req.params.id;
      const query = "DELETE FROM tags WHERE id = $1";
      const tags = await db.query(query, [id]);
      res.json(tags.rows);
    } catch (e) {
      console.log("get tags error", e.message);
      res.status(400).json({ message: e.message });
    }
  }
}

module.exports = new TagController();
