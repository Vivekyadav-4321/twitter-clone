const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server, Socket } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 9000
const postdb = require("./Views/Database/posts")
const viewpages = require("./Views/ViewPages/server")
const submit = require('./Views/Submit/server')
const pages = require("./Views/Pages/server");
const commentdb = require("./Views/Database/comments")
const fetch = require("node-fetch")
const post = require("./Views/Post/servser")
const search = require("./Views/Search/server")
const profile = require("./Views/Profile/server")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// using the router for home page to get all the request and response 
app.use("/", viewpages)

// using the router for submit page to get all the reqtest and respoonse that conatins data of the new quote
app.use('/submit', submit)

// using router to get the request and respoonse for th pages 
app.use("/p", pages)

//using router to get post id and then send the post to the user
app.use("/post", post)

//using router to get the search terms and show relative posts from the database
app.use("/search", search)

//using router to get the requrest for user profile
app.use("/profile", profile)

//HOMEPAGE: using socket io to send the post and category tabs to the homepage as soon as a user visit the home page
io.on('connection', (socket) => {

  //HOMEPAGE: using socjet to the send the all category tabs to the users div which are displated at the top for the navigation
  socket.on("sendcatagorytagshomepage", () => {
    postdb.distinct("postcategory").then((data) => {
      data.forEach((value) => {
        socket.emit("addthiscatagorytag", `  <span class="catagoryitem" onclick="window.location = window.location.href+'posts/c/${value}'">${value}</span>`)
      })
    }).catch((err) => { "unale to add quotes catagrories" })
  })

  // HOMEPAGE: getting the request for 10 intial quotes when the page is loaded on the users device 
  socket.on("sendintalquotes", () => {
    postdb.collection.countDocuments({}).then((data) => {
      postdb.findOne().limit(-1).skip(Math.floor(Math.random() * data)).then((data) => {
        var quoteid = data._id.valueOf()
        var content = data.content
        var likes = data.likes
        var category = data.postcategory
        var views = data.views
        var posttag = data.posttags
        var authorname = data.authorname
        var authorimage = data.authorimageurl
        var postdescription = data.postdescription.replace(/^(.{150}[^\s]*).*/, "$1")
        var authorinfo = data.authorinfo
        commentdb.find({ commentid: quoteid }).then((data) => {
          var postcomments = data.length
          fetch("https://api.unsplash.com/photos/random/?count=1&query=nature&client_id=8e31e45f4a0e8959d456ba2914723451b8262337f75bcea2e04ae535491df16d").then((data) => { return data.json() }).catch((err) => { console.log(err); })
            .then((data) => {
              var backgroundimage = data[0].urls.regular

              // HOME PAGE: emiting a event with the complete data of the quote card that is recibed my the user device and appeded to the main content div
              socket.emit("completecarddata", `<div class=\"card\"> 
                                               <div class=\"header\"> 
                                               <div class=\"headermain\"> 
                                               <div class=\"authorimage\">  
                                               <img src=\"${authorimage}" alt=\"\"></div> <div class=\"authornameandknowmore\"><span class=\"headerauthorname\">${authorname}</span> <br> <span style=\"font-size: 11px;\">
                                               <span class="authorshortinfo">${authorinfo}.</span> <br><span><span class="categoryitempost">Category: </span><a href="/posts/c/${category}">${category}</a> <i style="font-size: 9px" class="fa fa-external-link"></i></a><span class="tagposttags"> Tag: </span><a href="/posts/c/${category}/t/${posttag}">  ${posttag}</a> <i style="font-size: 9px" class="fa fa-external-link"></i> </span> </div> </div> </div> 
                                               <div class=\"maincontent\"> <img src=\"${backgroundimage}\" height=\"100%\" width=\"100%\" alt=\"\"> <div class=\"quote\"><center><small style="font-size: 10px;">VastCards</small></center>            <br> ${content}<br>   <i class="fa   mainquotebutton fa-copy" onclick="navigator.clipboard.writeText('${content}'); copyquotebutton(this)"></i> <i class="fa mainquotebutton fa-volume-up" onclick="var quoteaudio = new SpeechSynthesisUtterance(); quoteaudio.text = '${content}'; window.speechSynthesis.speak(quoteaudio);"></i> </div> </div>
                                               <center> <small class="postcommenttext viewsandlikesstats views"> <small class="poststats ">Views: <b>${views}</b></small><small class="likespostseparator">    <small class=" poststats "> Likes: </small><small id="likes${quoteid}" class=" poststats"><b>${likes}</b></small> </small>      <small class=" poststats ">Comments: <b>${postcomments}</b></small>       </small>        </center>
                                               <p class="postddescription">${postdescription}... <i class="knowmoewlink "onclick="window.location = '/post/${quoteid}'"><i style="color: #ff00e8" class="fa fa-cube" aria-hidden="true"></i> Read more</i></p> 
                                               <hr> <div class=\"tools\"> <center> <a href=\"https://wa.me/?text=${content}\"><i class=\"fa whatsappicon fa-whatsapp\" target="_blank"></i></a> <a href=\"https://www.facebook.com/sharer/sharer.php?quote=${content}" target="_blank"><i class=\"fa facbookicon fa-facebook-f\" ></i></a> <a href=\"https://twitter.com/intent/tweet?text=${content}\" target="_blank"><i class=\"fa twittericon fa-twitter\" ></i></a> <a href=\"https://www.reddit.com/submit?title=${content}&url=window.location.hostname\" target="_blank"><i class=\"fa redditicon fa-reddit\" ></i></a>   <a href="https://www.linkedin.com/shareArticle/?url=window.location.href" target="_blank" class="fa linkedinicon fa-linkedin"></a><button type="button" class="fa likeicon fa-heart-o" onclick="chceklikeordislike('${quoteid}'); changeheartcolor(this);"></button></center>
                                               </div>
                                               </div>`)
            }).catch((err) => { console.log(err); })
          // getting the post id and upadating the post views by one
          postdb.updateOne({ _id: quoteid }, { $inc: { views: 1 } }).then((data) => { }).catch((err) => { console.log(`unabe to add the view to quote`); })
        }).catch((err) => { console.log(err); })
      }).catch((err) => { console.log(err); })
    }).catch((err) => { console.log(err); })
  })


})



//CATEGORY PAGE: getting socket io request to send the post data to the user device from cureent catagry 
io.on('connection', (socket) => {
  socket.on("sendpostforthecurrentcatagory", (postcategory) => {
    postdb.collection.countDocuments({ postcategory: postcategory }).then((data) => {

      // CATEGORY PAGE: getting quotes from the database with post category
      postdb.findOne({ postcategory: postcategory }).limit(-1).skip(Math.floor(Math.random() * data)).then((data) => {
        var quoteid = data._id.valueOf()
        var content = data.content
        var likes = data.likes
        var category = data.postcategory
        var views = data.views
        var posttag = data.posttags
        var authorname = data.authorname
        var authorimage = data.authorimageurl
        var postdescription = data.postdescription.replace(/^(.{150}[^\s]*).*/, "$1")
        var authorinfo = data.authorinfo
        commentdb.find({ commentid: quoteid }).then((data) => {
          var postcomments = data.length
          fetch("https://api.unsplash.com/photos/random/?count=1&query=nature&client_id=8e31e45f4a0e8959d456ba2914723451b8262337f75bcea2e04ae535491df16d").then((data) => { return data.json() }).catch((err) => { console.log(err); })
            .then((data) => {
              var backgroundimage = data[0].urls.regular
              // emiting a event with the complete data of the quote card that is recibed my the user device and appeded to the main content div
              socket.emit("addthiscatagorypost", `<div class=\"card\"> 
        <div class=\"header\"> 
        <div class=\"headermain\">
         <div class=\"authorimage\"><img src=\"${authorimage}" alt=\"\"></div> <div class=\"authornameandknowmore\"><span class=\"headerauthorname\">${authorname}</span> <br> <span style=\"font-size: 11px;\"><span class="authorshortinfo">${authorinfo}.</span> <br><span><span class="categoryitempost">Category: </span><a href="/posts/c/${category}">${category}</a> <i style="font-size: 9px" class="fa fa-external-link"></i></a><span class="tagposttags"> Tag: </span><a href="/posts/c/${category}/t/${posttag}">  ${posttag}</a> <i style="font-size: 9px" class="fa fa-external-link"></i></span> </div> </div> </div> 
         <div class=\"maincontent\"> <img src=\"${backgroundimage}\" height=\"100%\" width=\"100%\" alt=\"\"> <div class=\"quote\"><center><small style="font-size: 10px;">VastCards</small></center>            <br> ${content}<br>   <i class="fa   mainquotebutton fa-copy" onclick="navigator.clipboard.writeText('${content}'); copyquotebutton(this)"></i> <i class="fa mainquotebutton fa-volume-up" onclick="var quoteaudio = new SpeechSynthesisUtterance(); quoteaudio.text = '${content}'; window.speechSynthesis.speak(quoteaudio);"></i> </div> </div>
        <center> <small class="postcommenttext viewsandlikesstats views"> <small class="poststats ">Views: <b>${views}</b></small><small class="likespostseparator">    <small class=" poststats "> Likes: </small><small id="likes${quoteid}" class=" poststats"><b>${likes}</b></small> </small>      <small class=" poststats ">Comments: <b>${postcomments}</b></small>       </small>        </center>
        <p class="postddescription">${postdescription}... <i class="knowmoewlink "onclick="window.location = '/post/${quoteid}'"><i style="color: #ff00e8" class="fa fa-cube" aria-hidden="true"></i> Read more</i></p> 
        <hr> <div class=\"tools\"> <center> <a href=\"https://wa.me/?text=${content}\"><i class=\"fa whatsappicon fa-whatsapp\" target="_blank"></i></a> <a href=\"https://www.facebook.com/sharer/sharer.php?quote=${content}" target="_blank"><i class=\"fa facbookicon fa-facebook-f\" ></i></a> <a href=\"https://twitter.com/intent/tweet?text=${content}\" target="_blank"><i class=\"fa twittericon fa-twitter\" ></i></a> <a href=\"https://www.reddit.com/submit?title=${content}&url=window.location.hostname\" target="_blank"><i class=\"fa redditicon fa-reddit\" ></i></a>   <a href="https://www.linkedin.com/shareArticle/?url=window.location.href" target="_blank" class="fa linkedinicon fa-linkedin"></a><button type="button" class="fa likeicon fa-heart-o" onclick="chceklikeordislike('${quoteid}'); changeheartcolor(this);"></button></center>
        </div>
        </div>`)

            }).catch((err) => { console.log(err); })
          //updating the post views by 1
          postdb.updateOne({ _id: quoteid }, { $inc: { views: 1 } }).then((data) => { }).catch((err) => { console.log(`unabe to add the view to quote`); })
        }).catch((err) => { console.log(err); })
      }).catch((err) => { console.log(err); })
    }).catch((err) => { console.log(err); })
  })

  // CATEGORY PAGE: getting socket io request to send the data of all the tags avilable in the cureent catagory 
  socket.on("sendalltagsfromcurrentcatagory", (postcatagory) => {
    postdb.distinct("posttags", { category: postcatagory }).then((data) => {
      data.forEach((value) => {
        socket.emit("addthistagtocatagorypage", `<span class="catagoryitem" onclick="window.location = '${postcatagory}/t/${value}'">${value}</span> `)
      })
    })

  })
})



//TAGS PAGE: getting socket io request to send the data of all the posts from a perticular category and with a perticaual tag
io.on("connection", (socket) => {
  socket.on("sendpostsfromthistags", (categoryandtags) => {
    postdb.collection.countDocuments({ postcategory: categoryandtags.pagecategory, posttags: categoryandtags.pagetag }).then((data) => {

      // Tag Page: getting quotes from the database
      postdb.findOne({ postcategory: categoryandtags.pagecategory, posttags: categoryandtags.pagetag }).limit(-1).skip(Math.floor(Math.random() * data)).then((data) => {
        var quoteid = data._id.valueOf()
        var content = data.content
        var likes = data.likes
        var category = data.postcategory
        var views = data.views
        var posttag = data.posttags
        var authorname = data.authorname
        var authorimage = data.authorimageurl
        var postdescription = data.postdescription.replace(/^(.{150}[^\s]*).*/, "$1")
        var authorinfo = data.authorinfo
        commentdb.find({ commentid: quoteid }).then((data) => {
          var postcomments = data.length

          fetch("https://api.unsplash.com/photos/random/?count=1&query=nature&client_id=8e31e45f4a0e8959d456ba2914723451b8262337f75bcea2e04ae535491df16d").then((data) => { return data.json() }).catch((err) => { console.log(err); })
            .then((data) => {
              var backgroundimage = data[0].urls.regular
              // emiting a event with the complete data of the quote card that is recibed my the user device and appeded to the main content div
              socket.emit("postfromaperticaultcatagoryandtag", `<div class=\"card\"> 
                                                                <div class=\"header\"> 
                                                                <div class=\"headermain\"> 
                                                                <div class=\"authorimage\"><img src=\"${authorimage}" alt=\"\"></div> <div class=\"authornameandknowmore\"><span class=\"headerauthorname\">${authorname}</span> <br> <span style=\"font-size: 11px;\"><span class="authorshortinfo">${authorinfo}.</span> <br><span><span class="categoryitempost">Category: </span><a href="/posts/c/${category}">${category}</a> <i style="font-size: 9px" class="fa fa-external-link"></i></a><span class="tagposttags"> Tag: </span><a href="/posts/c/${category}/t/${posttag}">  ${posttag}</a> <i style="font-size: 9px" class="fa fa-external-link"></i></span> </div> </div> </div> 
                                                                <div class=\"maincontent\"> <img src=\"${backgroundimage}\" height=\"100%\" width=\"100%\" alt=\"\"> <div class=\"quote\"><center><small style="font-size: 10px;">VastCards</small></center>  <br> ${content}<br>   <i class="fa   mainquotebutton fa-copy" onclick="navigator.clipboard.writeText('${content}'); copyquotebutton(this)"></i> <i class="fa mainquotebutton fa-volume-up" onclick="var quoteaudio = new SpeechSynthesisUtterance(); quoteaudio.text = '${content}'; window.speechSynthesis.speak(quoteaudio);"></i> 
                                                                </div> </div>
                                                                <center> <small class="postcommenttext viewsandlikesstats views"> <small class="poststats ">Views: <b>${views}</b></small><small class="likespostseparator">    <small class=" poststats "> Likes: </small><small id="likes${quoteid}" class=" poststats"><b>${likes}</b></small> </small>      <small class=" poststats ">Comments: <b>${postcomments}</b></small>       </small>        </center>
                                                                <p class="postddescription">${postdescription}... <i class="knowmoewlink "onclick="window.location = '/post/${quoteid}'"><i style="color: #ff00e8" class="fa fa-cube" aria-hidden="true"></i> Read more</i></p> 
                                                                <hr> <div class=\"tools\"> <center> <a href=\"https://wa.me/?text=${content}\"><i class=\"fa whatsappicon fa-whatsapp\" target="_blank"></i></a> <a href=\"https://www.facebook.com/sharer/sharer.php?quote=${content}" target="_blank"><i class=\"fa facbookicon fa-facebook-f\" ></i></a> <a href=\"https://twitter.com/intent/tweet?text=${content}\" target="_blank"><i class=\"fa twittericon fa-twitter\" ></i></a> <a href=\"https://www.reddit.com/submit?title=${content}&url=window.location.hostname\" target="_blank"><i class=\"fa redditicon fa-reddit\" ></i></a>   <a href="https://www.linkedin.com/shareArticle/?url=window.location.href" target="_blank" class="fa linkedinicon fa-linkedin"></a><button type="button" class="fa likeicon fa-heart-o" onclick="chceklikeordislike('${quoteid}'); changeheartcolor(this);"></button></center>
                                                                </div>
                                                                </div>`)

            }).catch((err) => { console.log(err); })

          postdb.updateOne({ _id: quoteid }, { $inc: { views: 1 } }).then((data) => { }).catch((err) => { console.log(`unabe to add the view to quote`); })
        }).catch((err) => { console.log(err); })
      }).catch((err) => { console.log(err); })
    }).catch((err) => { console.log(err); })


  })

  //TAG PAGE: socket to send the post from tags and a category
  socket.on("sendcatgorypagesfortagpage", (pagecategory) => {
    postdb.distinct("posttags", { postcatagory: pagecategory }).then((data) => {
      data.forEach((value) => {
        socket.emit("addthiesecaatgorytotagpage", `<span class="catagoryitem" onclick="window.location.replace('${value}')">${value}</span>`)
      })
    }).catch((err) => { "unale to add quotes catagrories" })
  })

})



//POST PAGE: socket to get the post id and then send that post to the user
io.on("connection", (socket) => {
  socket.on("sendthisposttothispage", (postid) => {
    postdb.findOne({ _id: postid }).then((data) => {
      var quoteid = data._id.valueOf()
      var content = data.content
      var likes = data.likes
      var category = data.postcategory
      var views = data.views
      var posttag = data.posttags
      var authorname = data.authorname
      var authorimage = data.authorimageurl
      var postdescription = data.postdescription
      var authorinfo = data.authorinfo
      commentdb.find({ commentid: quoteid }).then((data) => {
        var postcomments = data.length

        fetch("https://api.unsplash.com/photos/random/?count=1&query=nature&client_id=8e31e45f4a0e8959d456ba2914723451b8262337f75bcea2e04ae535491df16d").then((data) => { return data.json() }).catch((err) => { console.log(err); })
          .then((data) => {
            var backgroundimage = data[0].urls.regular

            // emiting a event with the complete data of the quote card that is recibed my the user device and appeded to the main content div
            socket.emit("addthisposttothepage", `<div class=\"card\"> 
                                                 <div class=\"header\"> 
                                                 <div class=\"headermain\">
                                                 <div class=\"authorimage\"><img src=\"${authorimage}" alt=\"\"></div> <div class=\"authornameandknowmore\"><span class=\"headerauthorname\">${authorname}</span> <br> <span style=\"font-size: 11px;\"><span class="authorshortinfo">${authorinfo}.</span> <br><span><span class="categoryitempost">Category: </span><a href="/posts/c/${category}">${category}</a> <i style="font-size: 9px" class="fa fa-external-link"></i></a><span class="tagposttags"> Tag: </span><a href="/posts/c/${category}/t/${posttag}">  ${posttag}</a> <i style="font-size: 9px" class="fa fa-external-link"></i> </span> </div> </div> </div> 
                                                 <div class=\"maincontent\"> <img src=\"${backgroundimage}\" height=\"100%\" width=\"100%\" alt=\"\"> <div class=\"quote\"><center><small style="font-size: 10px;">VastCards</small></center>            <br> ${content}<br>   <i class="fa   mainquotebutton fa-copy" onclick="navigator.clipboard.writeText('${content}'); copyquotebutton(this)"></i> <i class="fa mainquotebutton fa-volume-up" onclick="var quoteaudio = new SpeechSynthesisUtterance(); quoteaudio.text = '${content}'; window.speechSynthesis.speak(quoteaudio);"></i> </div> </div>
                                                 <center> <small class="postcommenttext viewsandlikesstats views"> <small class="poststats ">Views: <b>${views}</b></small><small class="likespostseparator">    <small class=" poststats "> Likes: </small><small id="likes${quoteid}" class=" poststats"><b>${likes}</b></small> </small>      <small class=" poststats ">Comments: <b>${postcomments}</b></small>       </small>        </center>
                                                 <p class="postddescription">${postdescription} </p> 
                                                 <hr> <div class=\"tools\"> <center> <a href=\"https://wa.me/?text=${content}\"><i class=\"fa whatsappicon fa-whatsapp\" target="_blank"></i></a> <a href=\"https://www.facebook.com/sharer/sharer.php?quote=${content}" target="_blank"><i class=\"fa facbookicon fa-facebook-f\" ></i></a> <a href=\"https://twitter.com/intent/tweet?text=${content}\" target="_blank"><i class=\"fa twittericon fa-twitter\" ></i></a> <a href=\"https://www.reddit.com/submit?title=${content}&url=window.location.hostname\" target="_blank"><i class=\"fa redditicon fa-reddit\" ></i></a>   <a href="https://www.linkedin.com/shareArticle/?url=window.location.href" target="_blank" class="fa linkedinicon fa-linkedin"></a><button type="button" class="fa likeicon fa-heart-o" onclick="chceklikeordislike('${quoteid}'); changeheartcolor(this);"></button></center>
                                                 </div>
                                                 </div>`)

          }).catch((err) => { console.log(err); })
        postdb.updateOne({ _id: quoteid }, { $inc: { views: 1 } }).then((data) => { }).catch((err) => { console.log(`unabe to add the view to quote`); })
      }).catch((err) => { console.log(err); })
    }).catch((err) => { console.log(err); })
  })
})



//SEARCH PAGE: socket to get the sarch term from the user and then send the relative posts to the user
io.on("connection", (socket) => {
  socket.on("inputsearch", (searchterm) => {
    postdb.find({ "content": new RegExp(searchterm, "i") }).limit(15).then((data) => {
      data.forEach((data) => {
        var quoteid = data._id.valueOf()
        var content = data.content
        var likes = data.likes
        var category = data.postcategory
        var views = data.views
        var posttag = data.posttags
        var authorname = data.authorname
        var authorimage = data.authorimageurl
        var postdescription = data.postdescription.replace(/^(.{150}[^\s]*).*/, "$1")
        var authorinfo = data.authorinfo
        commentdb.find({ commentid: quoteid }).then((data) => {
          var postcomments = data.length

          fetch("https://api.unsplash.com/photos/random/?count=1&query=nature&client_id=8e31e45f4a0e8959d456ba2914723451b8262337f75bcea2e04ae535491df16d").then((data) => { return data.json() }).catch((err) => { console.log(err); })
            .then((data) => {
              var backgroundimage = data[0].urls.regular
              // emiting a event with the complete data of the quote card that is recibed my the user device and appeded to the main content div
              socket.emit("completecarddata", `<div class=\"card\"> 
                                               <div class=\"header\"> 
                                               <div class=\"headermain\"> 
                                               <div class=\"authorimage\"><img src=\"${authorimage}" alt=\"\"></div> 
                                               <div class=\"authornameandknowmore\"><span class=\"headerauthorname\">${authorname}</span> <br> <span style=\"font-size: 11px;\"><span class="authorshortinfo">${authorinfo}.</span> <br><span><span class="categoryitempost">Category: </span><a href="/posts/c/${category}">${category}</a> <i style="font-size: 9px" class="fa fa-external-link"></i></a><span class="tagposttags"> Tag: </span><a href="/posts/c/${category}/t/${posttag}">  ${posttag}</a> <i style="font-size: 9px" class="fa fa-external-link"></i> </span> </div> </div> </div> 
                                               <div class=\"maincontent\"> <img src=\"${backgroundimage}\" height=\"100%\" width=\"100%\" alt=\"\"> <div class=\"quote\"><center><small style="font-size: 10px;">VastCards</small></center>            <br> ${content}<br>   <i class="fa   mainquotebutton fa-copy" onclick="navigator.clipboard.writeText('${content}'); copyquotebutton(this)"></i> <i class="fa mainquotebutton fa-volume-up" onclick="var quoteaudio = new SpeechSynthesisUtterance(); quoteaudio.text = '${content}'; window.speechSynthesis.speak(quoteaudio);"></i> </div> </div>
                                               <center> <small class="postcommenttext viewsandlikesstats views"> <small class="poststats ">Views: <b>${views}</b></small><small class="likespostseparator">    <small class=" poststats "> Likes: </small><small id="likes${quoteid}" class=" poststats"><b>${likes}</b></small> </small>      <small class=" poststats ">Comments: <b>${postcomments}</b></small></small></center>
                                               <p class="postddescription">${postdescription}... <i class="knowmoewlink "onclick="window.location = '/post/${quoteid}'"><i style="color: #ff00e8" class="fa fa-cube" aria-hidden="true"></i> Read more</i></p> 
                                               <hr> <div class=\"tools\"> <center> <a href=\"https://wa.me/?text=${content}\"><i class=\"fa whatsappicon fa-whatsapp\" target="_blank"></i></a> <a href=\"https://www.facebook.com/sharer/sharer.php?quote=${content}" target="_blank"><i class=\"fa facbookicon fa-facebook-f\" ></i></a> <a href=\"https://twitter.com/intent/tweet?text=${content}\" target="_blank"><i class=\"fa twittericon fa-twitter\" ></i></a> <a href=\"https://www.reddit.com/submit?title=${content}&url=window.location.hostname\" target="_blank"><i class=\"fa redditicon fa-reddit\" ></i></a>   <a href="https://www.linkedin.com/shareArticle/?url=window.location.href" target="_blank" class="fa linkedinicon fa-linkedin"></a><button type="button" class="fa likeicon fa-heart-o" onclick="chceklikeordislike('${quoteid}'); changeheartcolor(this);"></button></center>
                                               </div>
                                               </div>`)

            }).catch((err) => { console.log(err); })
          postdb.updateOne({ _id: quoteid }, { $inc: { views: 1 } }).then((data) => { }).catch((err) => { console.log(`unabe to add the view to quote`); })
        }).catch((err) => { console.log(err); })
      })

      if (data.length == 0) {
        socket.emit("completecarddata", `<div class="contentpara"> 
                                        <center><img src="/search/searchicon.png" alt="" width="60px" srcset=""></center> 
                                        <p style="font-size: 12px;">No post found for <b>"${searchterm}"</b>. You can try other similar terms</b></p> 
                                        </div>`)
      }

    }).catch((err) => { console.log(err); })
  })
})



//LIKE BUTTON: socket event to add the like to a quotes when "llikedwuotedid" event is emited from the user 
io.on("connection", (socket) => {
  socket.on("likedquoteid", (likedquoteid) => {
    postdb.updateOne({ _id: likedquoteid }, { $inc: { likes: 1 } }).then((data) => { }).catch((err) => { console.log("UNable to add the like to the quote"); })
  })
})



//COMMENTS: getting comment from the user using socket emit event and adding it to the database
io.on("connection", (socket) => {
  //COMMENT: gtetting the comment from the user and then saving it to the database
  socket.on("addcomment", (data) => {
    commentdb({ authorname: data.authorname, content: data.commentcontent, commentid: data.postid }).save().then((data) => { console.log(data); }).catch((err) => { console.log(err); })
  })

  //COMMENT: getting comment from the database and adding to the comment section of the page
  socket.on("sendcomments", (data) => {
    commentdb.find({ commentid: data }).then((data) => {
      data.forEach((data) => {
        var commentid = data._id.valueOf()
        socket.emit("addcommentocommentsection", `<div class="contentpara"> 
                                                  <span class="authornamecomment"><i class="fa fa-user-circle-o" aria-hidden="true"></i> ${data.authorname}</span>
                                                  <br>
                                                  <span class="commmentbody">${data.content}</span>                                                   
                                                  <span> <button class="fa fa-thumbs-o-up commentlikebutton " onclick="addliketothiscomment('${commentid}');changethelikeiconforthiscomment(this)" id="commentlikebutttonid"></button> <b class="commentlikenumber commentdislikenumber" style="font-size: 11px; color: black;" id="commentlike${commentid}">${data.likes}</b>  <button class="commentdislikebutton fa fa-thumbs-o-down" id="commentdislikebutttomid" onclick="adddisliketothiscomment('${commentid}');changethesilikeiconforthiscomment(this)"></button>     <b class="commentdislikenumber" id="commentdislike${commentid}">${data.dislikes}</b>
                                                  </span> 
                                                  </div>`)
      })

      if (data.length == 0) {
        socket.emit("addcommentocommentsection", ` <div class="contentpara" id="nocommentbar">
                                                   <center> <img src="/search/commenticon.png" alt="" width="60px" srcset=""> </center>
                                                   <p style="font-size: 12px;">No comments. You can be the first to comment.</p>
                                                   </div `)
      }

    }).catch((err) => { console.log(err); })

  })

  // adding like to the comment whrn the like button is ckicked by the user in the comment searicon 
  socket.on("addliketothecomment", (commentid) => {
    commentdb.updateOne({ _id: commentid }, { $inc: { likes: 1 } }).then((data) => { console.log(data); }).catch((err) => { console.log(err); })
  })

  //adding dislike to the comment when the user click o the dislike button the in the comment
  socket.on("adddisliektothiscomment", (commentid) => {
    commentdb.updateOne({ _id: commentid }, { $inc: { dislikes: 1 } }).then((data) => { console.log(data); }).catch((err) => { console.log(err); })
  })

})

server.listen(PORT, () => { console.log(`server is live at ${PORT}`); });   