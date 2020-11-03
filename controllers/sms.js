const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const Customer = require('../models/customer');

var urlencode = require('urlencode');
const axios = require('axios')

const sendSms = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
            return next(
                    new HttpError('Invalid inputs passed, please check your data.', 422)
                );
            }

    const { number, message } = req.body;
    const endpoint = process.env.SMS_API+'to=233'+number+'&text='+message
    //console.log(endpoint)
    await axios.post(endpoint)
    .then(response => {
        const r = response.data
        if(r){
            res.json({ msg : "SMS sent Successfully" }); 
            
        }
    })
        }


const sendSmsAll = async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                    return next(
                            new HttpError('Invalid inputs passed, please check your data.', 422)
                        );
                    }
        
            const { message } = req.body;
            let allCustomers;
            try {
                allCustomers = await Customer.find();
            } catch (err) {
              const error = new HttpError(
                'Something went wrong, could not find the all customers.',
                500
              );
              return next(error);
            }
          
            if (!allCustomers) {
              const error = new HttpError(
                'You have no contacts',
                404
              );
              return next(error);
            }
          
            allCustomers.map( c =>{
            const endpoint = process.env.SMS_API+'to=233'+c.mobile+'&text='+message
            console.log(endpoint)
             axios.post(endpoint)
            .then(response => {
                const r = response.data
                if(r){
                    res.json({ msg : "SMS sent Successfully" }); 
                }
            })
            })
                }



    exports.sendSmsAll = sendSmsAll;
    exports.sendSms = sendSms;
