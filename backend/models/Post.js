const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        max:500
    },
    img:{
        type:String,
    },
    likes:{
        type:Array,
        default: []
    },
    price:{
        type:String,
        default:"",
        max:8
    }
},
{ timestamps:true }
);

module.exports = mongoose.model("Post", PostSchema);