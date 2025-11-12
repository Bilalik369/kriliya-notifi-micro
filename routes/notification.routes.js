import express from "express"; 
import {sendWelcomeEmail , sendBookingRequestNotification,sendBookingConfirmedNotification} from "../controllers/notification.controller.js"

const router = express.Router();


router.post("/welcome" ,sendWelcomeEmail )
router.post("/booking-request" ,sendBookingRequestNotification )
router.post("/booking-confirmed" ,sendBookingConfirmedNotification )


export default router;
