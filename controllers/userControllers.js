const db = require("../database/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = require("../constants/index").JWT_SECRET;
const Joi = require('joi'); // Import Joi

const registrationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

module.exports.register = async (req, res) => {
  const { username, password } = req.body;

  // Validate the request body against the Joi schema
  const { error } = registrationSchema.validate({ username, password });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const existingUser = await db.user.findOne({ where: { username: username } });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.json({ message: err.message });
      }

      const newUser = await db.user.create({
        username: username,
        password: hash,
      });

      // Create heatmap entries for the next year with activity level 0
      const currentDate = new Date();
      const endDate = new Date();
      endDate.setFullYear(currentDate.getFullYear() + 1);

      const dateActivityData = [];
      while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().split("T")[0];
        dateActivityData.push([dateString, 0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      try {
        await db.heatmap.create({
          userId: newUser.id,
          dateActivity: dateActivityData,
        });
      } catch (err) {
        console.log(err.message);
      }

      res.json({ message: "User created successfully" });
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const user = await db.user.findOne({ where: { username: username } });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const userID = user.id;
      const token = jwt.sign({ userID }, secretKey, { expiresIn: "3d" });
      jwt.verify(token, secretKey, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        console.log(user)
      })
      res.json({ token });
    }
    else {
      res.json({ message: "Incorrect Password" });
    }
  }
  else {
    res.json({ message: "User does not exist" });
  }
}