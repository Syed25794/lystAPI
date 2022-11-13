const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel
};
