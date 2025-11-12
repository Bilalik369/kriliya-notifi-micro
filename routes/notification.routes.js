import express from "express"; 
import {sendWelcomeEmail , sendBookingRequestNotification,sendBookingConfirmedNotification,sendBookingRejectedNotification, sendBookingCancelledNotification } from "../controllers/notification.controller.js"

const router = express.Router();


router.post("/welcome" ,sendWelcomeEmail )
router.post("/booking-request" ,sendBookingRequestNotification )
router.post("/booking-confirmed" ,sendBookingConfirmedNotification )
router.post("/booking-rejected" ,sendBookingRejectedNotification )
router.post("/booking-cancelled" ,sendBookingCancelledNotification  )


export default router;
