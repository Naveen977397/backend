import {createUser, finduserbyEmail} from '../services/uerServices.js'
import bcrypt from 'bcryptjs';
import passport from '../services/passport.js';

export const signup = async (req,res) => {
    try {
        const{user_name,email,password} = req.body;
        const user = await finduserbyEmail(email);
        if(user){
            return res.status(400).send({message : "user already exists"});
        }
        const newuser = await createUser(user_name,email,password);
        return res.status(200).send({message: "user created successfully" , data : newuser});
    } catch (error) {
        res.status(400).send({message : error.message || "unknown error"});
    }
};


export const login = async(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err){
            return res.status(500).send({message : 'internal server error'});
        }
        if(!user){
            return res.status(400).send({message : 'invalid credentials'});
        }
        req.logIn(user,(err)=>{
            if(err){
                return res.status(500).send({message : 'internal server error'});
            }
            return res.status(200).send({message : 'login successful'});
        });
    })(req,res,next);
}