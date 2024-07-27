import React from 'react'
import { Button } from "flowbite-react";
import { Navbar } from "flowbite-react";
import logo from "../images/logo.png"
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";


const NavbarComp = () => {
  return (
   <div className=' w-full px-4 fixed z-50'>
     <Navbar   className='bg-white sm:px-4 px-8 py-2.5 dark:border-gray-700 dark:bg-gray-800'>
        <Navbar.Brand href="https://flowbite-react.com">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
        </Navbar.Brand>
        <div className="flex md:order-2">
        <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
        <Navbar.Link href="#" active>
            Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Link to={'/signin'}>Sign In</Link>
        <Link to={'/signup'}>Sign Up</Link>
        </Navbar.Collapse>
    </Navbar>
   </div>
  )
}

export const AuthNav = () => {
  let navigate=useNavigate();
  return (
    <>
      <div className=' w-full h-10 bg-gray-200 flex mb-4 py-1 px-4 items-center'>
        <FaArrowLeft 
          className='text-2xl cursor-pointer'
          onClick={()=>navigate("/")}
        />
      </div>
    </>
  )
}



export default NavbarComp