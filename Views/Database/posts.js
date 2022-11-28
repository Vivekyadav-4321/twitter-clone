const db = require("mongoose")
require('dotenv').config()

// connecting to the databse (Atlas) 
db.connect(`mongodb+srv://${process.env.username}:${process.env.password}@vastcards.z3x0d.mongodb.net/vastcards?retryWrites=true&w=majority`).then((data)=>{console.log('connected to post colection');}).catch((err)=>{console.log("post collection is not connected " + err);})

// creating the schrema for the collection
const dbschema = new db.Schema({

    authorid: {
        type: String
    },

    authorimageurl: {
        type: String,
        default: "unknownpic",
        required: true
    }, 

    authorname: {
        type: String,
        default: "Unknown", 
        required: true,
    }, 

    authorinfo: {
        type: String,
        default: "unknowm",
        required: true
    },

    postdescription: {
        type: String,
        default: "unknown",
        required: true
    },

    content: {
        type: String,
        default: "quote is not avilable",
        required: true,
        unique: true
    },

    posttags: {
        type: String,
        default: "unknowm",
        require: true
    },

    postcategory: {
        type: String,
        default: "unknown",
        require: true
    },
    
    likes: {
        type: Number,
        default: 0,
        required: true
    },
    views: {
        type: Number,
        default: 0, 
        required: true
    },

    publishdate: {
        type: Number,
        default: new Date().getTime()
    },

    whattypepost: {
        type: String,
        required: true
    }
})

// giving the name to databse as vastcards and collection as posts 
const vastcardsdb = db.model('posts', dbschema)

// importing the mongodb vastcard object show that it can use in other modules also 
module.exports = vastcardsdb





