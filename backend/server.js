import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import api from './api/index.js';
import passport from './api/v1/services/passport.js';
import session from 'express-session';
// import passport from 'passport';
dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",  
    credentials: true 
}));


app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, sameSite:"lax",httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }
    })
)

app.use(passport.initialize());
app.use(passport.session());

app.use('/api',api);


app.listen(process.env.serverPort,()=>{
    console.log(`app running on port ${process.env.serverPort}`);
});
