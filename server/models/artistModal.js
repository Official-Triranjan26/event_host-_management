const mongoose = require("mongoose");

const artistSchema=mongoose.Schema({
    artistName:{type:String},
    artistPicUrl:{type:String},
    eventId:{type:mongoose.Schema.Types.ObjectId,ref:'Event'}
    },
    { timestamps: true }
)

const Artist = mongoose.model('Artist',artistSchema);
module.exports = Artist 