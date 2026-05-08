import express from "express"; 
import {
  sendWelcomeEmail,
  sendBookingRequestNotification,
  sendBookingConfirmedNotification,
  sendBookingRejectedNotification,
  sendBookingCancelledNotification,
  sendItemPendingApprovalNotification,
} from "../controllers/notification.controller.js"

const router = express.Router();


router.post("/welcome" ,sendWelcomeEmail )
router.post("/item-pending", sendItemPendingApprovalNotification)
router.post("/booking-request" ,sendBookingRequestNotification )
router.post("/booking-confirmed" ,sendBookingConfirmedNotification )
router.post("/booking-rejected" ,sendBookingRejectedNotification )
router.post("/booking-cancelled" ,sendBookingCancelledNotification  )


export default router;
