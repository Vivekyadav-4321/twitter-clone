const postsdb = require("./Views/Database/posts")
// const fetch = require("node-fetch")
// const wikipediaapi = require("wikipedia")
// const fs = require("fs")
// // const randomcolor = require("randomcolor")
// var authorid = "629ad50b18330ec71aa5fc97"
// var postcategory = "Quotes"
// var whattypepost = "batch24"
// const quotes = require("./quote")
// // var allquotestags = "best,life,love,mistakes,honesty,inspirational,humor,truth,philosophy,infinity,stupidity,universe,books,simile,love,reality,character,memory,friendship,enemies,forgiveness,strategy,education,learning,darkness,peace,music,accomplishment,change,madness,actions,love,fate,poetry,art,biography,business,children's,christian,classics,comics,cookbooks,ebooks,fantasy,fiction,graphic,novels,historical,fiction,history,horror,memoir,music,mystery,nonfiction,poetry,psychology,romance,science,science,fiction,self,help,sports,thriller,trave"
// var counter = 30700
// setTimeout(() => {
//     setInterval(() => {
//         counter++
//         var apidata = quotes[counter]
//         var validcontentcontent = ()=>{
//             var firstword = apidata.Quote.charAt(0).toUpperCase()
//             var otherstring = apidata.Quote.substring(1)
//             return (firstword+otherstring).replace(";", ",").replace("[","").replace("]","")
//             } 

//         wikipediaapi.summary(`${apidata.Author.replace(". "," ").replace(". "," ").replace(". "," ").replace(". "," ")}`).then((data) => {
//                 var authorimageurl = data.thumbnail.source 
//                 var authorname = data.titles.normalized
//                 var authorinfo = data.description
//                 var postdescription = data.extract.replace(";", ",").replace("—", " ")
//                 var numberofwords = validcontentcontent().split(" ")
          

// if(numberofwords.length >= 4){
//     postsdb({
//         authorid: authorid,
//         authorimageurl: authorimageurl,
//         authorname: authorname,
//         content: validcontentcontent(),
//         authorinfo: authorinfo,
//         postdescription: postdescription,
//         postcategory: postcategory,
//         posttags: "popular",
//         whattypepost: whattypepost
//     }).save().then((data) => { console.log("added to db with photo " + counter) }).catch((err) => {
//         console.log("not added" + counter);
//     })
// }


//             }).catch((err) => {
//                 console.log(err);
                // postsdb({
                //     authorid: authorid,
                //     authorimageurl: "https://source.unsplash.com/random/720%C3%97720/?face",
                //     authorname: apidata.author,
                //     content: validcontentcontent(),
                //     authorinfo: "Information is not available",
                //     postdescription: "Description for this post is not available",
                //     postcategory: postcategory,
                //     posttags: apidata.tags,
                //     whattypepost: whattypepost
                // }).save().then((data) => { console.log("added to db with no photo " + counter) }).catch((err) => {

                //     postsdb.updateMany({content: validcontentcontent()},{
                //         authorname: apidata.author,
                //         posttags: apidata.tags,
                //         whattypepost: whattypepost
                //     }).then((data)=>{console.log("upadte the content with no photo " + counter)}).catch((err)=>{console.log(err);})
                    
                //  })
            
//              })
//         }, 70);
// }, 12000);




// var filecount = 1
// var counter = 1
// postsdb.distinct("_id").then((data)=>{
//     console.log(data);
//     setInterval(() => {
//         counter++
// var quoteid = data[counter].valueOf()

// if(counter % 10000 == 0){
// filecount++
// }

//     fs.appendFile(`${__dirname}/Views/Sitemaps/sitemap${filecount}.xml`,`
//     <url>
//     <loc>https://vastcards.com/post/${quoteid}</loc>
//     <lastmod>2022-06-06</lastmod>
//     </url>
//     `,((data)=>{console.log(`${data} counter ${counter}`);}))
          


//     }, 1);

// }).catch((err)=>{console.log(err);})


// <?xml version="1.0" encoding="UTF-8"?>
// <urlset
//       xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
//       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
//       xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
//             http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
//       <!-- all url section starts here -->

// postsdb.({authorname: "Anonymous"}).then((data)=>{console.log(data);})
// postsdb.collection.countDocuments({}).then((data)=>{console.log(data);}).catch((err)=>{console.log(err);})

// const express = require("express")
// const app = express()
// const youtubedl = require()


// app.get("/",(req, res)=>{

//     youtubedowloaer.getInfo("https://www.youtube.com/watch?v=7v0_uipNGao").then((data)=>{
//      res.send(data)

        





//     })
// })


// app.listen(9000,()=>{
//     console.log("server is live");
// })


// const link = document.createElement('a')
//   link.href = canvas.toDataURL('jpeg')
//   link.download = Math.floor(Math.random()*10000000)
//   document.body.appendChild(link)
//   link.click()
//   document.body.removeChild(link)




// const instagramGetUrl = require("instagram-url-direct")
// instagramGetUrl("https://www.instagram.com/tv/CUXwYE5F2RX/").then((data)=>[console.log(data)])

// postsdb.collection.countDocuments({}).then((data)=>{console.log(data);})

// postsdb.findOne({})
