const productModel = require('../Model/productModel');
var fs = require('fs');
const ItemPerPage = 12;

module.exports = {
    UploadProduct: (req, res, next) => {
        let u_id = req.body.u_id;
        let p_name = req.body.p_name;
        let p_price = req.body.p_price;
        let p_image = req.file.filename;
        let p_descrip = req.body.p_descrip;
        let p_category = req.body.p_category;

        let Upload_data = new productModel({
            u_id: u_id,
            p_name: p_name,
            p_price: p_price,
            p_image: p_image,
            p_category: p_category,
            p_descrip: p_descrip
        })
        Upload_data.save()
            .then(data => {
                res.send({
                    msg: "Product Uploaded Successfully........"
                })
            })
            .catch(err => res.send(err));
    },

    GetProduct: (req, res, next) => {
        const page = +req.params.page || 1;
        let category = req.params.category;
        let totalItems, validate;

        if (category == 1) {
            validate = { p_category: "Clothes" }
        } else if (category == 2) {
            validate = { p_category: "Laptops" }
        } else if (category == 3) {
            validate = { p_category: "Phones" }
        } else if (category == 4) {
            validate = { p_category: "Shoes" }
        } else if (category == 5) {
            validate = { p_category: "Wallet" }
        } else if (category == 6) {
            validate = { p_category: "Watches" }
        } else {
            validate = { u_id: category }
        }

        productModel.find(validate)
            .countDocuments()
            .then(totalProduct => {
                totalItems = totalProduct;
                return productModel.find(validate)
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
    getSpecific: (req, res, next) => {
        const pro_id = req.params.id;
        productModel.find({ _id: pro_id })
            .then(result => {
                res.send(result)
            }).catch(err => {
                res.send(err)
            })
    },

    UpdateSpecific: (req, res, next) => {
        let p_image;
        let p_name = req.body.p_name;
        if (req.file) {
            p_image = req.file.filename;
        }
        let p_price = req.body.p_price;
        let p_category = req.body.p_category;
        let p_descrip = req.body.p_descrip;

        productModel.findById(req.params.id, (err, data) => {
            data.p_name = (p_name) ? p_name : data.p_name;
            data.p_image = (p_image) ? p_image : data.p_image;
            data.p_price = (p_price) ? p_price : data.p_price;
            data.p_category = (p_category) ? p_category : data.p_category;
            data.p_descrip = (p_descrip) ? p_descrip : data.p_descrip;

            data.save()
                .then(result => {
                    res.send(result)
                })
                .catch(err => (err))
        })
    },

    DeleteProduct:(req,res,next)=>{
        let id = req.params.id;
        let deleteRecord = productModel.findByIdAndDelete(id);

        deleteRecord.exec()
            .then(data => {
                fs.unlinkSync(`./public/images/${data.p_image}`);
            }).catch((err) => {
                res.json(err);
            })
    }

}