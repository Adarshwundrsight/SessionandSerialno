import {Session} from "../models/SessionLog.js"


export const sessionlog =async (req,res)=>{
    try{
        const {UniqueID, SessionID,SessionStartTime,SessionEndTime,SessionStartRating
        , SessionEndRating ,SessionScene , SessionGuided , SessionLength,DeviceId}=req.body;
       
        await Session.create({UniqueID,SessionID,SessionStartTime,SessionEndTime,SessionStartRating
        , SessionEndRating ,SessionScene , SessionGuided , SessionLength,DeviceId});

        res.status(201).json({
            success:true,
            message:"session create ",
        });

    }
    catch(error)
    {
        res.status(401).json({
            message: "Something went wrong",
            success: false,
          
        });
        console.log(error);
    }
};

// get json formated data 

    export const getsession = async (req, res) => {
        try {
            const { UniqueID, key } = req.body;
            const sec = process.env.SEC_KEY;
            
            const sessionResult = await Session.find({ UniqueID });
            console.log(sessionResult);
            if(sec==key && sessionResult)
                res.send({
                    result: sessionResult
                });
            else
            {
                res.status(401).json({
                    message: "Wrong credentials ",
                    success: false,
                });
            }
        } catch (error) {
            res.status(401).json({
                message: "Wrong credentials ",
                success: false,
            });
            console.error(error);
        }
    };
    
