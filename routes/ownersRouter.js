const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model")

if(process.env.NODE_ENV === "development"){
    router.get('/create', async (req, res)=>{
        let owner = await ownerModel.find();
        if (owner.length > 0){
            return res
            .status(504)
            .send("Unauthorized")
        } 

        let {fullname, email, password} = req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        })

        res.status(201).send(createdOwner);
    })
}





router.get('/', (req, res)=>{
    res.send("hi");
})

module.exports = router;
