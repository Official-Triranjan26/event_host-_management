import React, { useState } from "react";
// import NavbarComp from '../NavbarComp'
import { HiChartPie} from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import {Link, useNavigate,useLocation} from "react-router-dom"
import { GrValidate } from "react-icons/gr";
const Test = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const fields=[
    {
      name:"Dashboad",
      route:"dashboad",
      icon:<HiChartPie/>,
      isActive: currentPath.includes("dashboad"),
    },
    {
      name:"Add an Event",
      route:"postEvent",
      icon:<IoMdAdd/>,
      isActive: currentPath.includes("postEvent"),
    },
    {
      name:"Manage Event",
      route:"manageEvent",
      icon:<MdManageAccounts/>,
      isActive: currentPath.includes("manageEvent")
    },
    {
      name:"Validate Ticket",
      route:"validate",
      icon:<GrValidate/>,
      isActive: currentPath.includes("validate")
    },
    {
      name:"Logout",
      route:"",
      icon:<BiLogOut/>,
    },
  ]
  

  return (
    <>

    {/* <div className="relative"> */}
      <div className=" flex flex-col h-screen fixed bg-gray-200 p-4" 
      style={{ width: 300 , marginTop:50}}
      >
        {fields.map((field)=>(
          <>
          {field.isActive?
            <Link to={`${field.route}`}>
            <div 
              className="w-full h-10 bg-gray-400 flex mb-2 rounded-md p-2 gap-2"
            >
              <span className="text-2xl items-center justify-center">{field.icon}</span>
              {field.name}
            </div>
          </Link>:
          <Link to={`${field.route}`}>
          <div 
            className="w-full h-10 bg-gray-200 flex mb-2 rounded-md p-2 gap-2"
          >
            <span className="text-2xl items-center justify-center">{field.icon}</span>
            {field.name}
          </div>
        </Link>
          }
          </>
        ))}

      </div>
    {/* </div> */}
  </>
  );
};

export default Test;
