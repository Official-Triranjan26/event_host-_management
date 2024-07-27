import { Button, FileInput, Label, TextInput } from "flowbite-react";
import React, { useRef, useState } from "react";
import { IoMdAdd, IoMdCloudUpload } from "react-icons/io";
import ImageModal from "../components/adminComponents/ImageModal";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import showToastMessage from "../components/Toast";

const TestPage = () => {
  const fileInputRef = useRef(null);
  const [artists, setArtists] = useState([]);
  console.log(artists);
  const [artistName,setArtistName]=useState();
  const [artistPic,setArtistPic]=useState();
  const [artistPicUrl,setArtistPicUrl]=useState();

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

  const saveArtist = async() =>{
    console.log(artistName)
    console.log(artistPicUrl)
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
          artistPicUrl
        },
        config
      );
      console.log("data",data);
      console.log("id",data._id);
      const newArr=artists.slice();
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
  }

  return (
    <>
      <p className="py-4 font-bold text-2xl mb-4 text-black">
        Artist/Performer
      </p>

      {/* Artist Details  */}
        <div className="mb-4">
          {artists.map((artist,index)=>{
            return <div className="w-full bg-gray-200 mb-2 rounded-md ">
              {`Artist ${index+1}`}
            </div>
          })}
          <div>
            <Label
              value={`Artist/Performer Name`}
              className="flex mb-4"
            />
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
      <Button className="whitespace-nowrap" onClick={()=>saveArtist()}>
        <span className="flex items-center  w-full h-full px-5">
          <IoMdAdd className="text-2xl" />
        </span>
        Add Artist
      </Button>
    </>
  );
};

export default TestPage;
