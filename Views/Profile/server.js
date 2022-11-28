const express = require("express")
const router = express.Router()

router.get("/",(req, res)=>{
res.render("profile/viewprofile.hbs",{})
})



module.exports = router