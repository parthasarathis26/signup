const express=require('express');
const mongoose=require("mongoose");
const path =require('path');
const hbs=require('hbs');
const app=express();
const bcrypt=require('bcrypt');
const session = require('express-session');
const collection=require("./mongodb")


const templatePath=path.join(__dirname,'../templates');
app.use(express.json());
app.set("view engine","hbs");
app.set("views",templatePath);
app.use(express.urlencoded({extended:false}));
const location=path.join(__dirname,'../public');
app.use(express.static(location));

app.get("/login",(req,res)=>{
    //res.send("<h1>hello</h1>");
    res.render('login');
});
app.get("/",(req,res)=>{
    res.render('signup');
});
app.get("/home",(req,res)=>{
    res.render('home');
});
let check="";
app.post("/",async (req,res)=>{
    const data={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    confirmpassword=req.body.confirm_password;
    const existingUser=await collection.findOne({name: data.name});
    if(confirmpassword!==data.password){
        res.send("Password does not match");
    }
    if(existingUser){
        res.send("User already exist");
    }
    else{
        await collection.insertMany([data])
        res.render('signup');
    }
})

app.post("/login", async (req, res) => {
    try {
        check = await collection.findOne({ name: req.body.name });
        if (!check) {
            res.send("User name not found");
        } else if (check.password === req.body.password) {
            res.render('home');
        } else {
            res.send("Wrong password");
        }
    } catch (error) {
        res.send("Error occurred");
    }
});
app.get("/profile", (req, res) => {
    if (check) {
        res.render('profile', { msg: check });
    } else {
        res.redirect('/login');
    }
});
app.get("/logout", (req, res) => {
        res.redirect('/login');
});


app.listen(5000,()=>{
    console.log("Server started");
});
