import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

type Props = {
  call: any;
  setCall: any;
  picture: any;
  name: any;
  answerCall: any;
  endCall: any;
};

const Ringing = ({
  call,
  // setCall,
  picture,
  name,
  answerCall,
  endCall,
}: Props) => {
  const { receivingCall } = call;
  const [timer, setTimer] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  let interval: any;

  const handleTimer = () => {
    interval = setInterval(() => {
      setTimer((e: any) => e + 1);
    }, 1000);
  };

  useEffect(() => {
    if (timer < 5) {
      handleTimer();
    } else {
      endCall();
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        await audioRef.current.play();
      }
    };

    playAudio();
  }, [receivingCall]);

  return (
    <div className="dark:bg-dark_bg_1 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg z-30">
      {/* container */}
      <div className="p-4 flex items-center justify-center gap-x-8">
        {/* call information */}
        <div className="flex items-center gap-x-2">
          <img
            src={picture}
            alt={`caller profile picture`}
            className="w-28 h-28 rounded-full object-cover"
          />
          <div className="">
            <h1 className="text-white">
              <b>{name}</b>
            </h1>
            <span className="dark:text-dark_text_2 ">Zchat video...</span>
          </div>
        </div>
        {/* call actions */}
        <ul className="flex items-center gap-x-2">
          <li onClick={endCall}>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500">
              <IoClose className="text-white w-5" />
            </button>
          </li>
          <li onClick={answerCall}>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500">
              <FaCheck className="text-white w-6" />
            </button>
          </li>
        </ul>
      </div>
      {/* ringtone */}
      <audio
        src="/audio/ringtone.mp3"
        ref={audioRef}
        preload="auto"
        autoPlay
      ></audio>
    </div>
  );
};

export default Ringing;
