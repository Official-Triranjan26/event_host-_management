const { default: mongoose, Mongoose } = require("mongoose");
const Ticket = require("../models/ticketModal");

const issueATicket = async (req, res) => {
  const { userId, eventId } = req.body;

  try {
    const ticket = await Ticket.create({
        userId,
        eventId,
      });
      if (!ticket)
        return res.status(400).json({
          success: false,
          messsage: "ticket issue failed !!",
        });
        console.log
      return res.status(200).json(ticket);
    
  } catch (error) {
    res.status(400);
    throw new Error(error.message) 
  }
};

const getAllTicketsByEventId = async (req, res) => {
  const {eventId} = req.params;
  console.log(eventId);
  try {
    const tickets =await Ticket.find({ eventId: eventId });
    if (!tickets)
      return res.status(400).json({
        success: false,
        message: "no tickets issued",
      });
    return res.status(200).json(tickets);
  } catch (error) {
        res.status(400);
        throw new Error(error.message)
    };
}

const getATicketById =async(req,res)=>{
    const {ticketId}=req.params;
    // const ticketId=mongoose.Types.ObjectId(req.params.ticketId);
    console.log(ticketId);
    try {
        const ticket =await Ticket.findById({_id:ticketId})
        .populate("userId")
        .populate("eventId")
        if(!ticket) return res.status(400).json({
            success:false,
            message:"ticket with this id not found!!"
        })
        // const userId=mongoose.Schema.Types.ObjectId(ticket.userId);
        // ticket=ticket.populate(userId);
        // console.log(ticket);
        return res.status(200).json(ticket);
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
}

const verifyATicketById = async(req,res)=>{
    try {
        const {ticketId}=req.params;
        const {eventId,userId}=req.body;
        const updatedDetails=await Ticket.findByIdAndUpdate(
            {_id:ticketId},
            {
                eventId,
                userId,
                verified:true
            },
            {
                new:true,
                runValidators:true
            }
        )
        if(!updatedDetails) return res.status(400).json({
            success:false,
            message:"Failed to verify"
        })
        return res.status(200).json(updatedDetails)
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
}

module.exports = {issueATicket
    ,getAllTicketsByEventId
    ,getATicketById,
    verifyATicketById
}
