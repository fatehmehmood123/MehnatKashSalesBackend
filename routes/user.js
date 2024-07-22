const express = require('express');
const router = express.Router();
const User = require("../models/User");
  
  // Set up a route in the Express application to handle GET requests to "/getUsers"
  router.get("/", async (req, res) => {
    // Await fetching all user data from the database using the UserModel
    const userData = await User.find();
    // Send the user data as a JSON response
    res.json(userData);
  });
  module.exports = router

