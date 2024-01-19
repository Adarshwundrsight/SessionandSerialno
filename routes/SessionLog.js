import express from "express"
import {sessionlog,getsession} from "../controller/SessionLog.js"

const router=express.Router();


router.post('/newsession',sessionlog);
router.post('/getsession',getsession);
    

export default router;