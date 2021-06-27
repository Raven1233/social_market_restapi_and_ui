const mongoose = require("mongoose");

const PaymentSchema=new mongoose.Schema({
    buyerId:{
        typer:String,
    },
    sellerId:{
        type:String,
    },
    price:{
        type:String,
    }
},
{ timestamps:true }
);
module.exports = mongoose.model("Payment", PaymentSchema);