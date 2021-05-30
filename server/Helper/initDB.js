const mongoose= require('mongoose');

function initDB(){

    if(mongoose.connections[0].readyState){
        console.log("Already Connected");
        return 
    }

    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      });

    mongoose.connection.on('connected',()=>{
        console.log("Connected to mongodb")
    })

    mongoose.connection.on('error',(err)=>{
        console.log("Error in database ",err)
    })
}

module.exports= initDB;

