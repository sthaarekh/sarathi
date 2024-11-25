const mongoose = require('mongoose');

const clubsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

const Club=mongoose.model('Club',clubsSchema);
module.exports= Club;