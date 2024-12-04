const express = require('express')
const jwt = require('jsonwebtoken')
const Clubs = require('../Models/clubs');
const HttpError = require('../Models/HttpError');
const Notices = require('../Models/noticeSchema')

exports.login = (req, res, next) => {
    const { username, password } = req.body;
    if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
        res.status(401).json({
            status: 'fail',
            message: "Invalid credintials .Please try again "
        })
    }
    else {
        const token = jwt.sign({ username, password, role: 'admin' }, process.env.JWT_SECRET_KEY, { expiresIn: '1hour' })
        res.cookie('authToken', token, {
            httpOnly: true,
            sameSite: 'Strict',
            // secure:true
        })
        return res.status(200).json({
            status: 'success',
            message: 'AdminLogin successful!',
        });
    }
}

exports.getAllClubs = async (req, res, next) => {
    try {
        const clubs = await Clubs.find();
        res.status(200).json({
            status: 'success',
            data: {
                clubs
            }
        })

    } catch (error) {
        return next(new HttpError(error.statusCode || 500, `An error occured:${error.message}`));
    }

}
exports.deleteClub = async (req, res, next) => {
    const clubId = req.params.clubId
    try {
        const club = await Clubs.findByIdAndDelete(clubId);
        if (!club) {
            return next(new HttpError(404, "No club of that id was found"))
        }
        else {
            const result=Clubs.deleteMany({clubId:clubId})
            res.status(202).json({
                status: 'success',
                message: "Club and related all notices has been deleted Successfully",
                noticesDeleted:(await result).deletedCount
            })
        }
    } catch (error) {
        return next(new HttpError(error.statusCode || 500, `An error occurred:${error.message}`))
    }
}
exports.getAllNoticesFromAClub = async (req, res, next) => {
    const clubId = req.params.clubId;
    try {
        const notices =await Notices.find({ clubId: clubId } ).populate('clubId')
        if(!notices){
            return new HttpError(404,`Not found`)
        }
        else{
            return res.status(200).json({
                status:'success',
                data:{
                    notices
                }
            })
        }
    } catch (error) {
        return next(new HttpError(error.statusCode || 500, `An error occured${error.message}`))
    }
}

exports.deleteNotice = async (req, res, next) => {
    const noticeId = req.params.noticeId;
    const clubId=req.params.clubId;
    try {
        const notice = await Notices.findByIdAndDelete(noticeId);
        if (!notice) {
            return next(new HttpError(404, "Not found"))
        }
        else {
            return res.status(202).json({
                status: 'success',
                message: "Notice has been deleted successfully"
            })
        }
    } catch (error) {
        return next( new HttpError(error.statusCode || 500, `An error occured:${error.message}`))
    }
}