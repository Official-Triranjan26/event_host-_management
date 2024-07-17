import React from 'react'
import { Sidebar } from "flowbite-react";
import { HiChartPie} from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
const SideBar = () => {
  return (
    <>
     <Sidebar aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col'>
          <Sidebar.Item  href="#" icon={IoMdAdd}>
            <p className='flex items-start px-5'>Post an Event</p>
          </Sidebar.Item>
          <Sidebar.Item  href="#" icon={HiChartPie}>
            <p className='flex items-start px-5'>Dashboad</p>
          </Sidebar.Item>
          <Sidebar.Item  href="#" icon={HiChartPie}>
            <p className='flex items-start px-5'>Dashboad</p>
          </Sidebar.Item>
          <Sidebar.Item  href="#" icon={HiChartPie}>
            <p className='flex items-start px-5'>Dashboad</p>
          </Sidebar.Item>
          
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </>
  )
}

export default SideBar