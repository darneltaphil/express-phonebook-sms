const  mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema ({
    
        name: {type: String, required: true},
        mobile: {type: String, required: true},
        email: {type: String, required: false},
        address: {type: String, required: false},
        city: {type: String, required: false},
        gps: {type: String, required: false},
        image:{type: String, required: false},
        creator: {type: String, required: false}
    
}); 
module.exports = mongoose.model('Customer', customerSchema)