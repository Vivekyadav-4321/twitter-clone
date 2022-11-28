const db = require("mongoose")
require('dotenv').config()

// connecting to the databse (Atlas) 
db.connect(`mongodb+srv://${process.env.username}:${process.env.password}@vastcards.z3x0d.mongodb.net/vastcards?retryWrites=true&w=majority`).then((data) => { console.log('connected to user colection'); }).catch((err) => { console.log("user collection is not connected " + err); })

// defining user document schema
const dbschema = new db.Schema({

    userfirstname: {
        type: String,
        required: true,
    },
    userlastname: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    userpassword: {
        type: String,
        required: true
    },
    userage: {
        type: Number,
        required: true,
    },
    userprofession: {
        type: String,
        required: true
    },
    usergender: {
        type: String,
        required: true
    },
    userlocation: {
        type: String,
        required: true
    },
    userpic: {
        type: String,
        required: true
    },
    dateofjoining: {
        type: Number,
        default: new Date().getTime()
    },
    userlikedposts: {
        type: Array,
        default: []
    },
    usersavedposts: {
        type: Array,
        default: []
    },
    userinterests: {
        type: Array,
        default: []
    },
    userposts: {
        type: Array,
        default: []
    },
    userpostedcomments: {
        type: Array,
        default: []
    },
    followingaccountbyuser: {
        type: Array,
        default: []
    },
    userjwttoken: {
        type: Array,
        required: true,
        unique: true
    },
    userphonenumber: {
        type: Number
    },
    useremailaddress: {
        type: String
    },
    userchatcount: {
        type: Number
    },
    userstreakes: {
        type: Number
    },
    userrelationshiptstatus: {
        type: String,
    }
})