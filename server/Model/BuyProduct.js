const mongoose = require('mongoose'); 

mongoose.Promise=global.Promise;

var BuysSchema =new mongoose.Schema({ 
    buyer_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_data'
    },
    seller_id:{
        type: String,
        required : true
    },
    items:{
        type: Array,
        required: true
    },
    status: {
        type:Number, 
        default : 1
    },
    totalPrise: {
        type:Number, 
        required: true, 
    },
    date:{
        type: Date, 
        default: Date.now 
    }
});
var BuyerModelData = mongoose.model('cart_data', BuysSchema);
module.exports=BuyerModelData;