import React, { useState,useRef } from "react";
import {
  Button,
  FileInput,
  Label,
  Select,
  TextInput,
  Tooltip,
} from "flowbite-react";
import {
  FaIndianRupeeSign,
  FaLocationDot,
  FaLocationCrosshairs,
} from "react-icons/fa6";
import { IoTicketOutline } from "react-icons/io5";
import { IoMdAdd, IoMdCloudUpload } from "react-icons/io";
import { ToastContainer } from "react-toastify";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import showToastMessage from "../Toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import ImageModal from "./ImageModal";
import ArtistModal from "./ArtistModal";

const EditEventDetails = () => {
  const getFormattedDate = (dateStr) => {
    const date = dayjs(dateStr);
    return date.format("YYYY-MM-DD");
  };

  let navigate = useNavigate();
  const location = useLocation();
  const dataReceived = location.state;
  console.log(dataReceived);
  // console.log(dataReceived.instructions);
  const [eventName, setEventName] = useState(dataReceived.eventName);
  const [eventType, setEventType] = useState(dataReceived.eventType);
  const [language, setLanguage] = useState(dataReceived.language);
  const [duration, setDuration] = useState(dataReceived.duration);
  const [startingDate, setStartingDate] = useState(dataReceived.startingDate);
  const [endingDate, setEndingDate] = useState(dataReceived.endingDate);
  const [city, setCity] = useState(dataReceived.city);
  const [ticketPrice, setTicketPrice] = useState(dataReceived.ticketPrice);
  const [noOfTicket, setNoOfTickets] = useState(dataReceived.noOfTicket);
  const [bookingDeadline, setBookingDeadline] = useState(
    dataReceived.bookingDeadline
  );
  const [latitude, setLatitude] = useState(dataReceived.latitude);
  const [longitude, setLongitude] = useState(dataReceived.longitude);
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState(dataReceived.imageUrl);
  const [openModal, setOpenModal] = useState(false);
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
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

  const [artists, setArtists] = useState(dataReceived.artists);
  console.log(artists);
  const [artistName, setArtistName] = useState();
  const [artistPic, setArtistPic] = useState();
  const [artistPicUrl, setArtistPicUrl] = useState();
  const [artistModalOpen,setArtistModalOpen]=useState(false);
  const [tempArtist,setTempArtist]=useState();

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
      fileInputRef2.current.value = null;
      setArtistName("");
    } catch (error) {
      showToastMessage("error", { error });
    }
  };

  const deleteArtist=(index)=>{
    const tempArr=artists.slice();
    if (index >= 0 && index < tempArr.length) {
      tempArr.splice(index, 1);
    }
    setArtists(tempArr);
  }
  const getAnArtist = async(index)=>{
    setArtistModalOpen(true)
    const artist=artists[index];
    // console.log("hey",artist)
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const  {data}  = await axios.get(`http://localhost:4000/api/admin/getAnArtist/${artist}`,config);
      // if(!data) showToastMessage("error","failed to fetch artist details !!");
      console.log("data",data)
      setTempArtist(data);
    } catch (error) {
      showToastMessage("error", { error });
    }
  }

  const [activities, setActivities] = useState(dataReceived.activities);
  const [activity, setActivity] = useState();
  // console.log(activities);
  const removeActivity = (index) => {
    const newActivity = activities.slice();
    if (index >= 0 && index < newActivity.length) {
      newActivity.splice(index, 1);
    }
    setActivities(newActivity);
  };
  const saveActivity = (activity) => {
    // console.log(activity);
    if (activity === "") return;
    const newActivity = activities.slice();
    newActivity.push(activity);
    setActivities(newActivity);
    setActivity("");
  };

  const [facilities, setFacilities] = useState(dataReceived.facilities);
  const [facility, setFacility] = useState();

  const removeFacility = (index) => {
    const newFacility = facilities.slice();
    if (index >= 0 && index < newFacility.length) {
      newFacility.splice(index, 1);
    }
    setFacilities(newFacility);
  };

  const saveFacility = (facility) => {
    if (facility === "") return;
    const newFacility = facilities.slice();
    newFacility.push(facility);
    setFacilities(newFacility);
    setFacility("");
  };

  const [instructions, setInstructions] = useState(dataReceived.instructions);
  const [instruction, setInstruction] = useState();

  // console.log(instructions);

  const removeInstruction = (index) => {
    const newActivity = instructions.slice();
    if (index >= 0 && index < newActivity.length) {
      newActivity.splice(index, 1);
    }
    setInstructions(newActivity);
  };
  const saveInstruction = (instruction) => {
    // console.log(instruction);
    if (instruction === "") return;
    const newActivity = instructions.slice();
    newActivity.push(instruction);
    setInstructions(newActivity);
    setInstruction("");
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
      const { data } = await axios.put(
        `http://localhost:4000/api/admin/manageEvent/edit/${dataReceived._id}`,
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
      showToastMessage("success", "Event Details Updated Successfully !");
      navigate(`/admin/manageEvent/${dataReceived._id}`);
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
            <Label htmlFor="name" value="Event Name" className="flex mb-2" />
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
                className="flex mb-2"
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
                className="flex mb-2"
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
              className="flex mb-2"
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
              className="flex mb-2"
            />
            <div className="flex w-full">
              {/* {console.log(startingDate)} */}
              <input
                id="startingDate"
                type="date"
                value={getFormattedDate(startingDate)}
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
              className="flex mb-2"
            />
            <input
              id="endingDate"
              type="date"
              value={getFormattedDate(endingDate)}
              className="w-full bg-gray-100 border-none rounded-md"
              onChange={(e) => setEndingDate(e.target.value)}
            />
          </div>
          {/* City  */}
          <div>
            <Label htmlFor="city" value="City" className="flex mb-2" />
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

          <p className="py-4 font-bold text-2xl mb-4 text-black">
            Artist/Performer
          </p>

          {/* Artist Details  */}
          <div className="mb-4">
            {artists.map((artist, index) => {
              return (
                <div className="flex justify-between w-full mb-1 bg-gray-200 px-4 py-1 rounded-md items-center text-wrap ">
                  <p className="text-wrap text-lg text-blue-600 cursor-pointer underline" onClick={()=>getAnArtist(index)}> {`Artist ${index + 1}`}</p>
                  <MdOutlineDelete
                    className="text-2xl text-red-600 cursor-pointer flex w-6 "
                    onClick={() => deleteArtist(index)}
                  />
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
                  ref={fileInputRef2}
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
          <ArtistModal artistModalOpen={artistModalOpen} setArtistModalOpen={setArtistModalOpen} details={tempArtist}/>

          <p className="py-4 font-bold text-2xl mb-4 text-black">
            Ticket Details
          </p>

          {/* Ticket Price  */}
          <div>
            <Label
              htmlFor="ticketPrice"
              value="Ticket Price"
              className="flex mb-2"
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
              className="flex mb-2"
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
              className="flex mb-2"
            />
            <input
              id="bookingDeadline"
              type="date"
              value={getFormattedDate(bookingDeadline)}
              className="w-full bg-gray-100 border-none rounded-md"
              onChange={(e) => setBookingDeadline(e.target.value)}
            />
          </div>

          <p className="py-4 font-bold text-2xl mb-4 text-black">
            Activities / Sub Events
          </p>

          {/* Activities  */}
          <div className="py-4 flex flex-col gap-4 w-full mx-auto">
            <Label
              value="Add Activities/Sub Events if any"
              className="flex mb-2"
            />

            {/* {console.log(activities)}  */}
            {activities.map((activity, index) => {
              if (activity !== "") {
                return (
                  <div className="flex justify-between w-full mb-1 bg-gray-200 px-4 py-1 rounded-md items-center text-wrap">
                    <p className="text-lg text-wrap text-start w-full">
                      {activity}
                    </p>
                    <MdOutlineDelete
                      className="text-2xl text-red-600 cursor-pointer flex w-6 "
                      onClick={() => removeActivity(index)}
                    />
                  </div>
                );
              }
            })}
            <div className="flex w-full gap-2">
              <TextInput
                className="my-2 w-full "
                // id={index}
                type="text"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                placeholder={`Activity/Sub Event `}
                shadow
              />
              <Tooltip content="Add Activity/Sub event">
                <Button onClick={() => saveActivity(activity)}>
                  <FaRegSave className="text-xl" />
                </Button>
              </Tooltip>
            </div>
          </div>

          <p className="py-4 font-bold text-2xl mb-4 text-black">Facilities</p>

          {/* Facilities  */}
          <div className="py-4 flex flex-col gap-4 w-full mx-auto">
            <Label
              value="Add Activities/Sub Events if any"
              className="flex mb-2"
            />
            {/* {console.log(facilities)}  */}

            {facilities?.map((facility, index) => {
              if (facility != "") {
                return (
                  <div className="flex justify-between w-full mb-1 bg-gray-200 px-4 py-1 rounded-md items-center text-wrap">
                    <p className="text-lg text-wrap text-start w-full">
                      {facility}
                    </p>
                    <MdOutlineDelete
                      className="text-2xl text-red-600 cursor-pointer flex w-6 "
                      onClick={() => removeFacility(index)}
                    />
                  </div>
                );
              }
            })}
            <div className="flex w-full gap-2">
              <TextInput
                className="my-2 w-full "
                type="text"
                value={facility}
                onChange={(e) => setFacility(e.target.value)}
                placeholder={`Facility `}
                shadow
              />
              <Tooltip content="Add Facility">
                <Button onClick={() => saveFacility(facility)}>
                  <FaRegSave className="text-xl" />
                </Button>
              </Tooltip>
            </div>
          </div>

          <p className="py-4 font-bold text-2xl mb-4 text-black">
            Instructions for attendees
          </p>

          {/* Instructions  */}
          <div className="py-4flex flex-col gap-4 w-full mx-auto">
            <Label
              value="Add Activities/Sub Events if any"
              className="flex mb-2"
            />

            {/* {console.log(instructions)} */}
            {instructions.map((instruction, index) => {
              if (instruction !== "") {
                return (
                  <div className="flex justify-between w-full mb-4 bg-gray-200 px-4 py-1 rounded-md items-center text-wrap">
                    <p className="text-lg text-wrap text-start w-full">
                      {instruction}
                    </p>
                    <MdOutlineDelete
                      className="text-2xl text-red-600 cursor-pointer flex w-6 "
                      onClick={() => removeInstruction(index)}
                    />
                  </div>
                );
              }
            })}
            <div className="flex w-full gap-2">
              <TextInput
                className="my-2 w-full "
                // id={index}
                type="text"
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                placeholder={`Activity/Sub Event `}
                shadow
              />
              <Tooltip content="Add Activity/Sub event">
                <Button onClick={() => saveInstruction(instruction)}>
                  <FaRegSave className="text-xl" />
                </Button>
              </Tooltip>
            </div>
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
              className="flex mb-2"
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
            {/* <Button
              onClick={addImage}
              className="mt-4 whitespace-nowrap w-full"
            >
              <span className="flex items-center  w-full h-full px-5">
                <IoMdAdd className="text-2xl" />
              </span>
              Add Poster
            </Button> */}
          </div>

          <div className="flex flex-row items-center justify-center">
            <Button
              color="dark"
              // type="button"
              onClick={submit}
              className="flex items-center justify-center w-full p- rounded-md text-white mt-5 "
              isProcessing={loading}
              disabled={loading}
            >
              <span className="font-medium">
                {" "}
                {/* Post Event */}
                {loading ? "Processing... " : "Update Event Details"}
              </span>
            </Button>
          </div>
          <ToastContainer />
        </form>
      </div>
    </>
  );
};

export default EditEventDetails;
