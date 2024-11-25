    const express=require('express')
    const HttpError=require('../Models/HttpError')
    const Club=require('../Models/clubs')

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