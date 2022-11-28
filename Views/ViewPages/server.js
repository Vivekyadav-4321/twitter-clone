const express = require("express");
const router = express.Router()

router.get("/",(req, res)=>{

res.sendFile(`${__dirname}/homepage.html`)
})



router.get("/posts/c/:category",(req, res)=>{

    res.sendFile(`${__dirname}/categorypage.html`)
    })
    
router.get("/posts/c/:category/t/:tag", (req, res)=>{
        res.sendFile(`${__dirname}/tagspage.html`)
    })


router.get("/index.css",(req, res)=>{
    res.sendFile(`${__dirname}/index.css`)
})

router.get("/index.js",(req, res)=>{
    res.sendFile(`${__dirname}/index.js`)
})

router.get("/logo.png",(req, res)=>[
    res.sendFile(`${__dirname}/logo.png`)
])


























module.exports = router