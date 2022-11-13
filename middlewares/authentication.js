const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");
require("dotenv").config();

const authentication = async(req, res, next) => {
  if (req.headers.authorization == undefined || req.headers.authorization == null) {
    res.status(400).send({"msg":"didn't find token please login first"});
  } else {
    const token = req.headers.authorization;
    jwt.verify(token, "secret", function (err, decoded) {
      console.log(req.headers.authorization);
      if (err) {
        res.status(502).send({msg: "something went wrong in verifying token. please try again login."});
      } else {
        req.body.userId = decoded.userId;
        req.headers.authentication=token;
        res.headers.authentication=token;
        next();
      }
    });
  }
};

module.exports = authentication;
