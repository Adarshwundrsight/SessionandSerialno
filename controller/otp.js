import { OTP } from "../models/otp.js";

export const generate = async (req, res) => {
    function generateUnique() {
        const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let uniquecode = "";

        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * character.length);
            uniquecode += character.charAt(randomIndex);
        }
        return uniquecode;
    }

    try {
        const {codetype}=req.body;
      
        let code='';
        if(codetype=='Y')
        {
            code='Y'+generateUnique();
        }
        else if(codetype=='M')
        {
            code='M'+generateUnique();
        }
        else
        {
            res.status(401).json({
                message: "Select type",
                success: false,
               
            });
        }
        while(1)
        {
            
            const otp = await OTP.findOne({code,codetype});

            if (!otp) {
                await OTP.create({code,codetype})
                console.log("got SerialNo",code);
                return res.json({ code: code});
            }
            else
            {
                code=generateUnique()
            }
        }

       
       
    } catch (error) {
        res.status(401).json({
            message: "Something went wrong",
            success: false,
            user: req.user,
        });
        console.log(error);
    }
};

export const match=async(req,res)=>{
    try{
        const {code}=req.body;
        const otpmatch= await OTP.findOne({code});
        console.log(otpmatch)
        
        if(otpmatch){
            if(otpmatch.codetype=='Y' && otpmatch.count<=600)
            {
                otpmatch.count++;
                await otpmatch.save();
                return res.status(201).json({
                    success:true,
                    message:"Yearly SerialNo Match",
                });
            }
            else if(otpmatch.codetype=='M' && otpmatch.count<=50)
            {
                otpmatch.count++;
                await otpmatch.save();
                return res.status(201).json({
                    success:true,
                    message:"Monthly SerialNo Match",
                });
  
            }
            else
            {
                res.status(401).json({
                    message:"session expire",
                    success:false,
                   
                })
            }
        }
        else
        {
            res.status(401).json({
                message:"wrong SerialNo",
                success:false,
                user:req.user,
            })
        }
    }
    catch(error){
        res.status(401).json({
            message:"wrong SerialNo",
            success:false,
            user:req.user,
        })
        console.log(error)
    }
}


