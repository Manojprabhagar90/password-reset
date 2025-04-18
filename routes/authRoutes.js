const express = require('express');
const multer = require('multer')
const userAuthControllers = require('../controllers/userAuthControllers');

userAuthroutes = express.Router();

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'Uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({
    storage : storage
})

userAuthroutes.post('/',userAuthControllers.forget_password);
userAuthroutes.get('/:token',userAuthControllers.reset_password_link);
userAuthroutes.post('/reset_submit',userAuthControllers.reset_password_submit);
userAuthroutes.post('/register_submit',upload.single('file'),userAuthControllers.userRegister);
userAuthroutes.post('/login',upload.single('file'),userAuthControllers.login);

module.exports = userAuthroutes;