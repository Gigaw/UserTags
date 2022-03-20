const db = require("../db");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("./../config");

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  // console.log("payload", payload);
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors: errors.errors });
      }
      const { email, nickname, password } = req.body;
      const oldUser = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      if (oldUser.rows[0]) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким email уже существует" });
      }
      const hashPassword = await bcrypt.hash(password, 7);
      const query =
        "INSERT INTO users (email, password, nickname) values ($1, $2, $3) RETURNING *";
      const newUser = await db.query(query, [email, hashPassword, nickname]);
      return res.json(newUser.rows[0]);
    } catch (e) {
      console.log("registration error", e.message);
      return res.status(400).json({ message: e.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      const user = rows[0];
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Неверный пароль" });
      }
      const token = generateAccessToken(user.id);
      return res.json({ token });
    } catch (e) {
      console.log("login error", e.message);
      return res.status(500).json({ message: e.message });
    }
  }
}
module.exports = new AuthController();
