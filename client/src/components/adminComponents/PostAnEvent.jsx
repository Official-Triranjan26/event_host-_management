import React, { useState, useEffect,useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  FileInput,
  Label,
  Select,
  TextInput,
  // Datepicker,
  Tooltip,
} from "flowbite-react";
import {
  FaIndianRupeeSign,
  FaLocationDot,
  FaLocationCrosshairs,
} from "react-icons/fa6";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import {
  IoMdAdd,
  IoMdCloudUpload,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { ToastContainer } from "react-toastify";
import showToastMessage from "../Toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImageModal from "./ImageModal";

const PostAnEvent = () => {
  let navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [language, setLanguage] = useState("");
  const [duration, setDuration] = useState("");
  const [startingDate, setStartingDate] = useState();
  const [endingDate, setEndingDate] = useState();
  const [city, setCity] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [noOfTicket, setNoOfTickets] = useState("");
  const [bookingDeadline, setBookingDeadline] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState([]);
  // const [openModal, setOpenModal] = useState(false);
  const fileInputRef1 = useRef(null);
  // const fileInputRef = useRef(null);
  const deleteImage = (index)=>{
    const newImageArr = imageUrl.slice();
    if (index >= 0 && index < newImageArr.length) {
        newImageArr.splice(index, 1);
    }
    setImageUrl(newImageArr);
  }

  const handlePosterUpload = async () => {
    console.log("hello");
    const pic = image;
    console.log(pic);

    if (!pic || pic==="") return;
    console.log("hello");
    // Generate secure S3 URL
    const { url } = await fetch("http://localhost:4000/s3Url").then((res) =>
      res.json()
    );
    console.log(url);
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: pic,
    });
    const URL = url.split("?")[0];
    let temp = imageUrl;
    temp.push(URL);
    setImageUrl(temp);
    console.log(imageUrl);
    setImage("");
    fileInputRef1.current.value = null;
  };
  const [tempIndex,setTempIndex]=useState();
  const forImageModal=(index)=>{
    setOpenModal(true);
    setTempIndex(index)
  }

  const [artists, setArtists] = useState([]);
  console.log(artists);
  const [artistName, setArtistName] = useState();
  const [artistPic, setArtistPic] = useState();
  const [artistPicUrl, setArtistPicUrl] = useState();

  const handleArtistPicUpload = async () => {
    const pic = artistPic;
    console.log(pic);
    if (!pic) return;
    // Generate secure S3 URL
    const { url } = await fetch("http://localhost:4000/s3Url").then((res) =>
      res.json()
    );
    console.log(url);

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: pic,
    });

    const imageUrl = url.split("?")[0];
    console.log(imageUrl);
    setArtistPicUrl(imageUrl);
    showToastMessage("success", "Artist Pic Uploaded!!");
  };

  const saveArtist = async () => {
    console.log(artistName);
    console.log(artistPicUrl);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:4000/api/admin/addArtist",
        {
          artistName,
          artistPicUrl,
        },
        config
      );
      console.log("data", data);
      console.log("id", data._id);
      const newArr = artists.slice();
      newArr.push(data._id);
      console.log(newArr);
      setArtists(newArr);
      showToastMessage("success", "Artist added !!");
      console.log(artists);
      fileInputRef.current.value = null;
      setArtistName("");
    } catch (error) {
      showToastMessage("error", { error });
    }
  };

  const [activities, setActivities] = useState([""]);
  const addActivities = () => {
    setActivities([...activities, ""]);
  };
  const handleActivityChange = (index, event) => {
    const newActivity = activities.slice();
    // console.log(newActivity);
    newActivity[index] = event.target.value;
    setActivities(newActivity);
  };

  const [facilities, setFacilities] = useState([""]);
  const addFacilities = () => {
    setFacilities([...facilities, ""]);
  };
  const handleFacilityChange = (index, event) => {
    const newFacility = facilities.slice();
    // console.log(newFacility);
    newFacility[index] = event.target.value;
    setFacilities(newFacility);
  };

  const [instructions, setInstructions] = useState([""]);
  const addInstructions = () => {
    setInstructions([...instructions, ""]);
  };
  const handleInstructionChange = (index, event) => {
    const newInstruction = instructions.slice();
    // console.log(newInstruction);
    newInstruction[index] = event.target.value;
    setInstructions(newInstruction);
  };

  const submit = async () => {
    if (
      !eventName ||
      !eventType ||
      !language ||
      !duration ||
      !startingDate ||
      !city ||
      !ticketPrice ||
      !noOfTicket ||
      !bookingDeadline ||
      !latitude ||
      !longitude ||
      !imageUrl
    ) {
      showToastMessage("warn", "Fill all mandetory fields");
      return;
    }
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:4000/api/admin/postEvent",
        {
          eventName,
          eventType,
          language,
          duration,
          startingDate,
          endingDate,
          city,
          ticketPrice,
          noOfTicket,
          bookingDeadline,
          latitude,
          longitude,
          artists,
          activities,
          facilities,
          instructions,
          imageUrl,
        },
        config
      );
      console.log(data);
      setLoading(false);
      showToastMessage("success", "Product Posted Successfully !");
      navigate("/admin/manageEvent");
    } catch (error) {
      showToastMessage("error", { error });
    }
  };

  return (
    <>
      <div className="flex mx-auto w-full   mt-4">
        <form className="px-4 w-full flex mx-auto max-w-md flex-col gap-4 mt-4">
          {/* GeneralInformation Section  */}
          <p className="py-4 font-bold text-2xl mb-4 text-black">
            General Information
          </p>

          {/* Event Name  */}
          <div>
            <Label htmlFor="name" value="Event Name" className="flex mb-4" />
            <TextInput
              id="name"
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Enter your name"
              required
              shadow
            />
          </div>
          {/* Event Type  */}
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label
                htmlFor="catagory"
                value="Event Catagory"
                className="flex mb-4"
              />
            </div>
            <Select
              id="catagory"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              required
            >
              <option>choose catagory</option>
              <option value="Music">Music</option>
              <option value="Cultural">Cultural</option>
              <option value="Comedy">Comedy</option>
              <option value="Business">Business</option>
              <option value="others">others</option>
            </Select>
          </div>
          {/* Language  */}
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label
                htmlFor="language"
                value="Language"
                className="flex mb-4"
              />
            </div>
            <Select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
            >
              <option selected>Choose a country</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Bengali">Bengali</option>
              <option value="others">others</option>
            </Select>
          </div>
          {/* Duration  */}
          <div>
            <Label
              htmlFor="duration"
              value="Event Duration"
              className="flex mb-4"
            />
            <TextInput
              id="duration"
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="eg. 4 hours"
              shadow
            />
          </div>
          {/* Starting Date  */}
          <div>
            <Label
              htmlFor="startingDate"
              value="Starting Date/Date of Event"
              className="flex mb-4"
            />
            <div className="flex w-full">
              <input
                id="startingDate"
                type="date"
                value={startingDate}
                className="w-full bg-gray-100 border-none rounded-md"
                onChange={(e) => setStartingDate(e.target.value)}
              />
            </div>
          </div>
          {/* Ending Date  */}
          <div>
            <Label
              htmlFor="endingDate"
              value="Ending Date/Date of Event"
              className="flex mb-4"
            />
            <div className="flex w-full">
              <input
                id="endingDate"
                type="date"
                value={endingDate}
                className="w-full bg-gray-100 border-none rounded-md"
                onChange={(e) => setEndingDate(e.target.value)}
              />
            </div>
          </div>
          {/* City  */}
          <div>
            <Label htmlFor="city" value="City" className="flex mb-4" />
            <TextInput
              id="duration"
              icon={FaLocationDot}
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="eg. Kolkata"
              required
              shadow
            />
          </div>

          {/* Artist Details  */}
          <p className="py-4 font-bold text-2xl mb-4 text-black">
            Artist/Performer
          </p>

          {/* Artist Details  */}
          <div className="mb-4">
            {artists.map((artist, index) => {
              return (
                <div className="w-full bg-gray-200 mb-2 rounded-md ">
                  {`Artist ${index + 1}`}
                </div>
              );
            })}
            <div>
              <Label value={`Artist/Performer Name`} className="flex mb-4" />
              <TextInput
                type="text"
                name="name"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                shadow
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  value={`Upload Artist/Performer Picture`}
                  className="flex mb-4"
                />
              </div>

              <div className="flex flex-row w-full mb-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  className="w-full rounded-md bg-gray-200"
                  onChange={(e) => setArtistPic(e.target.files[0])}
                />

                <Button className="w-10 ml-3" onClick={handleArtistPicUpload}>
                  <IoMdCloudUpload className="text-xl flex items-center" />
                </Button>
              </div>
            </div>
          </div>
          {/* ))} */}
          <Button className="whitespace-nowrap" onClick={() => saveArtist()}>
            <span className="flex items-center  w-full h-full px-5">
              <IoMdAdd className="text-2xl" />
            </span>
            Add Artist
          </Button>

          <p className="py-4 font-bold text-2xl mb-4 text-black">
            Ticket Details
          </p>

          {/* Ticket Price  */}
          <div>
            <Label
              htmlFor="ticketPrice"
              value="Ticket Price"
              className="flex mb-4"
            />
            <TextInput
              id="ticketPrice"
              type="text"
              icon={FaIndianRupeeSign}
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
              placeholder="in INR"
              required
              shadow
            />
          </div>
          {/* Total No Of Tickets  */}
          <div>
            <Label
              htmlFor="totalTicket"
              value="Total Number of Tickets "
              className="flex mb-4"
            />
            <TextInput
              id="totalTicket"
              type="text"
              icon={IoTicketOutline}
              value={noOfTicket}
              onChange={(e) => setNoOfTickets(e.target.value)}
              required
              shadow
            />
          </div>
          {/* Booking Deadline  */}
          <div>
            <Label
              htmlFor="bookingDeadline"
              value="Deadline for Booking"
              className="flex mb-4"
            />
            <div className="flex w-full">
              <input
                id="startibookingDeadlinengDate"
                type="date"
                value={bookingDeadline}
                className="w-full bg-gray-100 border-none rounded-md"
                onChange={(e) => setBookingDeadline(e.target.value)}
              />
            </div>
          </div>

          <p className="py-4 font-bold text-2xl mb-4 text-black">
            Activities / Sub Events
          </p>

          {/* Activities  */}
          <div className="p-4 flex flex-col gap-4">
            <Label
              value="Add Activities/Sub Events if any"
              className="flex mb-4"
            />
            {activities.map((input, index) => (
              <TextInput
                className="my-2"
                id={index}
                type="text"
                value={activities[index]}
                onChange={(e) => handleActivityChange(index, e)}
                placeholder={`Activity/Sub Event ${index + 1}`}
                shadow
              />
            ))}
            <Button onClick={addActivities} className="whitespace-nowrap">
              <span className="flex items-center  w-full h-full px-5">
                <IoMdAdd className="text-2xl" />
              </span>
              Add Activity
            </Button>
          </div>

          <p className="py-4 font-bold text-2xl mb-4 text-black">Facilities</p>

          {/* Facilities  */}
          <div className="p-4 flex flex-col gap-4">
            <Label value="Add Facilities if any" className="flex mb-4" />
            {facilities.map((input, index) => (
              <TextInput
                className="my-2"
                id={index}
                type="text"
                value={facilities[index]}
                onChange={(e) => handleFacilityChange(index, e)}
                placeholder={`Facility ${index + 1}`}
                // required
                shadow
              />
            ))}
            <Button onClick={addFacilities} className="whitespace-nowrap">
              <span className="flex items-center  w-full h-full px-5">
                <IoMdAdd className="text-2xl" />
              </span>
              Add Facility
            </Button>
          </div>

          <p className="py-4 font-bold text-2xl mb-4 text-black">
            Instructions for attendees
          </p>

          {/* Instructions  */}
          <div className="p-4 flex flex-col gap-4">
            <Label value="Instructions" className="flex pb-2" />
            {instructions.map((input, index) => (
              <TextInput
                className="my-2"
                id={index}
                type="text"
                value={instructions[index]}
                onChange={(e) => handleInstructionChange(index, e)}
                placeholder={`Instruction ${index + 1}`}
                // required
                shadow
              />
            ))}
            <Button className="whitespace-nowrap" onClick={addInstructions}>
              <span className="flex items-center  w-full h-full px-5">
                <IoMdAdd className="text-2xl" />
              </span>
              Add Instruction
            </Button>
          </div>

          <p className="py-4 font-bold text-2xl mb-4 text-black">Maplocation</p>

          {/* Latitude */}
          <div>
            <Label
              htmlFor="Latitude"
              value="Provide pressice Latitude"
              className="flex mb-4"
            />
            <TextInput
              id="Latitude"
              type="number"
              icon={FaLocationCrosshairs}
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="eg . 51.505"
              required
              shadow
            />
          </div>
          {/* Longitude  */}
          <div>
            <Label
              htmlFor="longitude"
              value="Provide pressice Longitude "
              className="flex mb-4"
            />
            <TextInput
              id="longitude"
              type="number"
              icon={FaLocationCrosshairs}
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="eg . -1.50"
              required
              shadow
            />
          </div>
          

          {/* poster  */}
          <p className="py-4 font-bold text-2xl mb-4 text-black">
            Upload Images
          </p>
          <div>
            {imageUrl.map((image, index) => (
                <div className="flex justify-between gap-2 bg-gray-200 px-2 py-1 w-full rounded-md mb-2">
                  <span
                    className=" text-wrap text-lg text-blue-600 cursor-pointer underline"
                    onClick={() => forImageModal(index)}
                  >{`image ${index + 1}`}</span>
                  <MdOutlineDelete
                    className="text-2xl text-red-600 cursor-pointer flex w-6 "
                    onClick={() => deleteImage(index)}
                  />
                </div>
            ))}
            <ImageModal
              imageUrl={imageUrl[tempIndex]}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />

            <div>
              <div className="mb-2 block">
                <Label
                  value={`Upload posterfor the event`}
                  className="flex mb-2"
                />
              </div>
              <div className="flex flex-row w-full mb-1">
                <input
                  ref={fileInputRef1}
                  type="file"
                  className="w-full rounded-md bg-gray-200"
                  onChange={(e) => setImage(e.target.files[0])}
                />

                <Button className="w-10 ml-3" onClick={handlePosterUpload}>
                  <IoMdCloudUpload className="text-xl flex items-center" />
                </Button>
              </div>
            </div>
            </div>
          {/* <div className="w-full">
            <input id="hello" type="file" className="w-full rounded-md bg-gray-200" />
          </div> */}
          {/* <button onClick={temp}>click</button> */}

          <div className="flex flex-row items-center justify-center">
            <Button
              color="dark"
              // type="button"
              onClick={submit}
              className="flex items-center justify-center w-full p- rounded-md text-white mt-4 "
              isProcessing={loading}
              disabled={loading}
            >
              <span className="font-medium">
                {" "}
                {/* Post Event */}
                {loading ? "Processing... " : "Post Event"}
              </span>
            </Button>
          </div>
          <ToastContainer />
        </form>
      </div>
    </>
  );
};

export default PostAnEvent;
