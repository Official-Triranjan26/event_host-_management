import React from 'react'
import { Sidebar } from "flowbite-react";
import { HiChartPie} from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import {useNavigate} from "react-router-dom"
import { GrValidate } from "react-icons/gr";
const SideBar = () => {
  let navigate=useNavigate();
  return (
    <>
     <Sidebar aria-label="Default sidebar example" className='pt-10 h-screen'>
      <Sidebar.Items >
        <Sidebar.ItemGroup className='flex flex-col'>

          <Sidebar.Item className='' icon={HiChartPie}  >
          <p className='flex items-start px-5' ></p>
          </Sidebar.Item>

          <Sidebar.Item className='' icon={HiChartPie}  >
          <p className='flex items-start px-5 cursor-pointer' onClick={()=>navigate("/admin/dashboad")}>Dashboad</p>
          </Sidebar.Item>

          <Sidebar.Item className='cursor-pointer'  icon={IoMdAdd}>
            <p className='flex items-start px-5' onClick={()=>navigate("/admin/postEvent")}>Post an Event</p>
          </Sidebar.Item>

          <Sidebar.Item className='cursor-pointer'  icon={MdManageAccounts}>
            <p className='flex items-start px-5' onClick={()=>navigate("/admin/manageEvent")}>Manage Events</p>
          </Sidebar.Item>

          <Sidebar.Item className='cursor-pointer'  icon={GrValidate}>
            <p className='flex items-start px-5' onClick={()=>navigate("/admin/manageEvent")}>Validate Ticket</p>
          </Sidebar.Item>

          <Sidebar.Item  className='cursor-pointer' icon={BiLogOut}>
            <p className='flex items-start px-5'>Logout</p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </>
  )
}

export default SideBar