import React from 'react'
import NavbarComp from '../components/NavbarComp'
import Test from '../components/adminComponents/Test'
import SideBar from '../components/adminComponents/SideBar'
import { Outlet } from 'react-router-dom'

const AdminHomepage = () => {
  return (
    <>
        {/* <div className='flex'> */}
          <NavbarComp/>
          <div className='flex relative'>
              <Test/>
              <div className="w-full px-4" style={{marginLeft:330 ,marginRight:30,marginTop:30 }}>
                <Outlet/>
              </div>
          </div>

    </>
  )
}

export default AdminHomepage