import express from 'express';
import { approveAppointment, declineAppointment, updateSameTimeAppointments, addDoctor, deleteDoctor, getAllAppointment} from '../services/adminServices.js';

const router = express.Router();
//approve appointment
router.post("/approve", async (req, res) => {
  try {
    const {appointment_id} = req.body;

    const response = await approveAppointment(appointment_id);

    if (response.success) {
      const{appointment_date, appointment_time, doctor_id} = response;
      const result = await updateSameTimeAppointments(appointment_date,appointment_time,doctor_id);
      if(result.success){
        console.log("result datat after approving conflicting" , result.data);
        return res.status(200).send(response);
      }
      else {
        throw new Error('error in updating conflicting appointments');
      }
      
    } else {
      throw new Error('error in approving appointments');
    }
    

  } catch (err) {
    console.error("Error occurred:", err.message);
    return res.status(400).send({ message: err.message || "Unknown error" });
  }
});

//decline appointment
router.post('/decline', async (req, res) => {
    try {
        const { appointment_id } = req.body;
        const response = await declineAppointment(appointment_id);
        if(response.success){
            return res.status(200).send({data : response.data});
        }else throw new Error('error in declining appointment');
    } catch (err) {
        console.error("error occured", err.message);
        return res.status(400).send({message : err.message || "unknown error"});
    }
});
export default router;


//add doctor
router.post('/add', async (req, res) => {
  try {
    console.log('inside add doc controller');
    
      const doctor_data = req.body;
      const response = await addDoctor(doctor_data);
      if(response.success){
          return res.status(200).send({data : response.data});
      }else throw new Error('error in adding doctor');
  } catch (err) {
      console.error("error occured", err.message);
      return res.status(400).send({message : err.message || "unknown error"});
  }
});

//delete doctor
router.delete('/delete', async (req, res) => {
  try {
      const {doc_id} = req.body;
      const response = await deleteDoctor(doc_id);
      if(response.success){
          return res.status(200).send({data : response.data});
      }else throw new Error('error in deleting doctor');
  } catch (err) {
      console.error("error occured", err.message);
      return res.status(400).send({message : err.message || "unknown error"});
  }
});


router.get('/appointments', async(req,res)=>{
  try{
    const result = await getAllAppointment();
    if(result.success){
      res.status(200).json(
        {
          success: true,
          data:result.data,
        }
      )
    }else throw new Error('error in get api')
  } catch(err){
    return res.status(500).json({message:err.message});
  }
});