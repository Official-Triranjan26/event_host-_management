const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId , required: true , ref:'User'},
    eventId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Event'},
    verified:{type:Boolean , default:false}
    },
    { timestamps: true } 
)

const Ticket = mongoose.model('Ticket',ticketSchema);
module.exports = Ticket 