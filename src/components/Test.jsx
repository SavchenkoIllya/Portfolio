import { useEffect } from "react";

//external packages
import aalib from "aalib.js";

//data
import video from ".././assets/video.mp4";

export default function Test() {
  useEffect(() => {
    aalib.read.video
      .fromVideoElement(document.querySelector("video"), { autoplay: true })
      .map(aalib.aa({ width: 100, height: 100 }))
      .map(
        aalib.render.canvas({
          width: 400,
          height: 700,
          el: document.querySelector("#video-scene"),
        })
      )
      .subscribe();
  }, []);

  return (
    <div className="flex items-end">
      <div className="fixed top-0 left-0">
        <video src={video} className="relative w-0 h-0" muted loop></video>
      </div>
      <canvas id="video-scene" className="my-auto"></canvas>
    </div>
  );
}
