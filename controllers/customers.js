const HttpError = require('../models/http-error');

const uuid = require ("uuid")

const DUMMY_USERS = [
    {
        id: "1",
        name: "Kof-Ano Akpadji",
        mobile: "0550563878",
        email: "daneltaphil@gmail.com",
        gps: "GD-143-9857",
        image:"https://via.placeholder.com/25"

    },
    {
        id: "2",
        name: "Kafui Mensah Gifty",
        mobile: "0541265854",
        email: "daneltaphil@gmail.com",
        address: "Dodowa Road",
        gps: "GD-143-9857",
        image:"https://via.placeholder.com/25"

    }
]

const getCustomer = (req, res, next) => {
    const user = DUMMY_USERS.find(c => {
        return c.name === userName;
    });
    
    if (!user) {
    throw   new HttpError('Could not find a user for the provided user id.', 404)
    
    }
      res.json({ hi: user}) 
};

const getCustomerByName = (req, res, next) => {
    const userName = req.params.name ;
    console.log(userName);

    const user = DUMMY_USERS.find(c => {
        return c.name === userName;
    });
    
    if (!user) {
        throw   new HttpError('Could not find a user for the provided user id.', 404)
    }

    res.json({ hi: user}) 
};

const createCustomer = (req, res, next) => {
    const { name, mobile, email, address, gps} = req.body;

    const createdCustomer = {
        id : uuid(),
        name,
        mobile,
        email,
        address,
        gps
    }
    DUMMY_USERS.push(createdCustomer);

    res.status(201).json({msg: createdCustomer})
};


exports.getCustomer = getCustomer;
exports.getCustomerByName = getCustomerByName;
exports.createCustomer = createCustomer;