const express = require('express');
const HttpError = require('../Models/HttpError');
const Clubadmin = require('../Models/clubAdmin');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/EmailSender'); 

const date = new Date().toLocaleDateString();

// Signup Feature for club admin
exports.SignUp = async (req, res, next) => {
    try {
        const { username, email, password, passwordConfirm } = req.body;

  
        const newClubadmin = await Clubadmin.create({
            username,
            email,
            password,
            passwordConfirm
        });

        
        const token = jwt.sign({ userId: newClubadmin._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        try {
           
            await sendEmail(email, token);

            
            res.status(201).json({
                status: 'success',
                timestamp: date,
                data: {
                    newClubadmin
                },
                message: `A verification link has been sent to ${email}. Please click on the link to verify your email.`
            });

        } catch (emailError) {
           
            console.error("Error sending verification email:", emailError);
            return next(new HttpError(500, `Error sending verification email: ${emailError.message}`));
        }

    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                status: 'fail',
                message: error.message
            });
        } else if (error.code === 11000) {
            return res.status(400).json({
                status: 'fail',
                message: "Username or Email already exists"
            });
        }

        return next(new HttpError(500, `An error occurred on the server: ${error.message}`));
    }
};
