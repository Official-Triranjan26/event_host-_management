const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    eventType: { type: String, required: true },
    language: { type: String, required: true },
    duration: { type: String, required: true },
    startingDate: { type: Date, required: true },
    endingDate: { type: Date, required: false },
    city: { type: String, required: true },
    ticketPrice: { type: Number, required: true },
    noOfTicket: { type: Number, required: true },
    booked:{type:Number,default : 0},
    bookingDeadline: { type: Date, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    artists: [{type:mongoose.Schema.Types.ObjectId, ref:'Artist'}],
    activities: [{ type: String }],
    facilities: [{ type: String }],
    instructions: [{ type: String }],
    imageUrl:[{type:String}],
    owner:{type:mongoose.Schema.Types.ObjectId,ref: 'User'},
    participants:[{type:mongoose.Schema.Types.ObjectId,ref: 'User'}]
  },
  { timestamps: true }
);
  
  const Event = mongoose.model('Event', eventSchema);
  module.exports = Event