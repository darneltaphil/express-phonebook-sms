const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
//const uuid = require ("uuid/v5")

const DUMMY_USERS = [
    {
        id: "1",
        name: "Kof-Ano Akpadji",
        mobile: "0550563878",
        email: "daneltaphil@gmail.com",
        gps: "GD-143-9857",
        image:"https://via.placeholder.com/25",
        username: "admin",
        pwd : "1234"

    },
    {
        id: "2",
        name: "Kafui Mensah Gifty",
        mobile: "0541265854",
        email: "daneltaphil@gmail.com",
        address: "Dodowa Road",
        gps: "GD-143-9857",
        image:"https://via.placeholder.com/25",
        username: "admin2",
        pwd : "1234"
    }
]

const getUser = (req, res, next) => {

};



const createUser = (req, res, next) => {
    // const { name, mobile, email, address, city, gps, username ,pwd} = req.body;

    // const createdUser = {
    //     name,
    //     mobile,
    //     email,
    //     address,
    //     username, 
    //     pwd,
    //     gps,
    //     username,
    //     password
    // }
    // DUMMY_USERS.push(createdUser);

    // res.status(201).json({msg: createdUser})
};


exports.getUser = getUser;
exports.createUser = createUser; 