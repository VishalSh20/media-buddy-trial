import { useState } from "react"
import Header from "./components/Header"
import Home from "./pages/Home"
import UserMedia from "./pages/UserMedia"

export default function App() {
  const allTabs = ["Home","My media"]
  const [selectedTab,setSelectedTab] = useState("Home") 
  console.log(import.meta.env);

  return (<div className="w-full min-h-svh bg-gradient-to-r from-indigo-400 to bg-purple-500">
      <Header allTabs={allTabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
     {
      selectedTab=="Home"
      ?
      <Home/>
      :
      <UserMedia/>
     } 
    
    </div>)
 
}
