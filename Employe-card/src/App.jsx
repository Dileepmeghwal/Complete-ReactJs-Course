import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import EmployeeCard from "./components/EmployeeCard";

const person = {
  name: "Jonas Schemdanna",
  intro:
    "Full-stack web developer, Lorem ipsum dolor sit amet, consectetur  adipisicing elit. Architecto, accusantiuconsectetur  adipisicing elit. Architecto, accusantium.",
  avatar:
    "https://plus.unsplash.com/premium_photo-1708275671991-6b8514fc53ee?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  skills: [
    "HTML",
    "CSS",
    "Javascript",
    "React Js",
    "Next Js",
    "UI/UX Design",
    "React Js",
    "Next Js",
    "UI/UX Design",
  ],
};

function App() {
  return (
    <>
      <div className="container mx-auto">
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
          <Thubnail imgUrl={person.avatar} />
          <Content name={person.name} intro={person.intro} />
          <div class="px-6 pt-4 pb-2">
            {person.skills &&
              person.skills.map((skill, index) => (
                <Skills skills={skill} key={index} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

const Thubnail = ({ imgUrl }) => {
  return (
    <img
      class="w-full h-80 object-cover"
      src={imgUrl}
      alt="Sunset in the mountains "
    />
  );
};

const Content = ({ name, intro }) => {
  return (
    <>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{name}</div>
        <p class="text-gray-700 text-base">{intro}</p>
      </div>
    </>
  );
};

const Skills = ({ skills }) => {
  return (
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
      #{skills}
    </span>
  );
};
