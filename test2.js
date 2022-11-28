const WikipediaApi = require("wikipedia")
// const vastcardsdb = require("./Views/Database/posts")
// const fetch = require("node-fetch")
// setInterval(() => {
// fetch("https://api.quotable.io/random").then((data)=>{return data.json()}).catch(()=>{}).then((data)=>{
// var content = data.content
// var contanttag = data.tags[0]
// WikipediaApi.summary(data.author).then((data)=>{

// var authorname = data.title
// var authorimage = data.thumbnail.source
// var authorinfo = data.extract_html
// var authordescription = data.description

// vastcardsdb({
// authorimageurl: authorimage,
// authorname: authorname,
// authorinfo: authordescription,
// postdescription: authorinfo,
// content: content,
// postcategory: "Quotes",
// posttags: contanttag ,
// whattypepost: "testpost"

// })
// .save().then((data)=>{console.log(data);}).catch((err)=>{console.log(err);})


// }).catch((err)=>{console.log(err);})

// }).catch((err)=>{err})
// }, 1000); 



// WikipediaApi.summary("apple").then((data)=>{

//     console.log(data.extract_html);
// })

var date = new Date().getTime()
console.log(date);