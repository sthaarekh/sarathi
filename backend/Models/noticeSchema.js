const mongoose=require('mongoose')

const noticeSchema=new mongoose.Schema({
    clubId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true

    },
    content:{
        type:String
    }
})

const Notice=mongoose.model('Notice',noticeSchema);

module.exports=Notice;