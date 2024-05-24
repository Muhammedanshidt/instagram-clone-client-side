import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
// import { CgAddR } from "react-icons/cg";
import { IoIosImages } from "react-icons/io";
import { RiVideoUploadFill } from "react-icons/ri";
import Clintcontex from "../../userContext/ClientContext";
import { useNavigate } from "react-router";
import axios from "axios";

function CreatPost() {
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [captionVideo, setCaptionVideo] = useState("");
  const [previewVideo, setPreviewVideo] = useState(null);
  const [duration, setDuration] = useState(null);

  const { userData } = useContext(Clintcontex);

  const navigate = useNavigate();

  const apikey = "237691142669394";
  const cloudname = "dvxrfsr4e";

  const cancelButton = (e) => {
    // e.preventDefault();
    const modal = document.getElementById("my_modal_3");
    if (modal) {
      modal.hidden = true;
    }
  };
  const clickCreate = () => {
    const modalCreate = document.getElementById("my_modal_3");

    modalCreate.hidden = false;

    if (preview) {
    }
  };
  const selectImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const modalUpload = document.getElementById("my_modal_3");
    
    if (file) {
      modalUpload.hidden = true;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const selectVideo = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    const modalUpload = document.getElementById("my_modal_3");

    if (file) {
      modalUpload.hidden = true;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewVideo(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const presetimg = "instagram_post_photo";

  const captionHandle = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("no image select");
      return;
    }
    
    const imageFile = image;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", presetimg);
    formData.append("api_key", apikey);
   
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      alert("success");
      
      const data = await response.json();

      const backendResponse = await axios.post(
        "post",
        {
          imageUrl: data.secure_url,
          id: userData._id,
          caption: caption,
        }
      );

      
    } catch (err) {
      console.log(err);
    }
  };

  const presetvideo = "instagram_reels";

  const captionHandleVideo = (e) => {
    setCaptionVideo(e.target.value);
  };

  const handleSubmitVideo = async (e) => {
    e.preventDefault();

    if (!video) {
      toast.error("no video select");
      return;
    }
    
    const videoFile = video;

    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("upload_preset", presetvideo);
    formData.append("api_key", apikey);
   
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudname}/video/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      alert("success");

      const data = await response.json();

      const backendResponse = await axios.post(
        "postvideo",
        {
          videoUrl: data.secure_url,
          id: userData._id,
          caption: captionVideo,
        }
      );


    } catch (err) {
      console.log(err);
    }
  };

  const handleLoadedMetadata = (event) => {
    const videoElement = event.target;
    setDuration(videoElement.duration);
  };

  return (
    <div id="scrollTabHide">
      {/* UPLOAD IMAGE */}

      <div id="main scrollTabHide" className=" mx-60 shadow-2xl justify-center">
        <div id="my_modal_3">
          <div className="bg-white p-6 h-fit ">
            <button
              className="btn btn-sm text-xl font-bold  btn-circle btn-ghost relative top-2 p-2"
              onClick={cancelButton}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg text-center ml-28 w-64 ">
              Create new post
            </h3>
            <hr className=" border-black my-4" />
            <div className="flex justify-between">
              <div>
                <div className=" flex justify-center">
                  <IoIosImages className="size-20 align-bottom mt-10" />
                </div>
                <h1 className="font-medium text-center mt-3 mb-6">
                  Upload Photo Here
                </h1>
                <label
                  htmlFor="fileInput"
                  className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer p-2 rounded-lg font-semibold "
                >
                  Select From Computer
                </label>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden "
                  onChange={selectImage}
                  //  accept="image/*"
                />
              </div>
              <div>
                <div className=" flex justify-center">
                  <RiVideoUploadFill className="size-20 align-bottom mt-10" />
                </div>
                <h1 className="font-medium text-center mt-3 mb-6">
                  Upload Video Here
                </h1>
                <label
                  htmlFor="fileInputVideo"
                  className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer p-2 rounded-lg font-semibold   "
                >
                  Select From Computer
                </label>
                <input
                  type="file"
                  id="fileInputVideo"
                  className="hidden "
                  onChange={selectVideo}
                  //  accept="image/*"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {!preview && (
        <div className=" absolute mx-96 -z-20 top-36 w-fit flex justify-items-center ">
          <button
            className="fixed align-top bg-blue-500 rounded-2xl py-2 px-7 font-semibold text-white "
            onClick={clickCreate}
          >
            create
          </button>
        </div>
      )}

      {previewVideo && (
        <div className="inline-block mx-72 rounded-md my-20 shadow-2xl">
          <div>
            <video
              width="400"
              controls
              className="rounded-t-md"
              onLoadedMetadata={handleLoadedMetadata}
            >
              <source src={previewVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <input
            value={captionVideo}
            onChange={captionHandleVideo}
            className="bg-gray-100 p-2 mr-2 w-full h-10 border-s-2 focus:outline-none "
            placeholder="caption ..."
          />

          <div className="flex justify-between mx-3">
            <button
              className="hover:text-red-500 text-lg font-semibold w-fit p-1"
              onClick={() => setPreviewVideo(null)}
            >
              cancel
            </button>
            <button
              className="hover:text-blue-600 text-lg font-semibold w-fit p-1"
              onClick={handleSubmitVideo}
            >
              post
            </button>
          </div>
        </div>
      )}

      {preview && (
        <div className="inline-block rounded-xl border-4 border-gray-300 shadow-2xl mx-[300px]">
          <div className=" px-1 py-1">
            <img
              src={preview}
              alt="Preview"
              className="object-contain w-96 h-60"
            />
            <textarea
              value={caption}
              onChange={captionHandle}
              className="bg-gray-100 m-3 w-80 h-10 border-s-2 focus:outline-none"
              placeholder="caption ..."
            />
            <div className="p-3 flex justify-between">
              <div className="flex space-x-8 ">
                <button
                  className="bg-blue-500 text-white py-1 px-2 rounded-lg"
                  onClick={() => navigate(setPreview(null))}
                >
                  cancel
                </button>
                {/* <button className='bg-blue-500 text-white py-1 px-2 rounded-lg'>edit</button> */}
              </div>
              <button
                className="bg-blue-500 text-white py-1 px-2 rounded-lg"
                onClick={handleSubmit}
              >
                post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatPost;
