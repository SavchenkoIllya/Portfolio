import { TextScramble } from "@a7sc11u/scramble";
import { useState, useEffect } from "react";

export default function Preloader({ loading }) {
  const [screen, setScreen] = useState(window.innerWidth);
  const [fontResize, setFontResize] = useState(200);

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
      let fontSize = window.innerWidth / 16;
      setFontResize(fontSize);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const text =
    "The futility of everything that comes to us from the media is the inescapable \
    consequence of the absolute inability of that particular stage to remain silent.\
     Music, commercial breaks, news flashes, adverts, news broadcasts, movies,\
      presenters—there is no alternative but to fill the screen; otherwise there\
       would be an irremediable void. We are back in the Byzantine situation, where\
        idolatry calls on a plethora of images to conceal from itself the fact that\
         God no longer exists. That's why the slightest technical hitch, the slightest\
          slip on the part of a presenter becomes so exciting, for it reveals the depth\
           of the emptiness squinting out at us through this little window.";

  return (
    <div
      className={
        "fixed bg-black text-white z-30 top-0 left-0 w-[100%] h-[100%]" +
          (loading && " remover ")
      }
    >
      <div className="relative">
        <div className="flex flex-col xl:flex-row">
          <p style={{ width: screen }} className="text-[10rem] mt-20 preloader">
            Savchenko
          </p>
          <TextScramble
            className="text-base ml-0 mt-32 xl:mt-0 xl:ml-20 p-2 w-[100%]"
            as="h1"
            play={true}
            speed={2}
            scramble={10}
            step={1}
            stepInterval={1}
            seed={3}
            seedInterval={10}
            text={text}
          />
        </div>
        <p
          style={{ fontSize: fontResize }}
          className="mb-20 bg-black mt-10 xl:mt-20 preloader-two"
        >
          Illya
        </p>
      </div>
    </div>
  );
}
