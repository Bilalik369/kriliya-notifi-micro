import express from "express"; 
import {sendWelcomeEmail} from "../controllers/notification.controller.js"

const router = express.Router();


router.post("/welcome" ,sendWelcomeEmail )

export default router;
