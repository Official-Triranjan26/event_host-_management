import React,{useState} from "react";
import {
  Button,
  Checkbox,
  Label,
  Radio,
  TextInput,
} from "flowbite-react";
import showToastMessage from '../components/Toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

const Signin = () => {
  let navigate = useNavigate();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    // console.log(role,email,password);
    setLoading(true);
    if (!role ||!email || !password) {
      showToastMessage("warn", "credentials cannot be empty !!");
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:4000/api/user/signin",
        { role ,email, password },
        config
      );
      if(!data) showToastMessage("error",data.message)
      showToastMessage("success", "Login Successful !");
      // setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      if(data.role=='user'){
        navigate("/home");
      }else if(data.role=='admin'){
        navigate("/admin");
      }
    } catch (error) {
      showToastMessage("error", "Invalid credentials !!");
      console.log(error)
      
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" ">
        <p className="py-4 font-bold text-2xl mb-4 text-black">Sign In</p>
        <form className="px-4 flex mx-auto max-w-md flex-col gap-4">
        <div>
            <Label
              htmlFor="role"
              value="Log in as"
              className="flex pb-2"
            />
            <div className=" flex gap-3">
              <div className="flex gap-2 items-center p-4 w-full border border-gray-300 rounded dark:border-gray-700">
                <Radio
                  id="united-state"
                  name="role"
                  value="admin"
                  checked={role === 'admin'} 
                  onChange={(e) => setRole(e.target.value)}
                />
                <Label htmlFor="united-state">Admin</Label>
              </div>
              <div className="flex gap-2 items-center p-4 ml-2 w-full border border-gray-300 rounded dark:border-gray-700">
                <Radio
                  id="united-state"
                  name="role"
                  value="user"
                  defaultChecked
                  checked={role === 'user'} 
                  onChange={(e) => setRole(e.target.value)}
                />
                <Label htmlFor="united-state">User</Label>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="email" value="Email" className="flex pb-2" />
            <TextInput
              id="email"
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="name@email.com"
              required
              shadow
            />
          </div>
          <div>
            <Label htmlFor="password" value="Password" className="flex pb-2" />
            <TextInput
              id="password"
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="*******"
              required
              shadow
            />
          </div>
          <div className="flex py-4 items-center gap-2">
            <Checkbox id="agree" />
            <Label htmlFor="agree" className="flex">
              Remind me
              
            </Label>
          </div>
          <Button
            color="dark"
            // type="button"
            onClick={submit}
            className="flex items-center justify-center w-full p- rounded-md text-white mt-5 "
            isProcessing={loading}
            disabled={loading}
          >
            <span className="font-medium"> {loading? 'Processing... ':'Sign In'}</span>
          </Button>
          <ToastContainer />
        </form>
      </div>
    </>
  );
};

export default Signin;
