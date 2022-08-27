import React from "react";
import { Card, CardActionArea } from "@mui/material";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { positionActions } from "../../redux/slice/position";

const PositionItem = ({ id, name, company, level, possibility, isChecked }) => {
  const dispatch = useDispatch();

  const selectPositionHandler = () =>
    dispatch(
      positionActions.setPosition({
        id,
        company,
        level,
        possibility,
      })
    );

  return (
    <Card className="!p-0 rounded-xl" onClick={selectPositionHandler}>
      <CardActionArea>
        <label
          className="flex justify-between  w-[270px] h-[120px] p-3 border-2 cursor-pointer rounded-xl border-gray-bg"
          htmlFor={id}
        >
          <Image
            className="object-contain"
            src="/png/building.png"
            alt="position item"
            width={80}
            height={50}
          />
          <div className="flex flex-col items-start justify-between text-sm font-bold ">
            <h3 className="text-gray-text ">{company}</h3>
            <h4 className="text-green-text">{level}</h4>
            <h4 className="text-orange-text">Posibility {possibility} %</h4>
          </div>
          <input
            className="hidden peer"
            type="radio"
            id={id}
            name={name}
            value={id}
            defaultChecked={isChecked}
          />
          <span className="w-4 h-4 transition-all border-2 border-gray-bg rounded-full peer-checked:border-[5px] peer-checked:border-orange-text"></span>
        </label>
      </CardActionArea>
    </Card>
  );
};

export default PositionItem;
