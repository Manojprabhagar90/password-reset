const express = require('express');
const userAuthControllers = require('../controllers/userAuthControllers');

userAuthroutes = express.Router();

userAuthroutes.post('/',userAuthControllers.forget_password);
userAuthroutes.get('/:token',userAuthControllers.reset_password_link);
userAuthroutes.post('/reset_submit',userAuthControllers.reset_password_submit);

module.exports = userAuthroutes;