const express = require("express");
const {connecttomongodb} = require("./connect")
const urlRoute = require("./routes/url")
const staticRoute = require("./routes/static-router")
const URL = require("./models/url")
const path = require("path")

const app = express();

connecttomongodb("mongodb://localhost:27017/short-url")
.then(()=>console.log("connected to mongodb"))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/url", urlRoute);
app.use("/",staticRoute)

app.get("/test",async(req,res)=>{
    const allUrls = await URL.find({})
    return res.render("home",{
        urls: allUrls,
    })
})


app.get("/:shortId",async(req,res)=>{
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate(
        {
        shortId,
    },{
        $push:{visitHistory:{timestamp: Date.now()}}
    })
    res.redirect(entry.redirectURL)
})

app.listen(8000, ()=>{
    console.log("server is running on port 8000")
})