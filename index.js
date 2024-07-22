const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config()

app.use("/getUsers", userRoute);

const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL).then(()=>{
    console.log('Database Connected');
    app.listen(PORT, ()=>{
        console.log(`Server is running on http://localhost:${PORT}`);
    })
}).catch((error)=>{console.log(error)})

