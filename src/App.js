import { useState, useEffect } from "react";

//pseudo backend
import { Projects } from "./assets/Projects";

//components
import Header from "./components/Header";
import Contacts from "./components/Contacts";
import Project from "./components/Project";
import About from "./components/About";
import Preloader from "./components/Preloader";

//external packages
import { TextScramble } from "@a7sc11u/scramble";

function App() {
  const [loading, setLoading] = useState(false);
  const [preloader, setPreloader] = useState(true);

  useEffect(() => {
    //scroll fixing
    !loading
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "scroll");
  }, [loading]);

  useEffect(() => {
    const onPageLoad = () => {
      setLoading(true);
    };

    const deletePreloader = () => {
      setPreloader(false);
    };

    // Check if the page has already loaded
    if (document.readyState === "complete") {
      setTimeout(() => {
        onPageLoad();
      }, 2000);
      setTimeout(() => {
        deletePreloader();
      }, 3200);
    } else {
      window.addEventListener("load", onPageLoad);

      // Remove the event listener when component unmounts
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, [preloader]);

  return (
    <>
      {preloader && <Preloader loading={loading} />}
      <Header preloader={preloader} />
      <About preloader={preloader} />
      <TextScramble
        id="bio"
        className="text-5xl sm:text-8xl mt-20 text-white bg-black w-fit"
        as="h1"
        play={true}
        speed={0.2}
        scramble={8}
        step={1}
        stepInterval={1}
        seed={3}
        seedInterval={10}
        text="Biography %#"
      />
      <div className="mx-8 text-justify text-2xl leading-1 mt-8 max-w-[1000px]">
        <TextScramble
          as="p"
          play={true}
          speed={0.2}
          scramble={8}
          step={1}
          stepInterval={1}
          seed={3}
          seedInterval={10}
          text="Frontend developer from Ukraine"
        />
        <br />
        <TextScramble
          as="p"
          play={true}
          speed={20}
          scramble={8}
          step={1}
          stepInterval={1}
          seed={3}
          seedInterval={10}
          text="Was studying in Donetsk medical university, but in 2014 when war began I
          was forced to look for other way to realize myself. <br />
          From 2018 worked as designer. <br />
          From 2020 completely switched to the web combining web design and
          frontend"
        />
        <div>
          <span className="text-white mr-2 bg-green-500 px-1">_</span>
          <span className="text-white mr-2 bg-green-500 px-1">_</span>
          <span className="text-white mr-2 bg-green-500 px-1">_</span>
          <span className="text-white mr-2 bg-green-500 px-1">_</span>
          <span className="text-white mr-2 bg-green-500 px-1">_</span>
          <span className="text-white mr-2 bg-green-500 px-1">_</span>
          <span className="text-white bg-green-500 px-1">_</span>
        </div>
        <TextScramble
          as="p"
          play={true}
          speed={0.8}
          scramble={8}
          step={1}
          stepInterval={1}
          seed={3}
          seedInterval={10}
          className="mt-1"
          text="My core stack is Typesctipt, React, Node, Flutter, Tailwind"
        />
      </div>
      <h1
        id="projects"
        className="text-6xl sm:text-8xl mt-20 text-white bg-black w-fit"
      >
        Projects %##
      </h1>
      {Projects.map((project, idx) => {
        return <Project project={project} idx={idx} key={idx} />;
      })}
      <h1
        id="contacts"
        className="text-6xl sm:text-8xl mt-20 text-white bg-black w-fit"
      >
        contacts %###
      </h1>
      <Contacts />
    </>
  );
}

export default App;
