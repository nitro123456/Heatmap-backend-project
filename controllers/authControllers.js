const jwt = require("jsonwebtoken");
const secretKey = require("../constants/index").JWT_SECRET;


module.exports.authenticateToken = (req, res, next)=> {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, secretKey, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      console.log(user)
      req.user = user
      next()
    })
};

