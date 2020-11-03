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
        creator: {type: mongoose.Types.ObjectId, required: true, ref :'User' }
    
}); 
module.exports = mongoose.model('Customer', customerSchema)