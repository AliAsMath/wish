import React from "react";
import Title from "./../Title";
import { Button } from "@mui/material";
import DetailsBox from "./DetailsBox";

const SubmitedResult = ({ setTranslate }) => {
  return (
    <div className="flex flex-col items-center w-full h-full shrink-0 gap-11">
      <div className="self-start mt-8 ml-28">
        <Title number="3" text="Confirm Details" />
      </div>

      <DetailsBox />
      <div className="flex justify-end gap-10 px-16 w-full h-[100px]  items-center mt-auto">
        <Button
          onClick={() => location.reload()}
          className={
            "bg-green-bg disabled:bg-opacity-30 text-blue-text hover:bg-green-bg hover:bg-opacity-60 w-60 "
          }
        >
          Home
        </Button>
      </div>
    </div>
  );
};

export default SubmitedResult;
