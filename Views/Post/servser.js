const express = require("express")
const router = express.Router()

router.get("/:postid", (erq, res) => {

    res.sendFile(`${__dirname}/index.html`)

})

router.get("/index.css", (req, res) => {
    
    res.sendFile(`${__dirname}/index.css`)

})

router.get("/index.js", (req, res) => {

    res.sendFile(`${__dirname}/index.js`)

})




module.exports = router