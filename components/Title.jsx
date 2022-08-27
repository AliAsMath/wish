import React from "react";

const Title = ({ number, text }) => {
  return (
    <div className="flex text-5xl">
      <h2 className="mr-4 font-bold text-green-text">{number}.</h2>
      <h2 className="w-[498px] text-blue-text font-thin">{text}</h2>
    </div>
  );
};

export default Title;
