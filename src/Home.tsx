import { useEffect, useRef } from "react";

const Home = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    navigator?.mediaDevices
      ?.getUserMedia({ video: true, audio: true })
      .then((stream: MediaStream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      });
  }, []);
  return (
    <div>
      <video ref={videoRef} autoPlay></video>
    </div>
  );
};

export default Home;
