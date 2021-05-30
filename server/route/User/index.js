const express = require ('express');
const UserController = require('../../controller/userController');
const UserMiddleweare = require('../../middleweare/userMiddleweare');
const Auth = require('../../middleweare/Auth');
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

router.get('/getAllData',Auth, UserController.GetData);
router.get('/getAllData/:page',Auth, UserController.GetData);

router.get('/getData/:id',Auth, UserController.SpecificData);
router.patch('/updateData/:id',upload.single('u_image'),Auth, UserController.UpdateData);
router.delete('/delteData/:id',Auth, UserController.DeleteData);


router.post('/singup',UserMiddleweare.signup, UserController.SignUp);

router.post('/singin',UserMiddleweare.signin, UserController.SignIn);


module.exports= router; 