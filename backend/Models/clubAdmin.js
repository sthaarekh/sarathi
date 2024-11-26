const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')

const ClubAdminSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide your username"]
    },
    email:{
        type:String,
        required:[true,'Please provide your email'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,"Please provide a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        validate:[validator.isStrongPassword,"Your password is not strong enough"]
    },
    passwordConfirm:{
        type:String,
        required:[true,"Please enter your password "],
    },
    emailVerified:{
        type:Boolean,
        verified:false
    },
    adminVerified:{
        type:Boolean,
        verified:false
    }

})
ClubAdminSchema.pre('save' , async function(req,res,next){

    if(!this.isModified('password')) return next();
    this.password = bcrypt.hashSync(this.password,12)
    next();

})

const Clubadmin=mongoose.model('Clubadmin',ClubAdminSchema);
module.exports=Clubadmin;