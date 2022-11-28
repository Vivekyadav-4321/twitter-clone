const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 9000
const mainpages = require("./Views/MainPages/server")
const pages = require("./Views/Pages/server");
var cookieParser = require('cookie-parser')
const submit = require("./Views/Submit/server")
const post = require("./Views/Post/servser")
const usermanagment = require("./Views/UserManagment/server")
const images = require("./Views/Images/server")
const postapi = require("./Views/APIs/postapis")
const downloader = require("./Views/Downloaders/server")
const commentapi = require("./Views/APIs/commentapi")
const sitemaps = require("./Views/Sitemaps/sever")
const cors = require("cors");
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser())
app.set('view engine', 'hbs')
app.use("/api",postapi)
app.use("/commentapi",commentapi)

//using the outer to get the requests for the site of the website 
app.use("/sitemaps",sitemaps)

// using the router for home page to get all the request and response 
app.use("/", mainpages)

// using router to get the request and respoonse for th pages 
app.use("/p", pages)

//using router to get post id and then send the post to the user
app.use("/post", post)

//using router to get the requuier for sign in and login
app.use("/user", usermanagment)

//using router to the server the images to the clent
app.use("/images", images)

//using the router to get the post from user 
app.use("/submit", submit)

//using router to get the message from the user
//using router to get the requests for the download videos
app.use("/downloader",downloader)

server.listen(PORT,() => { console.log(`server is live at ${PORT}`); });   