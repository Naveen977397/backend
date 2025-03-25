import express from 'express';
import doctorController from './controllers/doctorController.js';
import{signup, login} from './controllers/userController.js';
import { ensureAuthenticated } from './middlewares/middleware.js';


const router = express.Router();


router.get('/',(req,res)=>{
    res.send('Hello World');
});

router.use('/doctors',doctorController);

router.post('/signup',signup);

router.post('/login',login);

router.get("/status", (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ authenticated: true, user: req.user });
    } else {
      res.status(401).json({ authenticated: false });
    }
  });

router.post('/logout', (req, res) => {
    req.logout(() => {
        req.session.destroy();
        res.clearCookie('connect.sid');
        res.send({ message: 'Logged out' });
    });
});


// Apply middleware to protect the appointment route
router.get('/appointment', ensureAuthenticated, (req, res) => {
  res.json({ message: `Welcome to your appointment, ${req.user.email}` });
});

  


  

export default router;
