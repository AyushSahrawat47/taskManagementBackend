import jwt from 'jsonwebtoken';
import User from '../models/User.model'
import generateOTP from '../utils/OTP.utils'

exports.register = async (req, res) =>{
    try{
        const{name, email, password, phone} = req.body;

        if(!name || !email || !password){
            return res.staus(400).send("Please fill all the required fields")
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).send(`User with ${email} already exists!`)
        }

        let avatar = '';
        if(req.file && req.file.path){
            avatar = req.file.path
        }

        let OTP = generateOTP();
    
        const user = new User({
            name,
            email,
            password,
            avatar,
            phone,
            OTP
        });

        await user.save();
        const token = jwt.sign({id:user._id, email:user.email}, process.env.JWT_SECRET, {expiresIn:'1h'});
        res.status(201).json({message: "User registered successfully", token});

    }catch(err){
        console.error(err.message);
        return res.status(500).send("Internal Server Error!")
    }
}