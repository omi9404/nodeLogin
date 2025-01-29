const express = require('express');
const mysql = require("mysql");
const path = require("path");
const app = express();
const dotenv = require("dotenv");

dotenv.config({ path: './.env'});

//Create Database Connection
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));


app.use(express.urlencoded({ extended:false }));
app.use(express.json());

//Set view engine
app.set('view engine','hbs');
//Need to connect it
db.connect( (error)=> {
    if(error){
        console.log("Database Error " + error);
    }else{
        console.log("Mysql Database is connected.");
    }
});


//Define Routes
app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));

app.listen(5001,()=>{
    console.log("Server Started on 5001 port");
}); 