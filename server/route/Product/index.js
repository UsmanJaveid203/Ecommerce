const express = require('express');
const Auth = require('../../middleweare/Auth');
const productController = require('../../controller/productController');
const productMiddleweare = require('../../middleweare/productMiddleweare');
const router = express.Router();
const multer = require('multer');

var storage = multer.diskStorage({
    destination: "./public/images",
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})
const filefilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
var upload = multer({
    storage: storage,
    fileFilter: filefilter
});

 
router.post('/upload_data', upload.single('p_image'), Auth, productMiddleweare.checkInputField, productController.UploadProduct);

router.delete('/delete_data/:id', Auth, productController.DeleteProduct);


router.patch('/update_specific_data/:id', upload.single('p_image'), Auth, productController.UpdateSpecific);
router.get('/specific_data/:id', productController.getSpecific);
router.get('/get_data/:category', productController.GetProduct);
router.get('/get_data/:category/:page', productController.GetProduct);


module.exports = router; 