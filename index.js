const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('DB connected successfully...');
    app.listen(process.env.PORT,()=>{
        console.log('I am listening your request...');
        
    })
}).catch((e)=>{
    console.error('Could not connect to MongoDB...', e)
})