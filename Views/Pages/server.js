const express = require("express")
const router = express.Router()

router.get("/contact", (req, res) => {

    res.sendFile(`${__dirname}/contact.html`)

})

router.get("/about", (req, res) => {

    res.sendFile(`${__dirname}/about.html`)

})

router.get("/disclamer", (req, res) => {

    res.sendFile(`${__dirname}/disclamer.html`)

})


router.get("/privacy", (req, res) => {

    res.sendFile(`${__dirname}/privacyplicay.html`)

})

router.get("/terms", (req, res) => {
    res.sendFile(`${__dirname}/termsandconditons.html`)
})


router.get("/home", (req, res) => {
    res.redirect("")
})


router.get("/logo.png",(req, res)=>[
    res.sendFile(`${__dirname}/logo.png`)
])






module.exports = router