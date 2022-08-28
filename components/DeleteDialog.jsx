import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCountry, getAllCountries } from "../util/api";
import { changeDateFormat } from "../util/date";
import { alertActions } from "../redux/slice/alert";
import { useDispatch } from "react-redux";

export default function DeleteDialog({ id, name, setCountriesList }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandler = async () => {
    setIsLoading(true);
    try {
      await deleteCountry(id);
      const allCountries = (await getAllCountries()).data;
      allCountries.forEach((country) => {
        country.createdAt = changeDateFormat(country.createdAt);
      });
      setCountriesList(allCountries);
      handleClose();
      dispatch(
        alertActions.setAlert({
          message: `Country "${name}" deleted`,
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        alertActions.setAlert({
          message: err.response.data.message || err.message,
          type: "error",
        })
      );
    }
    setIsLoading(false);
  };

  return (
    <div>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <DeleteIcon className="!text-base" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do You Want to Delete This?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button onClick={deleteHandler} autoFocus>
            {isLoading ? <CircularProgress className="w-4 h-4" /> : "YES"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
