import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoute from './routes/auth.js'; 
import adminRoute from './routes/admin.js';
import studentRoute from './routes/student.js';

const app= express();
dotenv.config();
const port= 5000;

app.use(bodyParser.json({limit: '30mb',  extended: true}));
app.use(bodyParser.urlencoded( {limit: '30mb', extended: true}))
app.use(cors());

// mongoDB connection:-
const CONNECTION_URL= process.env.CONNECTION_URL;
mongoose.set("strictQuery" , false);
mongoose.connect(CONNECTION_URL)
    .then(()=>{
        console.log("Connected to the database");
    })
    .catch((err)=>{
        console.log(err);
    })

app.get("/",  (req, res)=>{
    res.send("Hello World");
})
app.use("/student", studentRoute);
app.use("/auth", authRoute);
app.use("/admin", adminRoute);

app.listen(port, (req, res)=>{
    console.log(`Server is listening at port ${port}`);
})
