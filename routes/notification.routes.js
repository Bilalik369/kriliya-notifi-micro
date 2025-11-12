import express from "express"; 
import {sendWelcomeEmail , sendBookingRequestNotification} from "../controllers/notification.controller.js"

const router = express.Router();


router.post("/welcome" ,sendWelcomeEmail )
router.post("/booking-request" ,sendBookingRequestNotification )


export default router;
