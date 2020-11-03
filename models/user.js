const  mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const Schema = mongoose.Schema;

const userSchema = new Schema ({
     
        name: {type: String, required: true, minlength:3},
        mobile: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        address: {type: String, required: true},
        city: {type: String, required: true},
        gps: {type: String, required: false},
        image:{type: String, required: false},
        password:{type: String, required: true, minlength:6},
        customers:[{type: mongoose.Types.ObjectId, required: true, ref :'Customer'} ]
});

 userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)      