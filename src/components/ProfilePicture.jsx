// import React, { useState, useEffect, useRef, useContext } from 'react';
import React, { useState, useEffect, useRef } from "react";

import { useInView } from "react-intersection-observer";
import { Ascii, initialAscii } from "../components/Ascii";

import video from "../assets/video.mp4";
// import { LayoutContext } from './layout';

// import './profile-picture.scss';

const ProfilePicture = () => {
  // const layoutContext = useContext( LayoutContext );

  const [animationEnded, setAnimationEnded] = useState(true);
  //   const [scrolling, setScrolling] = useState(true);

  const [asciiString, setAsciiString] = useState(initialAscii);
  const [isLowPower, setIsLowPower] = useState(false);

  const canvasRef = useRef();
  const videoRef = useRef();
  const canvasContextRef = useRef();
  const animationFrameRef = useRef();

  const ascii = Ascii();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    canvasContextRef.current = canvasRef.current.getContext("2d");

    videoRef.current
      .play()
      .then(() => {
        // videoRef.current.pause();
      })
      .catch(() => {
        setIsLowPower(true);
      });
  }, []);

  useEffect(() => {
      videoRef.current.play();
      animationFrameRef.current = requestAnimationFrame(stepAscii);


    // if ( animationEnded && !isLowPower ) {

    // if ( inView && !scrolling ) {
    // videoRef.current.play();
    // animationFrameRef.current = requestAnimationFrame(stepAscii);
    //     } else {
    //         videoRef.current.pause();
    //         cancelAnimationFrame( animationFrameRef.current );
    //     }

    // }
  }, []);

  const stepAscii = () => {
    // if ( !isLowPower ) {
    canvasContextRef.current.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight
    );

    ascii.fromCanvas(canvasRef.current, {
      columns: 60,
      rows: 40,
      characters: "x/c=⮐+,. ",
      callback: (string) => {
        setAsciiString(string);
      },
    });

    animationFrameRef.current = requestAnimationFrame(stepAscii);
    // }
  };

  return (
    <section ref={ref}>
        <p
          className="text-xs"
          dangerouslySetInnerHTML={{ __html: asciiString }}
        ></p>
      <video
        className="invisible absolute top-0 left-0"
        ref={videoRef}
        src={video}
        width="320"
        height="190"
        muted
        playsInline
        loop
      />
      <canvas
        className="invisible absolute top-0 left-0"
        ref={canvasRef}
        width="320"
        height="190"
      ></canvas>
    </section>
  );
};

export default ProfilePicture;
