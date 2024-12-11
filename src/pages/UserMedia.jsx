import { useState } from "react"
import ImageGallery from "../components/UserMedia/ImageGallery";
import VideoGallery from "../components/UserMedia/VideoGallery";


function UserMedia() {
  const [tab,setTab] = useState("image");
  const [imagePage,setImagePage] = useState(1);
  const [videoPage,setVideoPage] = useState(1);

  return (
    <div className="w-full min-h-svh flex flex-col gap-8 bg-inherit">\
      <h2 className="font-mono font-4xl">
        Media
      </h2>
      <div className="flex gap-4 p-2  rounded-md border-gray-700 border-2 bg-gray-500 hover:bg-purple-400">
        <button 
        className={`p-2 rounded-md ${tab=="image" ? "bg-orange-400 border-red-200" : "bg-orange-100"}`}
        onClick={()=>setTab("image")}
        >
          Images
        </button>
        <button
         className={`p-2 rounded-md ${tab=="video" ? "bg-orange-400 border-red-200" : "bg-orange-100"}`}
         onClick={()=>setTab("video")}
        >
          Videos
        </button>
      </div>

      <main className="w-full p-4">
        {
          tab=="image"
          ?
          <ImageGallery page={imagePage} setPage={setImagePage}/>
          :
          <VideoGallery page={videoPage} setPage={setVideoPage}/>
        }
      </main>

    </div>
  )
}

export default UserMedia