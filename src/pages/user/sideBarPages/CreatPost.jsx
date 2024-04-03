import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
// import { CgAddR } from "react-icons/cg";
import { IoIosImages } from "react-icons/io";
import Clintcontex from '../../userContext/ClientContext';
import axios from "axios";



// import { useNavigate } from 'react-router';


function CreatPost() {
  const [image,setImage] = useState([])
  const [preview,setPreview]  = useState(null);
  const [caption,setCaption] = useState("")

  const {userData} =  useContext(Clintcontex);

  // const navigate = useNavigate();

  const apikey = "237691142669394";
  const cloudname = "dvxrfsr4e"

  const cancelButton = (e) => {
    // e.preventDefault();
    const modal = document.getElementById("my_modal_3")
    if(modal ){
      modal.hidden = true
    }
  }
  const clickCreate = () => {
    const modalCreate = document.getElementById("my_modal_3")
    if(modalCreate){
      modalCreate.hidden = false
    }if(preview){    
    }
  }
  const   selectImage = (e) => {
   const file = e.target.files[0];
    setImage(file);
    const modalUpload = document.getElementById("my_modal_3")
    console.log("file", image);
   if(file){
    modalUpload.hidden=true;
   }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };

    if(file){
      reader.readAsDataURL(file)
    }
  };
  
  const presetimg ="instagram_post_photo"


  const captionHandle = (e) =>{
    setCaption(e.target.value)
    // console.log(caption);
    }

  const  handleSubmit = async (e) =>{
    e.preventDefault();

    if(!image){
      toast.error("no image select")
      return
    }
    console.log(image.name,"image");
  const imageFile = image;

  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('upload_preset',presetimg );
  formData.append('api_key', apikey);
    console.log("uploading")
    console.log(formData);
    try{
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`, {
      method: 'POST',
      body: formData,
    });
      alert("success")
      console.log(response.url);
  

      const data = await response.json()
      
 const backendResponse = await axios.post('http://localhost:3003/user/post', {
  imageUrl: data.secure_url,
  email: userData.email,
  caption: caption,
});

      console.log(backendResponse.data);  
     }catch(err){
       console.log(err)
      }
    

     }


  return (
    <div>
              {/* UPLOAD IMAGE */}


              <div id='main' className=" mx-60 my-36 shadow-2xl justify-center items- z-10">
             
             <div id="my_modal_3"  >
              
               <div className="bg-white p-6 h-96 ">
                 <button className="btn btn-sm text-xl font-bold  btn-circle btn-ghost relative top-2 p-2"
                 onClick={cancelButton}>
                   ✕
                 </button>
               
                 <h3 className="font-bold text-lg text-center m-5 w-64 ">
                   Create new post
                 </h3>
                 <hr className=" border-black my-4" />
                 <div className=" flex justify-center">
                   <IoIosImages className="size-20 align-bottom mt-10" />
                   
                 </div>
                 <h1 className="font-medium text-center mt-3 mb-6">
                   Upload Photos Here
                 </h1>
                 <label
                   htmlFor="fileInput"
                   className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-md px-3 py-2 mx-20 my-6 cursor-pointer"
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
             </div>
           </div>
                {
                  !preview && (
                <div className='m-64 w-fit flex justify-items-center '>
                  <button className='fixed align-top mx-44 bg-blue-500 rounded-2xl py-2 px-7 font-semibold text-white ' onClick={clickCreate}>create</button>
                </div>
                  )}

            {preview && (
              <div className='inline-block rounded-xl border-4 border-gray-300 shadow-2xl mx-[300px]'>

        <div className=" px-1 py-1">
          <img src={preview} alt="Preview" className="object-contain w-96 h-60" />
          <textarea value={caption} onChange={captionHandle} className='bg-gray-100 m-3 w-80 h-10 border-s-2 focus:outline-none' placeholder='caption ...' />
          <div className='p-3 flex justify-between'>
            <div className='flex space-x-8 '>
            <button className='bg-blue-500 text-white py-1 px-2 rounded-lg'>cancel</button>
            <button className='bg-blue-500 text-white py-1 px-2 rounded-lg'>edit</button>
            </div>
            <button className='bg-blue-500 text-white py-1 px-2 rounded-lg' onClick={handleSubmit}>post</button>
          </div>
        </div>

        </div>
      )}
      
    </div>
  )
}

export default CreatPost