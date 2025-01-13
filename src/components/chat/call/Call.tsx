import { useEffect, useRef, useState } from "react";
import CallActions from "./CallActions";
import CallArea from "./CallArea";
import Header from "./Header";
import Ringing from "./Ringing";

type Props = {
  call: any;
  setCall: any;
  callAccpted: any;
  userVideo: any;
  myVideo: any;
  stream: any;
  setCallAccepted: any;
  answerCall: any;
  show: any;
  endCall: any;
};

const Call = ({
  call,
  setCall,
  callAccpted,
  userVideo,
  myVideo,
  stream,
  // setCallAccepted,
  answerCall,
  show,
  endCall,
}: Props) => {
  const { receivingCall, callEnded } = call;
  const [showActions, setShowActions] = useState(false);
  const [toggle, setToggle] = useState(false);
  const { name, picture } = call;
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        await audioRef.current.play();
      }
    };

    playAudio();
  }, [receivingCall, callAccpted]);

  return (
    <>
      {show && (
        <div
          onMouseOver={() => setShowActions(true)}
          onMouseOut={() => setShowActions(false)}
          className={`fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[300px] h-[550px] z-10 rounded-2xl overflow-hidden bg-gray-900 ${
            receivingCall && !callAccpted ? "hidden" : ""
          }`}
        >
          {/* container */}
          <div className="">
            <div className="">
              {/* header */}
              <Header />
              {/* call area */}
              <CallArea name={name} />
              {/* call actions */}
              {showActions && <CallActions endCall={endCall} />}
            </div>
            {/* video streams */}
            <div>
              {/* user video */}
              <div>
                {callAccpted && !callEnded && (
                  <video
                    ref={userVideo}
                    playsInline
                    muted
                    autoPlay
                    className={`${
                      !toggle ? "largeVideoCall" : "SmallVideoCall"
                    }`}
                    onClick={() => setToggle((e: any) => !e)}
                  />
                )}
              </div>
              {/* my video */}
              <div onClick={() => setToggle((e: any) => !e)}>
                {stream && (
                  <video
                    ref={myVideo}
                    playsInline
                    muted
                    autoPlay
                    className={` ${showActions && "moveVideoCall"} ${
                      toggle ? "largeVideoCall" : "SmallVideoCall"
                    }`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ringing */}
      {receivingCall && !callAccpted && (
        <Ringing
          call={call}
          setCall={setCall}
          picture={picture}
          name={name}
          answerCall={answerCall}
          endCall={endCall}
        />
      )}
      {/* calling ringtone */}
      {!callAccpted && show && (
        <audio
          src="/audio/ringing.mp3"
          ref={audioRef}
          preload="auto"
          autoPlay
          controls
        ></audio>
      )}
    </>
  );
};

export default Call;
