const express = require('express');
const Auth = require('../../middleweare/Auth');
const blogController = require('../../controller/blogController');
const blogMiddleweare = require('../../middleweare/blogMiddleweare');
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


router.post('/upload_data', upload.single('b_img'), Auth, blogMiddleweare.checkInputField, blogController.BlogPost);

router.get('/specific_blog/:id', blogController.GetSpecificBlog);

router.patch('/Update_specific_blog/:id', upload.single('b_img'), Auth, blogController.UpdateSpecificBlog);
router.delete('/Delete_record/:id', Auth,blogController.DeleteBlog)

router.get('/get_blog/:category', blogController.GetBlog);
router.get('/get_blog/:category/:page', blogController.GetBlog); 

module.exports = router;