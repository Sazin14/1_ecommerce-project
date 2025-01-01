const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", (req, res)=>{
    let error = req.flash("error");
    res.render("index", {error, loggedin:false});
})

router.get("/shop", isLoggedIn, async (req, res)=>{
    let products = await productModel.find();
    if (products){
    console.log("ok")
    } else{
        console.log("not ok")
    }
    let success = req.flash("success");
    res.render("shop", {products, success});
})

router.get("/addtocart/:product_id", isLoggedIn, async (req, res)=>{
    let user = await userModel.findOne({eamil: req.user.email});
    user.cart.push(req.params.product_id);
    await user.save();
    req.flash("success", "Added to cart")
    res.redirect("/shop");
})

router.get("/cart", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email}).populate("cart");
    res.render("cart",{user});
})


module.exports = router;