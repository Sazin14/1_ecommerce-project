const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateToken} = require("../utils/generateToken");
const productModel = require("../models/product-model")

module.exports.registerUser = async (req, res)=>{
    try {
    let {fullname, password, email} = req.body;

    let user = await userModel.findOne({email: email});
    if (user)
        return res.status(401).send("user already exists.");

    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(password, salt, async (err, hash)=>{
           if(err) return res.send(err.message);
           else {
            let user = await userModel.create({
                fullname,
                email, 
                password: hash,
              });
            let token = generateToken(user);
            res.cookie("token", token);
            res.send("user created");           
           } 
        })
    })
    } catch(err) {
        console.log(err.message)
    }
}

module.exports.loginUser = async function (req, res){
    let {email, password} = req.body;

    let user = await userModel.findOne({ email: email});
    if (!user) 
        return res.send("Email or password is incorrect");
    
    bcrypt.compare(password, user.password,async function (err, result){
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            let products = await productModel.find();
            res.render("shop", {products});
        }
        else {
            return res.send("Email or password is incorrect"); 
        }
    })

}

module.exports.logout = function (req, res){
    res.cookie("token", "");
    res.redirect("/");
}