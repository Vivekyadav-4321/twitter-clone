const express = require("express")
const router = express.Router()
const postdb = require("../Database/posts")
const fetch = require("node-fetch")
const { response } = require("express")


router.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index2.html`)
})

router.get("/index.css", (req, res) => {
    res.sendFile(`${__dirname}/index.css`)
})

router.get("/index.js", (req, res) => {
    res.sendFile(`${__dirname}/index.js`)
})

router.get("/logo.png", (req, res) => {
    res.sendFile(`${__dirname}/logo.png`)
})

router.post("/", (req, res) => {

    
  var igusername = req.body.instagramusernameofuser.substring(1)
  var userquote = req.body.userquote
  var posttag = req.body.tags
  var postcategory = req.body.category

  fetch(`https://www.instagram.com/${igusername}/?__a=1`).then((data) => { return data.json() }).catch((err) => { console.log(err);}).then((data) => {
 
       var username = data.graphql.user.full_name
       var userbio = data.graphql.user.biography
      var userpic = data.graphql.user.profile_pic_url_hd
      var userfollower = data.graphql.user.edge_followed_by.count
      var userfollowing = data.graphql.user.edge_follow.count
      var isverifiedprofile = function () {
          if (data.graphql.user.is_verified) {
              if (userbio == "") {
                  userbio = `${username} have null description`
                  return `${username} does have a verified account and you can know more about ${username} by visiting Instagram profile at @${igusername}.`
              }
              else {
                  return `${username} does have a verified account and you can know more about ${username} by visiting Instagram profile at @${igusername}. ${username}'s bio is ${userbio}`
              }
          }
          if (data.graphql.user.is_verified) {
              if (userbio == "") {
                  userbio = `${username} have null description`
                  return `Currently, ${username} don't have a verified Instagram but you can know more about ${username} by searching @${username}.`
              }
              else {
                  return `Currently, ${username} don't have a verified Instagram but you can know more about ${username} by searching @${username}. ${username}'s bio is `
              }
          }
      }
     
      var usercategory = data.graphql.user.business_category_name
      var postdescription = `The post belongs to the ${postcategory} category with the ${posttag} tag. This post is created by ${username} who also has an Instagram account with ${userfollower} followers and following ${userfollowing} users when this post was published. ${isverifiedprofile()}`
      postdb({
          authorimageurl: userpic,
          authorname: username,
          authorinfo: userbio,
          postdescription: postdescription,
          content: userquote,
          postcategory: postcategory,
          posttags: posttag,
          whattypepost: "testpost"
          

      }).save().then((data) => { 


res.send(data)
          
          }).catch((err) => { console.log(err);})


  }).catch((err) => { console.log(err)})
  
})











module.exports = router