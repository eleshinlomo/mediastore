import { useState } from "react";
import "../styles/HubManagement.css";
import { addDevice} from "../api/Devices";

export default function HubManagement({username,setDevices, activeDevice, setActiveDevice}) {

  const [deviceName, setDeviceName] = useState('')
  const [ipAddress, setIpAddress] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('Register a New Device')
  

    const handleAddDevice = async ()=>{
      console.log('SAVING DEVICE...')
      console.log('USERNAME', username)
      if(!username?.trim()){
        setError('Username cannot be empty')
        return
      }
      if(!deviceName?.trim()){
         setError('No device name found')
         return
      }

      if(!ipAddress?.trim()){
         setError('No Ip address found')
         return
      }

      const payload = {username, name: deviceName, ip: ipAddress}
      const response = await addDevice(payload)
        console.log('data', response)

      if(response.status === 'success'){
      const devices = response.data
      setDevices(devices);
      if (devices.length > 0 && !activeDevice) {
        setActiveDevice(devices[0]); 
      }

      setIpAddress('')
      setDeviceName('')
      setMessage('Your new device has been added')
    }
    
  }

  

  return (
    <div className="container">
      {error}
      <div className="card">
        <h2>{message}</h2>

    

        <input
          onChange={(e)=>setDeviceName(e.target.value)}
          type="text"
          placeholder="Room Label (e.g. Bed Room 2)"
        />

        <input 
          onChange={(e)=>setIpAddress(e.target.value)}
          type="text"
          placeholder="Television IP Address (e.g. 192.168.8.110)"
        />

        <button 
        onClick={handleAddDevice}
        className="save-btn">
          Add Device
        </button>
      </div>

    </div>

  );
}