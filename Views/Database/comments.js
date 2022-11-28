const db = require("mongoose")
require('dotenv').config()

// connecting to the databse (Atlas) 
db.connect(`mongodb+srv://${process.env.username}:${process.env.password}@vastcards.z3x0d.mongodb.net/vastcards?retryWrites=true&w=majority`).then((data)=>{console.log('connected to comment collection');}).catch((err)=>{console.log("comment colleciton is not connected " + err);})
 
// creating the schrema for the collection
const dbschema = new db.Schema({

    authorname: { 
        type: String,
        default: "Unknown", 
        required: true,
    }, 
 
    content: {
        type: String,
        required: true,
    },

    likes: {
        type: Number,
        default: 0,
    },

    dislikes: {
        type: Number,
        default: 0,
    },

    publishdate: {
        type: Number,
        default: new Date().getTime()
    },

    commentid: {
        type: String,
        required: true
    }

})

// giving the name to databse as vastcards and collection as posts 
const commentsdb = db.model('comments', dbschema)

// importing the mongodb vastcard object show that it can use in other modules also 
module.exports = commentsdb





 