const BlogModelData = require('../Model/BlogModel');
var fs = require('fs');
const ItemPerPage = 12;

module.exports = {
    BlogPost: (req, res, next) => {
        let b_id = req.body.b_id;
        let b_name = req.body.b_name;
        let b_img = req.file.filename;
        let b_description = req.body.b_description;

        let Upload_data = new BlogModelData({
            b_id: b_id,
            b_name: b_name,
            b_img: b_img,
            b_description: b_description
        })
        Upload_data.save()
            .then(data => {
                res.send({
                    msg: "Blog Uploaded Successfully........"
                })
            })
            .catch(err => res.send(err));
    },


    GetBlog: (req, res, next) => {
        const page = +req.params.page || 1;
        let category = req.params.category;
        let totalItems, validate;

        if (category == 10) {
            validate = {}
        } else {
            validate = { b_id: category }
        }


        BlogModelData.find(validate)
            .countDocuments()
            .then(totalProduct => {
                totalItems = totalProduct;
                return BlogModelData.find(validate)
                    .sort({ _id: -1 })
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

    GetSpecificBlog: (req, res, next) => {
        const id = req.params.id;

        BlogModelData.find({ _id: id })
            .then(result => res.send(result))
            .catch(err => res.send(err))
    },

    UpdateSpecificBlog: (req, res, next) => {
        let b_img;
        let b_name = req.body.b_name;
        if (req.file) {
            b_img = req.file.filename;
        }

        let b_description = req.body.b_description;

        BlogModelData.findById(req.params.id, (err, data) => {
            data.b_name = (b_name) ? b_name : data.b_name;
            data.b_img = (b_img) ? b_img : data.b_img;
            data.b_description = (b_description) ? b_description : data.b_description;

            data.save()
                .then(result => {
                    res.send(result)
                })
                .catch(err => (err))
        })

    },

    DeleteBlog: (req, res, next) => {
        let id = req.params.id;
        let deleteRecord = BlogModelData.findByIdAndDelete(id);

        deleteRecord.exec()
            .then(data => {
                fs.unlinkSync(`./public/images/${data.b_img}`);
            }).catch((err) => {
                res.json(err);
            })
    }
} 