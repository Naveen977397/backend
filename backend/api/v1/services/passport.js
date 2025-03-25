import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import bcrypt from "bcryptjs";
import { finduserbyEmail } from "./uerServices.js";

passport.use(new LocalStrategy({
    usernameField: 'email',
},
  async (email,password,done)=>{
    try {
        const user = await finduserbyEmail(email);
        if(!user){
            return done(null,false,{message: 'No user found'});
        }
        const isValid = await bcrypt.compare(password,user.password);
        if(!isValid){
            return done(null,false,{message: 'invalid credentials'});
        }
        return done(null,user);
    } catch (error) {
        return done(error);
    }
  })
);

passport.serializeUser((user,done)=>{
    console.log("serialize user");
    done(null,user.email);
});

passport.deserializeUser(async(email,done)=>{
    try {
        console.log("deserialize user");
        const user = await finduserbyEmail(email);
        done(null,user);                
    } catch (error) {
        done(error,null);
    }
});

export default passport;

