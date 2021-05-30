const express = require('express');
const Auth = require('../../middleweare/Auth');
const cartController = require('../../controller/cartController');
const router = express.Router();

router.get('/product/get_from_cart', cartController.GetFormCart);
router.patch('/product/update_cart/:id', cartController.UpdateCart);
router.patch('/removeData/:index', cartController.RemoveFromCart);
router.post('/product/add_to_cart', cartController.AddToCart);

router.post('/payment', cartController.PaymentMethod)

module.exports = router; 