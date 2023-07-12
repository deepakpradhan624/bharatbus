const mongoose=require("mongoose")

const busSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    capacity:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    journeyDate:{
        type:String,
        required:true
    },
    departure:{
        type:String,
        required:true
    },
    arrival:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    fare:{
        type:String,
        required:true
    } ,
    seatsBooked:{
        type:Array,
        default:[]
    },
    status:{
        type:String,
        default:"Yet to Start"
    }
})

module.exports=mongoose.model("buses", busSchema)