const email_templates = require('../email_templates/email_template');
const common_utils = require('../utils/common_utils');
const User = require('../models/users');
const jwt = require('jsonwebtoken');

const userAuthControllers = {
    forget_password : async(request,response)=>{
       
        const { mailId } = request.body;
        console.log(mailId);
        
        const user = await User.findOne({ email: mailId });

        const username = user.username.charAt(0).toUpperCase() + user.username.slice(1);
        const random_string = common_utils.generate_random_string(16);
        user.password_reset_token = random_string;
        await user.save();
        const token = jwt.sign({ username : user.username, random_string }, process.env.JWT_SECRET,);
        const email_template = email_templates.forgot_password_template(username,token);
        const email_body = email_template.body;
        const email_subject = email_template.subject;
        const email_to = mailId;
        common_utils.email_send(email_to,email_subject,email_body);
        console.log('Forgot password...');
        response.status(200).json({success:true,message:'Link to password reset sent to your mail'});
    },
    reset_password_link : async(request,response)=>{
            const token = request.params.token;
            console.log(token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const username = decoded.username;
            const random_string = decoded.random_string;
            
            
            const user = await User.findOne({ password_reset_token: random_string,username });
            
            response.json({success:true,userId:user._id});
    },
    reset_password_submit : async(request,response)=>{
        const { id,password } = request.body.userpassword;
        console.log(id,password);
        
        const user = await User.findOne({ _id: id });
        user.password_reset_token = "";
        user.password = password;
        await user.save();
        response.status(200).json({success:true,message:'Password is reset'});
    }
}

module.exports = userAuthControllers;
