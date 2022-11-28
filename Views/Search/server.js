const express = require("express")
const router = express.Router()



router.get("/", (req, res)=>{
    res.sendFile(`${__dirname}/index.html`)
})

router.get("/index.css",(req, res)=>{

    res.sendFile(`${__dirname}/index.css`)
})

router.get("/index.js",(req, res)=>{

    res.sendFile(`${__dirname}/index.js`)
})

router.get("/searchicon.png", (req, res) => {
    res.sendFile(`${__dirname}/searchicon.png`)
})

router.get("/commenticon.png", (req, res) => {
    res.sendFile(`${__dirname}/commenticon.png`)
})


module.exports = router