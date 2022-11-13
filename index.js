const express = require("express");

const app = express();
const cors = require("cors");


const userController = require("./routes/user.routes");
const productController= require("./routes/product.routes");
const {connection} = require("./config/db")
require("dotenv").config()


app.use(cors());
app.use(express.json());



const PORT = process.env.PORT || 7000

app.use("/product", productController)

app.use("/user", userController);

app.get("/",(req,res)=>{
  res.send("Welcome to Home page.");
});


app.listen(PORT, async () => {

  try {
    await connection();
    console.log("Connected to db");
  } catch (err) {
    console.log("Error connnecting to DB");
    console.log(err);
  }
  console.log(`listening on PORT ${PORT}`);
});

