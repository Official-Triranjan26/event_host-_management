const Event = require("../models/eventModel");
const eventModel = require("../models/eventModel")
const Artist = require("../models/artistModal");
const {LocalStorage}=require("node-localstorage");
const { default: mongoose } = require("mongoose");
const postEvent = async (req,res)=>{
    localStorage = new LocalStorage('./local')
    const {eventName,eventType,language,duration,startingDate,endingDate,city,ticketPrice,noOfTicket,bookingDeadline,latitude,longitude,artists,activities,facilities,instructions,imageUrl} =req.body;

    if(!eventName || !eventType || !language || !duration || ! startingDate|| !city || !ticketPrice || !noOfTicket || !bookingDeadline || !latitude || !longitude || !imageUrl){
        return res.status(400).json({ 
            success:false,
            message:"mandatory fields are not filled"
        })
    }
    const admin=localStorage.getItem("adminId")
    // console.log(admin);
    
    const event = await eventModel.create({
        eventName,
        eventType,
        language,
        duration,
        startingDate,
        endingDate,
        city,
        ticketPrice,
        noOfTicket,
        bookingDeadline,
        latitude,
        longitude,
        artists,
        activities,
        facilities,
        instructions,
        imageUrl,
        owner:admin
    })
    if(event){
        return res.status(200).json({
            success:true,
            message:"successfully created event",
            data:event
        })
    }else{
        return res.status(400).json({
            success:false,
            message:"failed to create event",
        })
    }
}
const getAllListedEvents = async(req,res)=>{
    localStorage = new LocalStorage('./local')
    const admin=localStorage.getItem("adminId")
    try{
        const events = await eventModel.find({owner:admin});
        return res.status(200).json({
            events
        })
    }catch(error){
        res.status(400);
        throw new Error(error.message)
    }
}
const getAnEventById = async(req,res)=>{
    const {id}=req.params;
    // console.log(id);
    try {
        const event = await eventModel.findById(id);
        return res.status(200).json({
            event
        })
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
}

const putAnEventById = async(req,res)=>{
    const {id}=req.params;
    const updatedEvent=req.body;
    
    try {
        const newEvent = await Event.findByIdAndUpdate(id,updatedEvent,{
            new:true,
            runValidators:true
        })
        if(!newEvent){
            return res.status(404).json({
                success:false,
                message:"failed to update !!"
            })
        }
        return res.status(200).json({
            newEvent
        })
    } catch (error) {
        res.status(400);
        throw new Error(error.message)  
    }
}

const addArtist = async(req,res)=>{
    const {artistName,artistPicUrl}=req.body;

    if(!artistName || !artistPicUrl){
        return res.status(400).json({
            success:false,
            message:"Artist creation failed !!"
        })
    }
    try {
        const artist = await Artist.create({
            artistName,
            artistPicUrl,
            // eventId
        })
        if(!artist) {
            return res.status(400).json({
                success:false,
                message:"Artist creation failed !!"
            })
        }
        return res.status(200).json(artist);
    } catch (error) {
        res.status(400);
        throw new Error(error.message) 
    }
}

const getAnArtist = async(req,res) =>{
    const artistId=req.params.artistId;
    console.log(artistId)
    // const objectId = mongoose.Types.ObjectId(artistId);
    try {
        // if(!mongoose.Types.ObjectId.isValid(artistId)) {
        //     // console.log(artistId)
        //     return res.status(400).json({
        //       success: false,
        //       message: 'Invalid artist ID format',
        //     });
        //   }
        const artist= await Artist.findById(artistId)
        console.log(artist)
        if(!artist){
            return res.status(400).json({
                success:false,
                message:"faild to get the artist !!"
            })
        }
        return res.status(200).json(artist);
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
}




module.exports = {postEvent,getAllListedEvents,getAnEventById,putAnEventById,addArtist,getAnArtist}