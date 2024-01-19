import express from "express"
import {generate,match} from "../controller/otp.js"

const router=express.Router();


router.post('/get',generate);
router.post('/verify',match);
    

export default router;