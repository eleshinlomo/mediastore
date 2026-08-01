import '../styles/Remote.css'
import {
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaVolumeMute,
} from "react-icons/fa";

const Remote=()=> {
  const handlePower = () => {
    console.log("Power");
  };

  const handleMute = () => {
    console.log("Mute");
  };

  const handleUp = () => {
    console.log("Up");
  };

  const handleDown = () => {
    console.log("Down");
  };

  const handleLeft = () => {
    console.log("Left");
  };

  const handleRight = () => {
    console.log("Right");
  };

  const handleOK = () => {
    console.log("OK");
  };

  const handleBack = () => {
    console.log("Back");
  };

  const handleHome = () => {
    console.log("Home");
  };

  const handleVolDown = () => {
    console.log("Volume Down");
  };

  const handleVolUp = () => {
    console.log("Volume Up");
  };

  const handleYoutube = () => {
    console.log("Open YouTube");
  };

  return (
    <div className="remote">

      <div className="topButtons">

        <button
          className="powerBtn"
          onClick={handlePower}
        >
          ⏻
        </button>

        <button
          className="muteBtn"
          onClick={handleMute}
        >
          <FaVolumeMute />
        </button>

      </div>

      <div className="pad">

        <button
          className="arrow up"
          onClick={handleUp}
        >
          <FaArrowUp />
        </button>

        <button
          className="arrow left"
          onClick={handleLeft}
        >
          <FaArrowLeft />
        </button>

        <button
          className="ok"
          onClick={handleOK}
        >
          OK
        </button>

        <button
          className="arrow right"
          onClick={handleRight}
        >
          <FaArrowRight />
        </button>

        <button
          className="arrow down"
          onClick={handleDown}
        >
          <FaArrowDown />
        </button>

      </div>

      <div className="row">

        <button
          className="smallBtn"
          onClick={handleBack}
        >
          Back
        </button>

        <button
          className="smallBtn"
          onClick={handleHome}
        >
          Home
        </button>

      </div>

      <div className="row">

        <button
          className="smallBtn"
          onClick={handleVolDown}
        >
          VOL -
        </button>

        <button
          className="smallBtn"
          onClick={handleVolUp}
        >
          VOL +
        </button>

      </div>

      <button
        className="youtubeBtn"
        onClick={handleYoutube}
      >
        📺 Launch YouTube
      </button>

    </div>
  );
}
 export default Remote