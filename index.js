const express = require("express");
const {connecttomongodb} = require("./connect")
const urlRoute = require("./routes/url")
const URL = require("./models/url")

const app = express();

connecttomongodb("mongodb://localhost:27017/short-url")
.then(()=>console.log("connected to mongodb"))

app.use(express.json())
app.use("/url", urlRoute);


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