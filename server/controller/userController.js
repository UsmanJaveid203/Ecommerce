const userModel = require('../Model/LoginDetail');
const bcrypt = require('bcrypt');
var fs = require('fs');
const jwt = require('jsonwebtoken');
const ItemPerPage = 10;

module.exports = {
    GetData: (req, res, next) => {
        const page = +req.params.page || 1;
        let totalItems;

        userModel.find({})
            .countDocuments()
            .then(totalProduct => {
                totalItems = totalProduct;
                return userModel.find({})
                    .skip((page - 1) * ItemPerPage)
                    .limit(ItemPerPage);
            })
            .then(result => {
                res.send({
                    data: result,
                    currentPage: page,
                    hasNextPage: ItemPerPage * page < totalItems,
                    hasPreviousPage: ItemPerPage * page > ItemPerPage,
                    nextPage: page + 1,
                    previousPage: page - 1,
                    lastPage: Math.ceil(totalItems / ItemPerPage)
                })
            })
            .catch(err => res.send(err))
    },

    SpecificData: (req, res, next) => {
        userModel.findOne({ _id: req.params.id })
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.send(err);
            })
    },
    SignUp: (req, res, next) => {
        let u_fname = req.body.u_fname;
        let u_sname = req.body.u_sname;
        let u_email = req.body.u_email;
        let u_password = req.body.u_password;
        let u_address = req.body.u_address;
        let u_role = req.body.u_role;

        bcrypt.hash(u_password, 15, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                let uploadData = new userModel({
                    u_fname: u_fname,
                    u_sname: u_sname,
                    u_email: u_email,
                    u_password: result,
                    u_address:u_address,
                    u_role: u_role
                })
                uploadData.save()
                    .then(data => {
                        res.send({
                            msg: "data Inserted Successfully",
                            path: "/SignIn"
                        })
                    })
                    .catch(err => {
                        res.send(err);
                    })
            }
        })
    },

    SignIn: (req, res, next) => {
        let u_email = req.body.u_email;
        let u_password = req.body.u_password;

        userModel.findOne({ u_email: u_email })
            .then(user => {
                if (user) {
                    bcrypt.compare(u_password, user.u_password, (err, domatch) => {
                        if (domatch) {
                            var token = jwt.sign({ u_id: user._id, u_role: user.u_role },
                                process.env.SECRET_KEY
                            );
                            res.cookie('token', token, {
                                httpOnly: false
                            });
                            res.send({
                                msg: "Login Successfully..........",
                                type: true,
                                path: "/"
                            })
                        } else {
                            res.send({
                                msg: "Incorrect Data......",
                            })
                        }
                    })
                } else {
                    res.send({
                        msg: "Incorrect Data......",
                    })
                }
            })
    },

    UpdateData: (req, res, next) => {
        let password,u_image;
        let u_fname = req.body.u_fname;
        let u_sname = req.body.u_sname;
        let u_email = req.body.u_email;
        let u_address = req.body.u_address;
        let u_password = req.body.u_password;
        if(req.file){
            u_image = req.file.filename;
        }
        let u_role = req.body.u_role;

        if (u_password) {
            password = bcrypt.hashSync(u_password, 15);
        }

        userModel.findById(req.params.id, (err, data) => {

            data.u_fname = u_fname ? u_fname : data.u_fname;
            data.u_sname = u_sname ? u_sname : data.u_sname;
            data.u_email = u_email ? u_email : data.u_email;
            data.u_password = password ? password : data.u_password;
            data.u_address = u_address ? u_address : data.u_address;
            data.u_image = u_image ? u_image : data.u_image;
            data.u_role = u_email ? u_role : data.u_role;

            data.save()
                .then(result => {
                    res.send(result)
                })
                .catch(err => (err))
        })
    },
    DeleteData:(req,res,next)=>{
        let id = req.params.id;
        let deleteRecord = userModel.findByIdAndDelete(id);

        deleteRecord.exec()
            .then(data => {
                fs.unlinkSync(`./public/images/${data.u_image}`);
            }).catch((err) => {
                res.json(err);
            })
    }
}