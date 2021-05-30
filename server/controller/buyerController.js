const BuyerModelData = require('../Model/BuyProduct');
const ItemPerPage = 2;

exports.AddToDataBase = (req, res, next) => {
    let UploadData = new BuyerModelData({
        buyer_id: req.params.id,
        seller_id: req.session.cart.items[0].item.u_id,
        items: req.session.cart.items,
        totalPrise: req.session.cart.totalPrise
    })

    UploadData.save()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })


    req.session.destroy((err) => {
        if (err) {
            return console.log(err)
        }
    });
}

exports.BuyerProduct = (req, res, next) => {
    const page = +req.params.page || 1;
    let buyerID = req.params.id;
    console.log(buyerID)
    let totalItems;

    BuyerModelData.find({ buyer_id: buyerID })
        .countDocuments()
        .then(totalProduct => {
            totalItems = totalProduct;
            return BuyerModelData.find({ buyer_id: buyerID })
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

}

exports.SellerProduct = (req, res, next) => {
    const page = +req.params.page || 1;
    let SellerID = req.params.id;
    console.log(SellerID)
    let totalItems;

    BuyerModelData.find({ seller_id: SellerID })
        .countDocuments()
        .then(totalProduct => {
            totalItems = totalProduct;
            return BuyerModelData.find({ seller_id: SellerID })
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
}

exports.UpdateSellerProduct = (req, res, next) => {
    let value = req.body.val;
    BuyerModelData.findById(req.params.id, (err, data) => {
        data.buyer_id = data.buyer_id,
            data.seller_id = data.seller_id,
            data.items = data.items,
            data.totalPrise = data.totalPrise
        data.status = (value) ? value : data.status

        data.save()
            .then(result => {
                res.send(result)
            })
            .catch(err => (err))
    })
}

exports.DeleteSellerProduct = (req, res, next) => {
    let id = req.params.id;
    let deleteRecord = BuyerModelData.findByIdAndDelete(id);

    deleteRecord.exec()
        .then(data => {
            res.send(data)
        }).catch((err) => {
            res.json(err);
        })
} 
