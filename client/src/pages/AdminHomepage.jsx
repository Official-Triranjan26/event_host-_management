import React from 'react'
import NavbarComp from '../components/NavbarComp'
import SideBar from '../components/adminComponents/SideBar'
import { Outlet } from 'react-router-dom'

const AdminHomepage = () => {
  return (
    <>
        {/* <div>AdminHomepage</div> */}
        <NavbarComp/>
        <SideBar/>
        <Outlet/>

    </>
  )
}

export default AdminHomepage