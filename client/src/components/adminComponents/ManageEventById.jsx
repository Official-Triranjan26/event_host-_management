import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { Table } from "flowbite-react";
import {Link, useNavigate, useParams} from 'react-router-dom'
import axios from "axios"
import showToastMessage from "../Toast"
import dayjs from "dayjs";
const ManageEventById = () => {
  const {id}=useParams();
  const navigate = useNavigate();
  const [event,setEvent]=useState();
  const fetchEvent = async()=>{
    try {
      // console.log("hello")
      const config = {
        headers: {
          // Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
      };

      const {data}  = await axios.get(`http://localhost:4000/api/admin/manageEvent/${id}`, config);
      // console.log(data.events)
      setEvent(data.event);
      console.log(event)
      
    } catch (error) {
      showToastMessage("error",`${error}`);
    }
  }
  const getFormattedDate=(Date)=>{
    const day=dayjs(Date)
    const formattedDate = day.date() + 'th ' + day.format('MMMM') + ', ' + day.year(); 
    return formattedDate;
  }

  useEffect(() => {
    fetchEvent();
  }, [])
  
  return (
    <>
      <div className="mt-4 flex flex-col items-center justify-center h-full">
        <div className="mt-4 flex w-full bg-gray-200 rounded-lg ">
          <img
            src={event?.imageUrl[0]}
            // src="https://t3.ftcdn.net/jpg/07/30/96/92/360_F_730969288_gQfC7QzsvZPpHqs9g5PlWjr3KaxLKdWm.jpg"
            // className="object-cover"
            style={{ height: 200 }}
          />
          <div className="flex flex-col gap-4 py-4 px-6 w-full justify-center items-center">
            <p className="font-bold text-2xl">{event?.eventName}</p>
            <div className="flex   justify-between items-center">
              <div className="flex text-xl ml-3 items-center">
                <FaLocationDot className="pr-2" />{event?.city}
                <p className="px-2"></p>
              </div>
              <div className="flex text-xl  items-center">
                <MdDateRange className="pr-2" />
                <p className="px-2">{event?getFormattedDate(event.startingDate):""}</p>
              </div>
              <div className="flex text-xl mr-3 items-center">
                <IoTicketOutline className="pr-2" />
                <p className="px-2">11/20</p>
              </div>
            </div>
            <div className="flex gap-4 mx-auto">
              {/* <Link to={`admin/manageEvent/event/${id}`}> */}
                <button 
                  className="flex items-center gap-2 h-10 text-red-600 border-2 border-red-600 rounded-md px-4 font-bold hover:text-white"
                  onClick={()=>navigate(`/admin/manageEvent/edit/${id}`, { state: event })}
                  >
                  <GrUpdate className="text-2xl" />
                  Update
                </button>
              {/* </Link> */}
              <button className="flex items-center gap-2 h-10 text-red-600 border-2 border-red-600 rounded-md px-4 font-bold hover:text-white ml-4">
                <MdDeleteOutline className="text-2xl" />
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto w-full mt-4">
          <p className="text-xl font-bold my-4">Participents for this Event</p>
          <Table className="mt-4">
            <Table.Head>
              <Table.HeadCell>Particepent name</Table.HeadCell>
              <Table.HeadCell>Particepent ID</Table.HeadCell>
              <Table.HeadCell>Ticket ID</Table.HeadCell>
              <Table.HeadCell>email</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {'Apple MacBook Pro 17"'}
                </Table.Cell>
                <Table.Cell>Sliver</Table.Cell>
                <Table.Cell>Laptop</Table.Cell>
                <Table.Cell>$2999</Table.Cell>
              </Table.Row>
              
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ManageEventById;
