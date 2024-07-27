import React, { useEffect, useState } from 'react'

import { Table } from "flowbite-react";
import axios from 'axios';
import showToastMessage from '../Toast';
import dayjs from 'dayjs'
import {useNavigate,Link} from 'react-router-dom'

const ManagaeEvent = () => {
  let navigate=useNavigate();
  const [events,setEvents]=useState([]);
  const fetchAllEvents = async()=>{
    try {
      // console.log("hello")
      const config = {
        headers: {
          // Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
      };

      const {data}  = await axios.get("http://localhost:4000/api/admin/manageEvent", config);
      console.log(data.events)
      setEvents(data.events);
      console.log(events)
      
    } catch (error) {
      showToastMessage("error",`${error}`);
    }
  }
  const [date,setDate]=useState();
  const getFormattedDate=(Date)=>{
    const day=dayjs(Date)
    const formattedDate = day.date() + 'th ' + day.format('MMMM') + ', ' + day.year(); 
    return formattedDate;
  }

  useEffect(() => {
    fetchAllEvents();
    // console.log(products)
  }, [])
  return (
    <div className="overflow-x-auto mt-4 mx-auto pt-4">
      <p className='text-2xl mt-4 mb-4'>Manage Events</p>
      {console.log(Array.isArray(events))}
      <Table hoverable className='mt-4 pt-4'>
        <Table.Head className='mt-4'>
          <Table.HeadCell>Event name</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Venue</Table.HeadCell>
          <Table.HeadCell>Bookings</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {Array.isArray(events)? events.map((event)=>(

            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {`${event.eventName}`}
            </Table.Cell>
            <Table.Cell>{getFormattedDate(event.startingDate)}</Table.Cell>
            <Table.Cell>{event.city}</Table.Cell>
            <Table.Cell>{`${event.booked} / ${event.noOfTicket}`}</Table.Cell>
            <Table.Cell>
              <Link to={`${event._id}`} className='cursor-pointer text-blue-600 underline'>manage</Link>
            </Table.Cell>
          </Table.Row>
          )) : ""}
          
        </Table.Body>
      </Table>
    </div>
  )
}

export default ManagaeEvent