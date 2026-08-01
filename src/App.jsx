import { useState } from "react"
import Remote from "./components/Remote"


const App = ()=>{

  const [showRemote, setShowRemote] = useState(false)
  const [isIpAddress, setIsIpAddress] = useState(false)

   
  const handleShowRemote = ()=>{
      setShowRemote(true)
  }

  const handleHideButton = ()=>{
     setShowRemote(false)
  }

  return (
    <div className="text-center text-white">
      <div className="flex gap-4 justify-center items-center">
        <button 
        onClick={handleShowRemote}
        className="bg-blue-500 rounded-2xl px-4">
          Show Remote
        </button>

        <button 
        onClick={handleHideButton}
        className="bg-blue-500 rounded-2xl px-4">
          Hide Remote
        </button>
     </div>

       {
        showRemote && <Remote />
        }
    </div>
  )
}

export default App