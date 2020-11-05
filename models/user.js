const  mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const Schema = mongoose.Schema;

const userSchema = new Schema ({
     
        name: {type: String, required: true, minlength:3},
        mobile: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        address: {type: String, required: false, default: ""},
        city: {type: String, required: false, default: ""},
        gps: {type: String, required: false, default: ""},
        image:{type: String, required: false, default: "https://via.placeholder.com/25"},
        password:{type: String, required: true, minlength:6},
        sender_id : [{type: String, required: false, maxlength: 11, default: ""}],
        purchase_history: [{
                date :{type:Date, default: Date.now()},
                amount: {type:Number, default: 0},
                description : {type: String, default:"Free Starting SMS"},
        }],
        total_sms: {type:Number, required:false, default: 5},
        sms_count: {type:Number, required:false, default: 0},
        account_active : {type: Number, default: 1},
        customers:[{type: mongoose.Types.ObjectId, required: true, ref :'Customer'} ]
});

 userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)      