const express = require ("express");
const router = express.Router();

const {handleGeneratenewshorturl,handleGetAnalytics} = require("../controllers/url")

router.post("/",handleGeneratenewshorturl)
router.get("/analytics/:shortId",handleGetAnalytics)

module.exports=router;