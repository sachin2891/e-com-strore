// console.log("hello sachin");
const express = require("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
// const stripeRoute = require("./routes/stripe");

const cors = require('cors');



mongoose.
    connect(process.env.MONGO_URL)
    .then(() => console.log("DB connected  successfully !"))
    .catch((err) => {
        console.log(err);
    });

//here is the thing you should check before doing anything//

app.use(cors());
// app.use(function (req, res, next) {
//     //Enabling CORS
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept, x - client - key, x - client - token, x - client - secret, Authorization");
//     next();
// });
app.use(express.json());
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/carts", cartRoute)
app.use("/api/orders", orderRoute)
// app.use("/api/checkout", stripeRoute);


app.listen(process.env.PORT || 5000, () => {
    console.log("server is running!");
});