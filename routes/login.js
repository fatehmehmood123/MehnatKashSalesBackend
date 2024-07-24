const express = require('express');
const router = express.Router();
const User = require("../models/User");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
app.use(express.json());


// app.use(cookieParser());
// app.use(session({
//     secret: 'yourSecretKey',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false } // Use `secure: true` in production with HTTPS
// }));
// app.use(router);




// router.post('/', async (req, res) => {
//     try {
        
//         const user = await User.findOne({ email: req.body.email });
//         // res.status(200).send(user.email);
//         // if(!user){res.status(403).json("The Account with this email does not exist!");}
//         if (user) {
//         const { email, password } = req.body;
//         if (email == user.email && password ==user.password) {
//             req.session.user = { email };
//             res.status(200).send('Login successful');
//         } else {
//             res.status(401).send('Invalid credentials');
//         }  
//     }
//         } catch (err) {
//             res.status(500).json(err);
        

//         }          
//     // const userData = await User.findOne({email: req.body.email});
   
    
// });

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Could not log out");
      }
      res.send("Logout successful");
    });
  });


  module.exports = router

