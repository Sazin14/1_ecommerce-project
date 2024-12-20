const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function(req,res, next){
    if(!req.cookies.token) {
        req.flash("error", "you aren't logged in.");
        return res.redirect("/");  
    }

    try{
        let decoded = jwt.verify(req.cookie.token, process.env.JWT_KEY);
        let user = await userModel
           .findOne({eamil: decoded.email})
           .select("-password");
        req.user = user;
        next();
    } catch(err){
        req.flash("error", "something went wrong.");
        res.redirect("/");
    }
}