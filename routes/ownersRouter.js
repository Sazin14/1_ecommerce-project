const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model")






router.get('/', (req, res)=>{
   
    res.send("hi");
})


router.get('/admin', (req, res)=>{
    let success = req.flash("success");
    res.render("createproducts", {success});
})



router.get('/create', async (req, res) => {
    if (process.env.NODE_ENV !== "development") {
        return res.status(403).send("Forbidden in non-development environments");
    }

    let owner = await ownerModel.find();
    if (owner.length > 0) {
        return res.status(504).send("Unauthorized");
    }

    let { fullname, email, password } = req.body;
    let createdOwner = await ownerModel.create({
        fullname,
        email,
        password,
    });

    res.status(201).send(createdOwner);
});




module.exports = router;
