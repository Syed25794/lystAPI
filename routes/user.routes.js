const {Router} = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { UserModel } = require("../model/user.model");
const cors = require("cors");
const userController = Router();
const authenticate = require("./../middlewares/authentication");

const passport = require("./../middlewares/google.Oauth");

userController.use(cors());

userController.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const result = await UserModel.findOne({ email });
  if (result) {
    res.status(404).send({"msg":"User found in database.Try to login."});
  } else {
    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) {
        res.status(502).send({"msg":"something went wrong in encrypting password. Please try again later to singup."});
      }
      try {
        const user = new UserModel({
          email,
          password: hash,
        });
        await user.save();
        const token = jwt.sign({ userId: user._id }, "secret");
        res.status(200).send({"msg":token});
      } catch (err) {
        res.status(502).send({"msg":"something went wrong in storing user in database.Please try again."});
      }
    });
  }
});

userController.post("/login", async (req, res) => {
  if (req.headers.authorization == undefined || req.headers.authorization == null) {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      const hash = user.password;
      bcrypt.compare(password, hash, function (err, result) {
        if (err) {
          res.status(502).send({"msg":"Something went wrong, plz try again later login"});
        }
        if (result) {
          const token = jwt.sign({ userId: user._id }, "secret");
          res.status(200).send({"msg":token});
        } else {
          res.status(502).send({"msg":"Something went wrong, plz try again later login"});
        }
      });
    } catch (e) {
      res.status(400).send({"msg":"invalid credentials, plz signup if you haven't"});
    }  
  } else {
    const token = req.headers.authorization;
    jwt.verify(token, "secret", function (err, decoded) {
      console.log(req.headers.authorization);
      if (err) {
        res.status(502).send({msg: "something went wrong in verifying token. please try again login."});
      } else {
        req.body.userId = decoded.userId;
        res.status(200).send({"msg":token});
      }
    });
  }
});

userController.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userController.get("/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/user/login",
    session: false,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.status(200).send({"msg":"login successfully"});
  }
);

module.exports=userController;
