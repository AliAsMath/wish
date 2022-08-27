import { Slider } from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ComboBox from "./ComboBox";
import NavigationButton from "../NavigationButton";
import Title from "../Title";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { basicInformationValidation } from "../../util/validation";
import { basicInformationActions } from "../../redux/slice/basic-information";
import { educationList } from "../../util/dummy-data";

const BasicInformation = ({ nextSlide, countries }) => {
  const basicInformationState = useSelector((state) => state.basicInformation);
  const dispatch = useDispatch();

  const setCountry = (country) =>
    dispatch(basicInformationActions.setCountry(country));
  const setEducation = (education) =>
    dispatch(basicInformationActions.setEducation(education));
  const setExperience = (experience) =>
    dispatch(basicInformationActions.setExperience(experience));

  const [error, setError] = useState({});

  const nextHandler = () => {
    const result = basicInformationValidation(basicInformationState);
    if (result.error) {
      setError({
        key: result.error.details[0].context.key,
        message: result.error.details[0].message,
      });
      return;
    }
    setError({});
    nextSlide();
  };

  return (
    <div className="flex flex-col items-center w-full h-full shrink-0 gap-11">
      <div className="mt-14">
        <Title number="1" text="We require some basic information" />
      </div>
      <form className="flex flex-col gap-9">
        <ComboBox
          isError={error.key === "country"}
          errorMessage={error.message}
          options={countries}
          label="Country"
          value={basicInformationState.country?.name || null}
          setValue={(value) =>
            setCountry(value && { name: value.label, id: value.id })
          }
        />
        <ComboBox
          isError={error.key === "education"}
          errorMessage={error.message}
          options={educationList}
          label="Education"
          value={basicInformationState.education}
          setValue={(value) => setEducation(value && value.label)}
        />
        {/* <TextField label="Experience Year" placeholder="12-year" /> */}
        <div>
          <h3>Experience Year</h3>
          <Slider
            max={30}
            value={basicInformationState.experience}
            aria-label="Default"
            valueLabelDisplay="auto"
            onChange={(e) => setExperience(parseInt(e.target.value))}
          />
        </div>
      </form>
      <div className="flex w-full h-[100px] mt-auto items-center px-16 justify-end">
        <NavigationButton
          onClick={nextHandler}
          Icon={<EastRoundedIcon sx={{ margin: 0, fontSize: "20px" }} />}
        />
      </div>
    </div>
  );
};

export default BasicInformation;
