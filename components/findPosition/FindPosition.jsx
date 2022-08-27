import React, { useEffect, useState } from "react";
import Title from "../Title";
import NavigationButton from "../NavigationButton";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import { Button } from "@mui/material";
import PositionItem from "./PositionItem";
import { useSelector } from "react-redux";
import { scoreCalculation } from "../../util/score-calculation";

const FindPosition = ({ prevSlide, nextSlide }) => {
  const positionState = useSelector((state) => state.position);
  const basicInformationState = useSelector((state) => state.basicInformation);
  const [positionList, setPositionList] = useState([]);

  useEffect(() => {
    setPositionList(
      scoreCalculation({
        education: basicInformationState.education,
        experience: basicInformationState.experience,
      })
    );
  }, [basicInformationState]);

  const joinHandler = () => {
    nextSlide();
  };
  return (
    <div className="flex flex-col items-center w-full h-full shrink-0 gap-11">
      <div className="self-start ml-28 mt-14">
        <Title number="2" text="Find The Best Match Position" />
      </div>
      <fieldset
        // onChange={(e) => dispatch(positionActions.setPosition(e.target.value))}
        className="flex flex-wrap gap-3"
        id="group1"
      >
        {positionList.map((item) => (
          <PositionItem
            key={item.id}
            {...item}
            name="group1"
            isChecked={item.id === positionState.id}
          />
        ))}
      </fieldset>
      <div className="flex justify-between px-16 w-full h-[100px] mt-auto items-center">
        <NavigationButton
          onClick={prevSlide}
          Icon={<WestRoundedIcon sx={{ margin: 0, fontSize: "20px" }} />}
        />
        <Button
          disabled={Object.keys(positionState).length === 0}
          onClick={joinHandler}
          className={
            "bg-green-bg disabled:bg-opacity-30 text-blue-text hover:bg-green-bg hover:bg-opacity-60 px-14"
          }
        >
          JOIN
        </Button>
      </div>
    </div>
  );
};

export default FindPosition;
