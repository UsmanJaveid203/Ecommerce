const mongoose = require('mongoose'); 

mongoose.Promise=global.Promise;

var UserSchema =new mongoose.Schema({
    u_fname: {
        type:String, 
        required: true, 
    },
    u_sname: {
        type:String, 
        required: true, 
    },
    u_email: {
        type:String, 
        required: true, 
    },
    u_password: {
        type:String, 
        required: true, 
    },
    u_address: {
        type:String, 
        required: true, 
    },
    u_image: {
        type:String
    },
    u_role: {
        type:String, 
        required: true,
    },
    date:{
        type: Date, 
        default: Date.now 
    }
});

var userModel = mongoose.model('user_data', UserSchema);
module.exports=userModel;
