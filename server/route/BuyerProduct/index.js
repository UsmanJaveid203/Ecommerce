const express = require('express');
const Auth = require('../../middleweare/Auth');
const buyerController = require('../../controller/buyerController');
const router = express.Router();


router.get('/SellerProduct/:id', buyerController.SellerProduct); 
router.get('/BuyerProduct/:id', buyerController.BuyerProduct);
router.get('/SellerProduct/:id/:page', buyerController.SellerProduct); 
router.get('/BuyerProduct/:id/:page', buyerController.BuyerProduct);
router.patch('/UpdateSellerProduct/:id', buyerController.UpdateSellerProduct);
router.delete('/DeleteSellerProduct/:id', buyerController.DeleteSellerProduct);
router.post('/BuyProduct/:id', buyerController.AddToDataBase);

module.exports = router; 