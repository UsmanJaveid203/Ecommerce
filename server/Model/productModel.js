const mongoose = require('mongoose'); 

mongoose.Promise=global.Promise;

var ProductSchema =new mongoose.Schema({ 
    u_id:{
        type:String, 
    },
    p_name: {
        type:String, 
        required: true, 
    },
    p_price: {
        type:Number, 
        required: true, 
    },
    p_image: {
        type:String, 
        required: true, 
    },
    p_category:{
        type:String, 
        required: true, 
    },
    p_descrip: {
        type:String, 
        required: true, 
    },
    date:{
        type: Date, 
        default: Date.now 
    }
});
var productModel = mongoose.model('product_data', ProductSchema);
module.exports=productModel;

