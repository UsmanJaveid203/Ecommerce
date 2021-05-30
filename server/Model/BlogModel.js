const mongoose = require('mongoose'); 

mongoose.Promise=global.Promise;

var BlogSchema =new mongoose.Schema({ 
    b_id:{
        type:String, 
    },
    b_name: {
        type:String, 
        required: true, 
    },
    b_img: {
        type:String, 
        required: true, 
    },
    b_description: {
        type:String, 
        required: true, 
    },
    date:{
        type: Date, 
        default: Date.now 
    }
});
var BlogModelData = mongoose.model('blog_data', BlogSchema);
module.exports=BlogModelData;



