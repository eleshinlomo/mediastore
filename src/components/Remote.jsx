import { sendButtonCommand } from '../api/Devices';
import '../styles/Remote.css'
import {
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaVolumeMute,
} from "react-icons/fa";

const Remote=({activeDevice})=> {


  const handleButtonPress = async (command)=>{
    console.log('COMMAND', command)
    const payload = {command, ip: activeDevice.ip}
      const response = await sendButtonCommand(payload)
  }

 
  return (
    <div className="remote">

      <div className="topButtons">

        <button
          className="powerBtn"
          onClick={()=>handleButtonPress('POWER')}
        >
          ⏻
        </button>

        <button
          className="muteBtn"
          onClick={()=>handleButtonPress('MUTE')}
        >
          <FaVolumeMute />
        </button>

      </div>

      <div className="pad">

        <button
          className="arrow up"
          onClick={()=>handleButtonPress('UP')}
        >
          <FaArrowUp />
        </button>

        <button
          className="arrow left"
          onClick={()=>handleButtonPress('LEFT')}
        >
          <FaArrowLeft />
        </button>

        <button
          className="ok"
          onClick={()=>handleButtonPress('SELECT')}
        >
          OK
        </button>

        <button
          className="arrow right"
          onClick={()=>handleButtonPress('RIGHT')}
        >
          <FaArrowRight />
        </button>

        <button
          className="arrow down"
          onClick={()=>handleButtonPress('DOWN')}
        >
          <FaArrowDown />
        </button>

      </div>

      <div className="row">

        <button
          className="smallBtn"
          onClick={()=>handleButtonPress('BACK')}
        >
          Back
        </button>

        <button
          className="smallBtn"
          onClick={()=>handleButtonPress('HOME')}
        >
          Home
        </button>

      </div>

      <div className="row">

        <button
          className="smallBtn"
          onClick={()=>handleButtonPress('VOL_DOWN')}
        >
          VOL -
        </button>

        <button
          className="smallBtn"
          onClick={()=>handleButtonPress('VOL_UP')}
        >
          VOL +
        </button>

      </div>

      <button
        className="youtubeBtn"
        onClick={()=>handleButtonPress('YOUTUBE')}
      >
        📺 Launch YouTube
      </button>

    </div>
  );
}
 export default Remote