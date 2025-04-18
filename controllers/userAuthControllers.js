const email_templates = require('../email_templates/email_template');
const common_utils = require('../utils/common_utils');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");


const userAuthControllers = {
    forget_password : async(request,response)=>{
       
        const { mailId } = request.body;
        console.log(mailId);
        console.log("hi");
        
        const user = await User.findOne({ username: mailId });

        if (!user) {
            return response.status(400).json({ message: 'User not registered' });
         }

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
            if (!user) {
                return response.status(400).json({ message: 'Token expired' });
             }
            response.status(200).json({success:true,userId:user._id});
    },
    reset_password_submit : async(request,response)=>{
        const { id,password } = request.body.userpassword;
        
        const user = await User.findOne({ _id: id });
        user.password_reset_token = "";
        const encrypted_password = await bcrypt.hash(password,10);
        user.password = encrypted_password;
        await user.save();
        response.status(200).json({success:true,message:'Password is reset'});
    },
    userRegister : async(request,response) =>{
        try{
         const { username , password } = request.body.userpassword;
 
 
         const userExists = await User.findOne({ username : username});
  
         if (userExists) {
            return response.status(400).json({ message: 'User already exists' });
         }
  
  
         const encrypted_password = await bcrypt.hash(password,10);
         const newUser = new User({
            username,
              password: encrypted_password
          });
  
          await newUser.save();
  
          return response.status(201).json({ message: 'User created successfully' });
       }catch(error){
         return response.status(500).json({ message: error.message });
       }
 
 
     },
     login : async(request,response)=>{
        try{
            const {  username , password } = request.body.user;
             const login_user = await User.findOne({ username:username});

            if(!login_user){
                return response.status(400).json({message:"Invalid Username..."})
            }


            const check_password = await bcrypt.compare(password,login_user.password);

            if(!check_password){
                return response.status(400).json({message:"Invalid Password..."})
            }

            const token = jwt.sign({id:login_user._id},process.env.JWT_SECRET);
 
            return response.status(200).json({message:`Login successfull...`,token});
        }catch(error){
            return response.status(500).json({ message : error.message })
        }
    }
}

module.exports = userAuthControllers;