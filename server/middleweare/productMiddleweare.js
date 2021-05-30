module.exports={
    checkInputField:(req,res,next)=>{
        let u_id = req.body.u_id;
        let p_name = req.body.p_name;
        let p_price = req.body.p_price;
        let p_image = req.body.p_image;
        let p_descrip = req.body.p_descrip;
        let p_category = req.body.p_category;

        if(p_name === '' ||p_price === '' ||p_image === '' ||p_descrip === ''|| p_category===''){
            res.send({
                msg: "Fill all the fields..........."
            })
        }else if(typeof(p_price) === 'number'){
            res.send({
                msg: "Enter Number In Price Field.............."
            })
        }else if(u_id === ''){
            res.send({
                msg: "Invalid User.............."
            })
        }else{
            next();
        }
    }
}