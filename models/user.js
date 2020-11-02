const  mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;


const userSchema = new Schema ({
     
        name: {type: String, required: true},
        mobile: {type: Number, required: true},
        email: {type: String, required: true, unique: true},
        address: {type: String, required: true},
        city: {type: String, required: true},
        gps: {type: String, required: true},
        image:{type: String, required: true},
        pwd:{type: String, required: true, minlength:6},
        contacts:[{
                name: {type: String, required: true},
                mobile: {type: Number, required: true},
                email: {type: String, required: true, unique: true},
                address: {type: String, required: true},
                city: {type: String, required: true},
                gps: {type: String, required: true},
                image:{type: String, required: true}
                 }]
});

 userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)