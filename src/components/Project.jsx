import { useState } from "react";

export default function Project({ project, idx }) {
  const [modal, setModal] = useState(false);
  const { name, link, github, description, stack, img } = project;

  return (
    <div key={idx}>
      <div className="flex items-end flex-wrap justify-between mx-8">
        <div className="mt-8">
          <p>
            {"[> 0"}
            {idx + 1}
            {'"'}
          </p>
          <p className="ml-4">
            {" "}
            {"##"} {name} {"##"}
          </p>
          <button
            onClick={() => setModal(!modal)}
            className={`ml-8 blink px-2 + ${modal ? "active" : ""}`}
          >
            {">"} {!modal ? "Look more" : "close"}
          </button>
        </div>
        <div className="hidden sm:flex flex-col">
          {link && (
            <a className="blink" href={link} target="_blank" rel="noreferrer">
              /visit website
            </a>
          )}

          <a className="blink" href={github} target="_blank" rel="noreferrer">
            /visit github
          </a>
        </div>
      </div>
      <div
        style={{ display: !modal ? "none" : "flex" }}
        className="m-10 flex flex-wrap justify-between items-center"
      >
        <div>
          <h3 className="text-2xl mb-4">{name}</h3>
          <p>{description}</p>
          <p>_______________________</p>
          <p>This project was made with next stack: {stack}</p>
        </div>
        <div>
          <a href={link} target="_blank" rel="noreferrer">
            <img
              draggable="false"
              src={img}
              alt={name}
              className="w-[500px] mt-8 sm:mt-0"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
