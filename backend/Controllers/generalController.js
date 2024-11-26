const express=require('express')
const HttpError=require('../Models/HttpError')
const Club=require('../Models/clubs')
const Notice=require('../Models/noticeSchema')


//Get all the clubs general details 

exports.getAllClubs = async (req,res,next)=>{
    try{
        const clubs= await  Club.find();
        
        res.status(200).json({
            status:'success',
            data:{
                clubs
            }
        })

    }catch(error){
        throw new HttpError(500,`An server error occured:${error}`)
    }
}

//Get all the posts of the specific club

exports.getNoticesOfClub= async(req,res,next)=>{
    try{
        const clubId=req.params.clubId;
        const notices = await Notice.find({clubId:clubId})
        res.status(200).json({
            status:'success',
            data:{
                notices
            }
        })
        
    }catch(error){
        return next(new HttpError(500,`An error occured on the server:${error}`)) 
    }
}

//Get a specific notice from a specific Club

exports.getSpNotice=async(req,res,next)=>{
    try{
        const {clubId , noticeId}=req.params;
        const notice= await Notice.findOne({_id:noticeId , clubId:clubId})
        res.status(200).json({
            status:'success',
            data:{
                notice
            }
        })



    }catch(error){
        return next(new HttpError(500,`An error occured on the server:${error}`)) 
    }
}