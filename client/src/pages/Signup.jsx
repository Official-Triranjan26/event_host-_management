import React,{useState} from 'react'
import {
    Button,
    Checkbox,
    FileInput,
    Label,
    Radio,
    TextInput,
  } from "flowbite-react";
import showToastMessage from '../components/Toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

const Signup = () => {
  let navigate = useNavigate();

  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [pic, setPic] = useState();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);


  const submit = async() => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      showToastMessage('warn',"credentials are needed !");
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      showToastMessage('warn',"password doesn't match !!");
      setLoading(false);
      return;
    }
    console.log(name, email, password,role,checked);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:4000/api/user/signup",
        {
          role,
          name,
          email,
          password
        },
        config
      );
      showToastMessage('success',"Registration Successful !");
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/signin");
    } catch (error) {
      showToastMessage('error',`${error}`);
      setLoading(false);
    }
  }
  return (
    <>
      <div className=" ">
        <p className="py-4 font-bold text-2xl mb-4 text-black">Sign Up</p>
        <form className="px-4 flex mx-auto max-w-md flex-col gap-4">
          <div>
            <Label
              htmlFor="role"
              value="Register for roal of"
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
            <Label htmlFor="name" value="Name" className="flex pb-2" />
            <TextInput
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              shadow
            />
          </div>
          <div>
            <Label htmlFor="email" value="Email" className="flex pb-2" />
            <TextInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*******"
              required
              shadow
            />
          </div>
          <div>
            <Label
              htmlFor="conformPassword"
              value="Re Enter Password"
              className="flex pb-2"
            />
            <TextInput
              id="conformPassword"
              type="password"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              placeholder="*******"
              // required
              shadow
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="file-upload"
                value="Upload Profile Image"
                className="flex pb-2"
              />
            </div>
            <FileInput id="file-upload" />
          </div>
          <div className="flex py-4 items-center gap-2">
            <Checkbox id="agree" checked={checked} onChange={(e) => setChecked(e.target.checked)}/>
            <Label htmlFor="agree" className="flex">
              I agree with the&nbsp;
              <a
                href="#"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                terms and conditions
              </a>
            </Label>
          </div>
          <div className="flex flex-row items-center justify-center">
          <Button
            color="dark"
            // type="button"
            onClick={submit}
            className="flex items-center justify-center w-full p- rounded-md text-white mt-5 "
            isProcessing={loading}
            disabled={loading || !checked}
          >
            <span className="font-medium"> {loading? 'Processing... ':'Signup'}</span>
          </Button>
        </div>
        <ToastContainer />
        </form>
      </div>
    </>
  )
}

export default Signup