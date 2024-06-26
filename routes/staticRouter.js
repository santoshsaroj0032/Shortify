const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
 
// Define the schema for URLs
const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true }
});

// Create a model from the schema
const URL = mongoose.model('URL', urlSchema);

router.get("/", async (req, res) => {
    try {
        // const allUrls = await URL.find({}); // Use URL.find() to get all URLs
        // return res.render("home", { urls: allUrls });
        return res.render("home");
    } catch (error) {
        console.error("Error fetching URLs:", error);
        return res.status(500).send("Error fetching URLs");
    }
});




router.get("/signup",(req,res)=>{  
   return res.render("signup"); 
});

router.get("/login",(req,res)=>{  
    return res.render("login"); 
 });

 
module.exports = router;
 