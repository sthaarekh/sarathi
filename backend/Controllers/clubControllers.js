const express = require('express');
const HttpError = require('../Models/HttpError');
const Clubadmin = require('../Models/clubAdmin');


const date = new Date().toISOString();

// Signup Feature for club admin
exports.SignUp = async (req, res, next) => {
    try {
        const { username, email, password, passwordConfirm } = req.body;

        // Create new club admin
        const newClubAdmin = await Clubadmin.create({
            username,
            email,
            password,
            passwordConfirm
        });

        
        await newClubAdmin.save();

        return res.status(201).json({
            status: 'success',
            timestamp: date,
            data: {
                newClubAdmin
            }
        });
        
    } catch (error) {
        if (error.name === "ValidationError") { 
            return res.status(400).json({
                status: 'fail',
                message: error.message
            });
        }
        return new HttpError(500, `An error occurred on the server: ${error}`);
    }
};
