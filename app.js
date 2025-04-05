const express = require('express');
const cors = require('cors');
const userAuthRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1/forgot_password',userAuthRoutes);
app.use('/api/v1/reset_password',userAuthRoutes);

// app.get('/api/v1/reset_password/:token',(req,res)=>{
//     console.log("manoj");
    
// });

module.exports = app;