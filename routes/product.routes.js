const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");

const authentication = require("../middlewares/authentication");

const {
  CoatModel,
  JacketModel,
  JeanModel,
  DressesModel,
  MenModel,
  CartModel,
} = require("../model/product.model");
const productController = Router();
productController.use(cors());

productController.get("/coats", async (req, res) => {
  console.log(req.body.userId);
  const coats = await CoatModel.find();
  console.log(coats);
  res.send(coats);
});
productController.get("/jackets", async (req, res) => {
  console.log(req.body.userId);
  const jackets = await JacketModel.find();
  console.log(jackets);
  res.send(jackets);
});
productController.get("/jeans", async (req, res) => {
  console.log(req.body.userId);
  const jeans = await JeanModel.find();
  console.log(jeans);
  res.send(jeans);
});
productController.get("/dresses", async (req, res) => {
  console.log(req.body.userId);
  const dresses = await DressesModel.find();
  console.log(dresses);
  res.send(dresses);
});

productController.get("/mens", async (req, res) => {
  console.log(req.body.userId);
  const mens = await MenModel.find();
  console.log(mens);
  res.send(mens);
});

productController.get("/cart", authentication, async (req, res) => {
  const Cartprod = await CartModel.find({ userId: req.body.userId });
  console.log(Cartprod);
  res.send(Cartprod);
});
productController.post("/addcart", authentication, async (req, res) => {
  const Cartprod = new CartModel(req.body);
  console.log(Cartprod);
  try {
    await Cartprod.save();
    res.send("pr");
  } catch (err) {
    res.send("something went wrong");
  }
});
module.exports = {
  productController,
};

productController.get("/cart", authentication, async (req, res) => {
  const Cartprod = await CartModel.find({ userId: req.body.userId });
  console.log(Cartprod);
  res.send(Cartprod);
});
productController.post("/addcart", authentication, async (req, res) => {
  const Cartprod = new CartModel(req.body);
  console.log(Cartprod);
  try {
    await Cartprod.save();
    res.send("pr");
  } catch (err) {
    console.log("something went wrong");
    res.redirect("/product/cart");
  }
});

module.exports = productController;

