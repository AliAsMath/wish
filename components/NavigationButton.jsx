import { Button } from "@mui/material";
import React from "react";
import EastRoundedIcon from "@mui/icons-material/EastRounded";

const NavigationButton = ({ Icon, className, onClick }) => {
  return (
    <Button
      onClick={onClick}
      // disabled
      className={
        "bg-light-gray-bg text-blue-text border border-solid border-gray-bg hover:bg-light-gray-bg hover:bg-opacity-60 disabled:bg-white " +
        className
      }
      sx={{
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        padding: 0,
        minWidth: 0,
      }}
    >
      {Icon}
    </Button>
  );
};

export default NavigationButton;
