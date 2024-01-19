import mongoose from "mongoose";

const schema=new mongoose.Schema({
    UniqueID: {
        type:String,
        require:true,
    },
    SessionID:  {
        type:String,
        require:true
    },
    SessionStartTime:  {
        type:String,
        require:true
    },
    SessionEndTime: 
    {
        type:String,
        require:true
    },
    SessionStartRating : {
        type:Number,
        require:true
    },
    SessionEndRating:{
        type:Number,
        require:true
    },
    SessionScene: {
        type:String,
        require:true
    },
    SessionGuided: {
        type:Boolean,
        require:true
    },
    SessionLength:{
        type:Number,
        require:true
    },
    DeviceId:{
        type:String,
        require:true

    }
      
})
export const Session=mongoose.model("SessionLog",schema)