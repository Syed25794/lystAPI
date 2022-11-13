const mongoose = require("mongoose");

const coatsSchema = new mongoose.Schema({
  coats: Array,
});
const CoatModel = mongoose.model("coats", coatsSchema);

const jacketsSchema = new mongoose.Schema({
  jackets: Array,
});
const JacketModel = mongoose.model("jackets", jacketsSchema);

const dressesSchema = new mongoose.Schema({
  dresses: Array,
});
const DressesModel = mongoose.model("dresses", dressesSchema);

const jeansSchema = new mongoose.Schema({
  jeans: Array,
});
const JeanModel = mongoose.model("jeans", jeansSchema);

const menSchema = new mongoose.Schema({
  mens: Array,
});
const MenModel = new mongoose.model("mens", menSchema);

const cartSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: true },
  price: { type: Number, required: true },
  desc: { type: String, required: true },
  userId: { type: String, required: true },
});
const CartModel = new mongoose.model("cart", cartSchema);
module.exports = {
  CoatModel,
  JacketModel,
  DressesModel,
  JeanModel,
  MenModel,
  CartModel,
};
