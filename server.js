//require express , mongoose
const express = require('express');
const mongoose =require('mongoose');

//invoke express
 const app = express();
 //create port 
 const port = 5000;

// connexion database with server
const mongo_uri="mongodb+srv://rawdha123456:rawdha123456@cluster0.6wk0e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(mongo_uri,{useUnifiedTopology: true , useNewUrlParser: true}, (err)=>{
    err ? console.log(err) : console.log("database was connected successfully");
})

// parse data to json object
app.use(express.json());
// import person 
app.use('/person', require('./Routes/Person'));




 // listen on port 5000
 app.listen(port ,(err) => {
     err ? console.log(err) : console.log("running server on  port 5000.....");
 })
