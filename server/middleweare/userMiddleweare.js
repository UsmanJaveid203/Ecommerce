const userModel = require('../Model/LoginDetail');

module.exports = {
    signup: (req, res, next) => {
        let u_fname = req.body.u_fname;
        let u_sname = req.body.u_sname;
        let u_email = req.body.u_email;
        let u_password = req.body.u_password;
        let u_address = req.body.u_address;
        let u_role = req.body.u_role;

        const gmail_exp = /^([\w]*[\w\.]*(?!\.)@gmail.com)/;

        if (u_fname === '' || u_sname === '' || u_email === '' || u_password === '' || u_role === '' || u_address === '') {
            res.send({
                msg: "Fill all the fields......."
            })
        } else if (!u_email.match(gmail_exp)) {
            res.send({
                msg: "Incorrect Gamil......."
            })
        } else {
            userModel.findOne({ u_email: u_email })
                .then(data => {
                    if(data){
                        res.send({
                            msg: "Gamil Already exist......."
                        })
                    }else{
                        next();
                    }
                })
                .catch(err=>{
                    res.send(err);
                })
        }
    },

    signin:(req,res,next)=>{
        let u_email = req.body.email;
        let u_password = req.body.password;

        if(u_email === '' || u_password === ''){
            res.send({
                msg: "Fill all the fields......."
            })
        }else{
            next();
        }
    }
} 