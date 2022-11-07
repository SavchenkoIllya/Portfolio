//external packages
import { TextScramble } from "@a7sc11u/scramble";
import { useState } from "react";
import ProfilePicture from "./ProfilePicture";

//components
import Test from "./Test";

export default function About({ preloader }) {
  const [animation, setAnimation] = useState(false);
  const play = !preloader && true

  setTimeout(() => {
    setAnimation(true);
  }, 2000);

  return (
    <div className="flex flex-wrap mt-20 flex-row-reverse items-center bg-white pl-0 sm:pl-10 text-black">
      <div className="mx-auto">
        {/* <Test /> */}
        <ProfilePicture/>
      </div>
      <div className="flex flex-col mb-10">
        <TextScramble
          as="h3"
          className="text-justify mt-20 min-[1156px]:mt-0 text-2xl  leading-none mx-8"
          play={play}
          speed={0.4}
          scramble={8}
          step={1}
          stepInterval={1}
          seed={3}
          seedInterval={10}
          text="/ ... Data is loaded!"
        />
        <TextScramble
          as="h3"
          className="text-justify text-2xl mt-20 sm:ml-20 leading-none mx-8"
          play={play}
          speed={0.4}
          scramble={8}
          step={1}
          stepInterval={1}
          seed={3}
          seedInterval={10}
          text="/ Hello That's Savchenko Illya's portfolio <br/>"
        />
        <div className="flex mt-20 items-center">
          <TextScramble
            as="h3"
            className="text-justify text-2xl sm:ml-40 leading-none mx-8"
            play={play}
            speed={0.4}
            scramble={8}
            step={1}
            stepInterval={1}
            seed={3}
            seedInterval={10}
            text="Get latest info"
          />
          <span
            className={
              "text-white bg-green-500 px-2 text-4xl reveal " +
              (animation && "special-blink")
            }
          >
            →
          </span>
        </div>
      </div>
    </div>
  );
}
