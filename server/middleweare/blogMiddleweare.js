module.exports={
    checkInputField:(req,res,next)=>{
        let b_id = req.body.b_id;
        let b_name = req.body.b_name;
        let b_img = req.body.b_img;
        let b_description = req.body.b_description;

        if(b_name === '' ||b_img === '' ||b_description === '' ){
            res.send({
                msg: "Fill all the fields............."
            })
        }else if(b_id === ''){
            res.send({
                msg: "Invalid User..............."
            })
        }else{
            next();
        }
    }
} 