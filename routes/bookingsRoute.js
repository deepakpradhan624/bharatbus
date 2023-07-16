const router=require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Booking=require("../models/bookingsModel")
const Bus=require("../models/BusModel")

// Book a seat
router.post("/book-seat",authMiddleware, async(req,res)=>{
    try {
        const newBooking=new Booking({
            ...req.body,
            transactionId:"1234",
            user:req.body.userId 
        })
        await newBooking.save()
        const bus=await Bus.findById(req.body.bus);
        bus.seatsBooked=[...bus.seatsBooked, ...req.body.seats]
        await bus.save();
        res.status(200).send({
            message:"Booking successfull",
            data:newBooking,
            success:true,
        })
    } catch (error) {
        res.status(500).send({
            message:"Booking Failed",
            data:error,
            success:false
        })
    }
})

module.exports = router;