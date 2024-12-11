import {useRef, useState } from "react";
import { Toaster,toast } from "react-hot-toast";
import {MdCancel,MdUploadFile} from "react-icons/md"
import {api} from "../../axios.config.js";

export default function HomePage() {
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading,setUploading] = useState(false);
  const inputRef = useRef();

  const handleMediaUpload = () => {
        console.log(uploadFile);
        setUploading(true);
        const uploadToast = toast.loading("Uploading your file..",{
          position:"top-center"
        })
        const filename = uploadFile.name.substring(0,uploadFile.name.indexOf("."));
        const {size,type} = uploadFile;

        const requestURL = `${import.meta.env.VITE_BACKEND_URL}/upload?filename=${filename}&size=${size}&type=${type}`;

        api
        .get(requestURL)
        .then((response)=>{
          console.log(response);
            const postingURL = response.data?.url;
            if(!postingURL)
              throw new Error("response url not present");

            api
            .put(postingURL,uploadFile,{
                headers:{
                  "Content-Type":type
                }
            })
            .then(()=>{
              toast.success("File uploaded Successfully!",{position:"top-center",id:uploadToast})
            })
            .catch((err)=>{
              toast.error(`Error in uploading file: ${err.message || err.statusText}`,{id:uploadToast});
            })

        })
        .catch((err)=>{
            console.log(err);
            toast.error(`Error in uploading file: ${err.message || err.statusText}`,{id:uploadToast});
        })
        .finally(()=>setUploading(false));

  }

  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center text-center text-white">
      {/* Neon Heading */}
      <h1 className="text-5xl font-extrabold neon-text mb-6">
        Welcome to Media Buddy
      </h1>
      <p className="text-xl text-gray-300 mb-10">
        Your cloud-powered solution for managing videos and images effortlessly!
      </p>

      {/* Input */}
      <div className="flex w-full p-2 gap-2 rounded-md justify-center">
      <input 
      type="file" 
      accept="image/*,video/*"
      placeholder="upload media"
      className="bg-gray-700 p-2 rounded-md"
      ref={inputRef}
      disabled={uploading}
      onChange={()=>{
        setUploadFile(inputRef.current?.files?.[0]);
      }}
      />
      {/* <span>{uploadFileName}</span> */}
      {
        uploadFile
        &&
       <div className="flex gap-4">
        <button
          className="text-gray-900 bg-red-400 p-2 rounded-md"
          onClick={()=>{
            inputRef.current.value = "";
            setUploadFile(null);
          }}
        >
            <MdCancel/>
        </button>
        <button
          className="text-gray-900 bg-green-400 p-2 rounded-md"
          onClick={()=>{
            handleMediaUpload();
            inputRef.current.value = ""
            setUploadFile(null);
          }}
        >
            <MdUploadFile/>
        </button>
       </div>
      }
      </div>

      <Toaster/>
    </div>
  );
}
