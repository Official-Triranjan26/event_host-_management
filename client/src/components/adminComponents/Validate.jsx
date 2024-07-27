import { Label, Select, TextInput } from "flowbite-react";
import { IoSearch } from "react-icons/io5";
import { GrValidate } from "react-icons/gr";
import React, { useEffect, useState } from "react";
import showToastMessage from "../Toast";
import axios from "axios";
import { ToastContainer } from "react-toastify";

const Validate = () => {
    const [events,setEvents]=useState([]);
    const [ticketId,setTicketId]=useState();
    const [eventId,setEventId]=useState();
    const [ticketDetails,setTicketDetails]=useState();
    const [disable,setDisable]=useState(false);
    const getTicketDetails = async ()=>{
        try {
            const config ={
                headers:{
                    "Content-type":"application/json"
                },
            };
            if(!ticketId) showToastMessage("error","ticketId not provided !!")
            const {data} = await axios.get(`http://localhost:4000/api/ticket/getATicket/${ticketId}`);
            console.log(data);
            setTicketDetails(data);
            if(data.verified === true){
                showToastMessage("error","Validity expired ! Already used !!");
                setTicketId("");
                setEventId("");
                // setDisable(false);
            }
            else setDisable(true);

        } catch (error) {
            showToastMessage("error",`${error}`);
        }
    }
    const validateTicket = async()=>{
        try {
            const config = {
                headers: {
                // Authorization: `Bearer ${user.token}`,
                "Content-type": "application/json",
                },
            };
    
            const {data}  = await axios.put(
                `http://localhost:4000/api/ticket/verifyTicket/${ticketId}`,{
                    eventId:eventId,
                    userId:ticketDetails.userId._id
                } ,config);
            if(!data) showToastMessage("error","Failed to verify!!")
            else {
                showToastMessage("success","Verified !!");
                setTicketId("");
                setEventId("");
                setDisable(false);
                // console.log(data)
            }
        } catch (error) {
            showToastMessage("error",`${error}`);
        }
    }
    const fetchAllEvents = async()=>{
        try {
        const config = {
            headers: {
            // Authorization: `Bearer ${user.token}`,
            "Content-type": "application/json",
            },
        };

        const {data}  = await axios.get("http://localhost:4000/api/admin/manageEvent", config);
        setEvents(data.events);
        // console.log(events)
        
        } catch (error) {
        showToastMessage("error",`${error}`);
        }
    }
    useEffect(() => {
        fetchAllEvents();
        // console.log(products)
      }, [])
  return (
    <>
      <div className="mt-4 pt-4 flex flex-col w-full">
      <p className="py-4 font-bold text-2xl mb-4 text-black">
            Validate a Ticket
          </p>
        <div className="w-1/2 mt-4 mx-auto">
          <div className="mb-2 block">
            <Label
              htmlFor="event"
              value="Choose the event"
              className="flex pb-2 mb-4"
            />
          </div>
          <Select
            id="event"
            disabled={disable}
            value={eventId}
              onChange={(e) => setEventId(e.target.value)}
            required
          >
            <option>choose catagory</option>
            {events?events.map((index)=>(
                <option value={`${index._id}`}>{index.eventName}</option>
                // console.log(index)
            )):""}

          </Select>
        </div>
        <div className="w-1/2 mt-4 mx-auto">
          <Label
            htmlFor="ticketId"
            value="Enter the Ticket ID"
            className="flex pb-2 mb-4"
          />
          <TextInput
            disabled={disable}
            id="ticketId"
            type="text"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            placeholder="eg . 669f6591a4ac1e20cdf5a9bb"
            required
            shadow
          />
        </div>
        {disable?<div className="bg-gray-200 p-4 flex flex-col gap-2 mt-4 w-1/2 rounded-md mx-auto">
            <p className="text-xl font-semibold">Participant : {ticketDetails?.userId.name}</p>
            <p className="text-base font-thin">Contact : {ticketDetails?.userId.email}</p>
        </div>:""}
        
        <div className="flex gap-4 w-1/2 mt-4 mx-auto">
            <button
            className="flex items-center gap-2 h-10 text-red-600 border-2 border-red-600 rounded-md px-4 font-bold hover:text-white"
              onClick={getTicketDetails}
              disabled={disable}
            >
            <IoSearch className="text-2xl"/>
            Enqure
            </button>
            <button
                className='flex items-center gap-2 h-10 text-green-500 border-2 border-green-500 rounded-md px-4 font-bold hover:border-green-200'
                disabled={!disable}
                onClick={validateTicket}
            >
            <GrValidate className="text-2xl"/>
            Validate
            </button>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default Validate;
