const router = require("express").Router();
const Conversation = require("../models/Conversation");


//new conversation

router.post("/",async (req,res)=>{
    const newConversation = Conversation({
        members: [req.body.senderId,req.body.receiverId],
    });
    try{
        const savedConverstion=await newConversation.save();
        res.status(200).json(savedConverstion);
    }catch(err){
        res.status(500).json(err);
    }
});

//get conv

router.get("/:userId", async(req,res)=>{
    try{
        const conversation = await Conversation.find({
            members:{$in:[req.params.userId]}
        });
        res.status(200).json(conversation);
    }catch(err){
        res.status(500).json(err);
    }
})

//get conv includes two userId
router.get("/find/:firstUserId/:secondUserId",async(req,res)=>{
    try{
        const conversation = await Conversation.findOne({
            members:{$all:[req.params.firstUserId,req.params.secondUserId]}
        })
        res.status(200).json(conversation)
    }catch(err){
        res.status(500).json(err);
    }
});


module.exports=router;