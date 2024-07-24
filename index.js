const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const loginRoute = require("./routes/login");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const ensureLoggedIn = require('./middlewares/login')
const User = require("./models/User");
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Use `secure: true` in production with HTTPS
  })
);

//Routes
app.use("/", loginRoute);
app.use("/getUsers", ensureLoggedIn, userRoute);
//Login Router
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // res.status(200).send(user.email);
    // if(!user){res.status(403).json("The Account with this email does not exist!");}
    const { email, password } = req.body;
    if (password == user.password) {
      req.session.user = { email };
      res.status(200).send("Login successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


//Database connection
const MONGO_URL = process.env.MONGO_URL;
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log(error);
  });


//Express server listen  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
