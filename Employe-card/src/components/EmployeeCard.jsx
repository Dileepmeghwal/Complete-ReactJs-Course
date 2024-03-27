import React from "react";

const skills = [
  "HTML",
  "CSS",
  "Javascript",
  "React Js",
  "Next Js",
  "Figma Desgins",
];

const Utils = {
  avatar:
    "https://plus.unsplash.com/premium_photo-1708275671991-6b8514fc53ee?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};
const EmployeeCard = () => {
  return (
    <div className="bg-white w-96 mx-auto aspect-video  rounded-lg px-6 py-8  shadow-xl">
      <Avatar />
      <div className="data">
        <Intro />
      </div>
      <div className="skills">
        {skills.map((skill, index) => (
          <SkillList data={skill} key={index} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeCard;

const Avatar = () => {
  return (
    <>
      <div className="avatar">
        <img src={Utils.avatar} alt={Utils.avatar} className=" rounded-xl" />
      </div>
    </>
  );
};

const SkillList = ({ data, key }) => {
  return (
    <>
      <span
        key={key}
        className=" inline-block px-2 bg-slate-700 rounded-full py-1/2 text-cyan-50"
      >
        {data}
      </span>
    </>
  );
};

const Intro = () => {
  return (
    <div className=" text-left py-3">
      <h1 className="font">Jonas Scehmdetmann</h1>
      <p>
        Full-stack web developer, Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Architecto, accusantium.
      </p>
    </div>
  );
};
