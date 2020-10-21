const  mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new Schema ({
    
        name: {type: String, required: true},
        mobile: {type: Number, required: true},
        email: {type: String, required: false},
        address: {type: String, required: false},
        city: {type: String, required: false},
        gps: {type: String, required: false},
        image:{type: String, required: false},
        un:{type: String, required: true},
        pwd:{type: String, required: true}
    
}); 
module.exports = mongoose.model('User', userSchema)