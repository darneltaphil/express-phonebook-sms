const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');

const User = require("../models/user");

const getUser = async (req, res, next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //         const error = new HttpError('Invalid inputs passed, please check your data.', 422)
    //         return next(error);
    //     }

    // const {  email, password } = req.body;
    
    let users
    try {
        users = await User.find({},'-pwd')
        // users = await User.find({},'-pwd')
    }catch(err){
        const error = new HttpError("Fetching users failed", 500);
        return next(error)
    }

    // if(!existingUser || existingUser.password !== password ){
    //     const error = new HttpError('Email and Password do not match', 401);
    //     return next(error)
    // }

    res.status(201).json({users: users.map(user => user.toObject({getters: true}))})
};


const login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
            const error = new HttpError('Invalid inputs passed, please check your data.', 422)
            return next(error);
        }

    const {  email, password } = req.body;
    
    let existingUser
    try {
            existingUser = await User.findOne({email: email})
    }catch(err){
        const error = new HttpError("Login failed, please try again later", 500);
        return next(error)
    }
 
    if(!existingUser  ){
        const error = new HttpError('User Does not exist', 401);
        return next(error)
    }

    res.status(201).json({msg: "User Logged in successfully"})
};


const signUp = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
            return next(
                    new HttpError('Invalid inputs passed, please check your data.', 422)
                );
            }
    const { name, mobile, email, address, city, gps, image, pwd } = req.body;
    
    let existingUser
    try {
            existingUser = await User.findOne({email: email})
    }catch(err){
        const error = new HttpError("Signing Up failed, please try again later", 500);
        return next(error)
    }

    if(existingUser){
        const error = new HttpError('User exists already, please log in', 422);
        return next(error)
    }
   
        const createdUser = new User({
                                        name,
                                        mobile,
                                        email,
                                        address,
                                        city,
                                        gps,
                                        image:"https://via.placeholder.com/25",
                                        pwd,
                                        
                                    })


        try {
            await createdUser.save() ;
        }catch (err){
            const error = new HttpError('Signing up failed', 500);
            return next(error)
        }
        res.status(201).json({msg: "User Created successfully"})
    };





    exports.getUser = getUser;
    exports.login = login;
    exports.signUp = signUp; 