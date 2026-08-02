import { useEffect, useState } from "react"
import Remote from "./components/Remote"
import HubManagement from "./components/HubManagement"
import { fetchDevices} from "./api/Devices"


const App = ()=>{

  const [showRemote, setShowRemote] = useState(false)
  const [devices, setDevices] = useState([]);
  const [activeDevice, setActiveDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')
  
  // Input fields for administration panel setup
  const [newName, setNewName] = useState('');
  const [newIp, setNewIp] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [username, setUsername] = useState('')
  const [hasUsername, setHasUsername] = useState(false)
  const [savedUsername, setSavedUsername] = useState('')


  useEffect(()=>{
     const savedName = localStorage.getItem('username')
     if(savedName){
       setSavedUsername(savedName)
        setUsername(savedName)
        setHasUsername(true)
     }
  }, [])

  const handleFetchDevices = async ()=>{
   
    if(!savedUsername) return
     console.log('SAVED USERNAME', savedUsername)
   
    const payload = {username: savedUsername}
    const data = await fetchDevices(payload)
    console.log('DEVICES', data)
     setDevices(data);
      if (data.length > 0 && !activeDevice) {
        setActiveDevice(data[0]); 
      }
  }

  useEffect(() => {
    handleFetchDevices();
  }, [savedUsername]);





  const handleShowForm = ()=>{
     setShowForm(true)
  }

    const handleHideForm = ()=>{
     setShowForm(false)
  }

  const handleSaveUsername = ()=>{
     if(!username) return
     localStorage.setItem('username', username)
     setHasUsername(true)
  }
   

 
  return (
  <div className="text-center  pt-12">

    <div>Hello {username ? username : 'Guest'}</div>  

    {hasUsername && <div className="text-red-500 font-bold mb-4">
      {error ||  !activeDevice && 'No active Device found'}
    </div>
    }
     
     {!hasUsername &&
     <div className="text-black justify-center items-center gap-4 text-center flex flex-col">
      <h3>Enter a username to get started</h3>
      <input 
      className="border border-blue-500 "
      type='text' 
      onChange={(e)=>setUsername(e.target.value)} placeholder="Enter username" />
      <button className="bg-blue-500" onClick={handleSaveUsername}>Save Username</button>
    </div>
     }


    {showForm && hasUsername && 
    <HubManagement 
    setDevices={setDevices}
    username={username} 
    activeDevice={activeDevice} 
    setActiveDevice={setActiveDevice}
    />
    }
    
    {hasUsername && 
    <div>
      {!showForm ? 
        <button onClick={handleShowForm} className="bg-blue-500 p-6">Add New Device</button>:
        <button onClick={handleHideForm} className="bg-red-500 p-6">Hide Form</button>
       }
       </div>
      }
    
    
    {activeDevice &&  (
      <div>
        {/* Active Device */}
        <div className="flex gap-2 text-center">
         <span>Device Name: {activeDevice.name}</span>
          <span>Device IP: {activeDevice.ip}</span>
        </div>

   
       <Remote activeDevice={activeDevice} />
      </div>
    )}
    
    
  </div>
)

}

export default App