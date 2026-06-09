import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Software Engineering Graduate",
          "Software Engineer",
          "Full Stack Engineer",
          "Cloud & DevOps Builder",
          "Embedded Systems Programmer",
          "Indie Game Developer"
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
