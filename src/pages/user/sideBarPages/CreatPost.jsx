import React, { useState } from 'react'
import { CgAddR } from "react-icons/cg";
import { IoIosImages } from "react-icons/io";
import { useNavigate } from 'react-router';




function CreatPost() {
  const [image,setImage] = useState([])
  const [preview,setPreview]  = useState(null);

  const navigate = useNavigate();


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


  const selectImage = (e) => {
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
                   multiple
                   accept="image/*"
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
             {/* <div className="rounded-3xl shadow-2xl fcenterlex justify-center items-">
             
              <div id="my_modal_3"  >
                <form method="dialog">
                  <button className="btn btn-sm text-xl font-bold  btn-circle btn-ghost absolute right-2 top-2 p-2">
                    ✕
                  </button>
                </form>
                <div className="bg-white p-6 h-96 ">
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
                    onChange={(e) => setImage(e.target.files)}
                    multiple
                    accept="image/*"
                  />
                </div>
              </div>
            </div> */}
            {preview && (
        <div className="mt-4">
          <img src={preview} alt="Preview" className="w-[200px] h-60" />
        </div>
      )}
      
    </div>
  )
}

export default CreatPost