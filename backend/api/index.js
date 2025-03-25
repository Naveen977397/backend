import express from 'express';
import v1 from './v1/index.js';
const router = express.Router();
 

router.get('/',(req,res)=>{
    res.send('Hello World');
});

router.use('/v1',v1);

export default router;