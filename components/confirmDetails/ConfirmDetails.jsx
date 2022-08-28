import React, { useState } from "react";
import Title from "./../Title";
import { Button, CircularProgress, TextField } from "@mui/material";
import PositionDetailsBox from "./PositionDetailsBox";
import { useDispatch, useSelector } from "react-redux";
import { personalActions } from "../../redux/slice/personal";
import { PersonalDataValidation } from "../../util/validation";
import { createUser } from "../../util/api";
import { alertActions } from "../../redux/slice/alert";

const ConfirmDetails = ({ nextSlide, prevSlide }) => {
  const personalState = useSelector((state) => state.personal);
  const basicInformationState = useSelector((state) => state.basicInformation);
  const positionState = useSelector((state) => state.position);
  const dispatch = useDispatch();

  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const confirmHandler = async () => {
    const result = PersonalDataValidation(personalState);
    if (result.error) {
      setError({
        key: result.error.details[0].context.key,
        message: result.error.details[0].message,
      });
      return;
    }

    setIsLoading(true);
    try {
      setError({});
      await createUser({
        ...basicInformationState,
        country: basicInformationState.country?.id,
        ...personalState,
        position: positionState.company,
      });
      nextSlide();
      dispatch(
        alertActions.setAlert({
          message: `User "${personalState.fullName}" added`,
          type: "success",
        })
      );
    } catch (err) {
      dispatch(
        alertActions.setAlert({
          message: err.response?.data?.message || err.message,
          type: "error",
        })
      );
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center w-full h-full shrink-0 gap-11">
      <div className="self-start mt-8 ml-28">
        <Title number="3" text="Confirm Details" />
      </div>
      <form className="flex flex-col gap-9">
        <TextField
          value={personalState.fullName}
          onChange={(e) =>
            dispatch(personalActions.setFullName(e.target.value))
          }
          error={error.key === "fullName"}
          helperText={error.key === "fullName" && error.message}
          className="w-[540px] h-[55px]"
          label="Full Name"
          placeholder="Ali Ashiri"
        />
        <TextField
          value={personalState.phoneNumber}
          onChange={(e) => {
            dispatch(personalActions.setPhoneNumber(e.target.value));
          }}
          error={error.key === "phoneNumber"}
          helperText={error.key === "phoneNumber" && error.message}
          className="w-[540px] h-[55px]"
          label="Phone Number"
          placeholder="0989373846277"
        />
      </form>
      <PositionDetailsBox />
      <div className="flex justify-end gap-10 px-16 w-full h-[100px]  items-center -mt-7">
        <Button
          onClick={prevSlide}
          className={
            "bg-gray-bg disabled:bg-opacity-30 text-blue-text hover:bg-gray-bg hover:bg-opacity-60 w-60 "
          }
        >
          Back
        </Button>
        <Button
          onClick={confirmHandler}
          className={
            "bg-green-bg disabled:bg-opacity-30 text-blue-text hover:bg-green-bg hover:bg-opacity-60 w-60 "
          }
        >
          {isLoading ? <CircularProgress className="w-6 h-6" /> : "Confirm"}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmDetails;
