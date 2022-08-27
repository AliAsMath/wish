import React from "react";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

const ComboBox = ({
  options,
  value,
  setValue,
  label,
  isError,
  errorMessage,
}) => {
  return (
    <Autocomplete
      value={value}
      isOptionEqualToValue={(option, value) => option.label === value}
      options={options ? options : []}
      sx={{
        height: 55,
        width: 540,
        "& .MuiIconButton-root": {
          color: "#60C4B2",
          transition: "all 0.2s",
        },
      }}
      renderInput={(params) => (
        <TextField
          error={isError}
          helperText={isError && errorMessage}
          {...params}
          label={label}
        />
      )}
      popupIcon={<ExpandMoreRoundedIcon />}
      onChange={(e, newValue) => {
        setValue(newValue);
      }}
    />
  );
};

export default ComboBox;
