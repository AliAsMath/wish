import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

const PositionDetailsBox = () => {
  const basicInformationState = useSelector((state) => state.basicInformation);
  const positionState = useSelector((state) => state.position);

  return (
    <div className="flex w-[540px] flex-col text-gray-text  rounded border border-black">
      <div className="grid grid-cols-[repeat(3,minmax(max-content,1fr))] grid-rows-2 ">
        <span className="flex items-center px-5 py-2 font-bold bg-light-gray-bg">
          Country
        </span>
        <span className="flex items-center px-5 py-2 font-bold bg-light-gray-bg">
          Education
        </span>
        <span className="flex items-center px-5 py-2 font-bold bg-light-gray-bg">
          Experience Year
        </span>
        <span className="flex items-center px-6 py-1">
          {basicInformationState?.country?.name}
        </span>
        <span className="flex items-center px-6 py-1">
          {basicInformationState?.education}
        </span>
        <span className="flex items-center px-6 py-1">
          {basicInformationState?.experience}
        </span>
      </div>
      <div className="px-6 py-2 border-t ">
        <div className="mb-3 font-bold">Position</div>
        <div className="flex gap-3">
          <Image
            className="object-contain"
            src="/png/building.png"
            alt="position item"
            width={53}
            height={60}
          />
          <div className="flex flex-col leading-[1.25]">
            <span>{positionState.company}</span>
            <span>{positionState.level}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionDetailsBox;
