const mongoose = require("mongoose");


const ReadListSchema = new mongoose.Schema({

    postId:{type:mongoose.Types.ObjectId,ref:"Post"},
    date:{type:Date,default:Date.now}

}, { timestamp: true, collection: "read_lists", versionKey: false })

const ReadList = mongoose.model("ReadList", ReadListSchema);

module.exports=ReadList;