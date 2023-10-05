"use client";
import { useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "lucide-react";
const Video: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [animateIcon, setAnimate] = useState<boolean>(false);
  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video && video.paused) {
      video.play();
      setAnimate(true);
    } else if (video) {
      video.pause();
      setAnimate(false);
    }
  };
  return (
    <>
      <div
        onClick={handlePlayPause}
        className="w-11/12 hover:opacity-100 opacity-0 flex max-w-[1038px] h-5/6  justify-center items-center absolute z-[999] rounded-lg">
        {animateIcon ? (
          <PauseIcon
            className="bg-[#3838386e] p-7 rounded-full flex justify-center"
            width={"96px"}
            height={"96px"}
            radius={"10px"}
            color="white"
          />
        ) : (
          <PlayIcon
            className="bg-[#3838386e] p-7 rounded-full flex justify-center"
            width={"96px"}
            height={"96px"}
            radius={"10px"}
            color="white"
          />
        )}
      </div>
      <video
        ref={videoRef}
        className="my-20 flex justify-center max-h-[600px] border-[10px] border-primary  shadow-2xl rounded-lg">
        <source src="/Introduction.mp4" type="video/mp4" className="w-full" />
        Video not supported
      </video>
    </>
  );
};

export default Video;
