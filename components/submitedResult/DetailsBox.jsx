import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

const DetailsBox = () => {
  const basicInformationState = useSelector((state) => state.basicInformation);
  const positionState = useSelector((state) => state.position);
  const personalState = useSelector((state) => state.personal);

  return (
    <div className="flex w-[540px] flex-col text-gray-text  rounded border border-black">
      <div className="grid items-center grid-cols-3 grid-rows-2 ">
        <span className="px-5 py-2 font-bold bg-light-gray-bg">Full Name</span>
        <span className="col-start-2 col-end-4 px-5 py-2 font-bold bg-light-gray-bg">
          Phone Number
        </span>

        <span className="px-6 py-1">{personalState?.fullName}</span>
        <span className="px-6 py-1">{personalState?.phoneNumber}</span>
      </div>
      <div className="grid items-center grid-cols-3 grid-rows-2 ">
        <span className="px-5 py-2 font-bold bg-light-gray-bg">Country</span>
        <span className="px-5 py-2 font-bold bg-light-gray-bg">Education</span>
        <span className="px-5 py-2 font-bold bg-light-gray-bg">
          Experience Year
        </span>
        <span className="px-6 py-1">
          {basicInformationState?.country?.name}
        </span>
        <span className="px-6 py-1">{basicInformationState?.education}</span>
        <span className="px-6 py-1">{basicInformationState?.experience}</span>
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

export default DetailsBox;
