import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TablePaginationActions,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteDialog from "../components/DeleteDialog";
import { addCountryValidation } from "../util/validation";
import { createCountry, getAllCountries } from "./../util/api";
import { changeDateFormat } from "./../util/date";
import { useDispatch } from "react-redux";
import { alertActions } from "../redux/slice/alert";

const Country = ({ countriesList }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState(countriesList);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - countries.length) : 0;

  useEffect(() => {
    const getCountriesList = async () => {
      const result = await getAllCountries();
      const countriesList = result.data;
      countriesList.forEach((country) => {
        country.createdAt = changeDateFormat(country.createdAt);
      });

      setCountries(countriesList);
    };
    getCountriesList();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const addCountryHandler = async () => {
    setIsLoading(true);
    const result = addCountryValidation({ country });
    if (result.error) {
      setError({
        key: result.error.details[0].context.key,
        message: result.error.details[0].message,
      });
      return;
    }
    setError({});

    try {
      await createCountry({ name: country });
      const allCountries = (await getAllCountries()).data;
      allCountries.forEach((country) => {
        country.createdAt = changeDateFormat(country.createdAt);
      });
      setCountries(allCountries);
      dispatch(
        alertActions.setAlert({
          message: `Country "${country}" added`,
          type: "success",
        })
      );
    } catch (err) {
      dispatch(alertActions.setAlert({ message: err.message, type: "error" }));
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col w-8/12 gap-3 p-7">
        <h2 className="self-start text-4xl font-bold text-gray-text">
          Add a New Country
        </h2>
        <div>
          <TextField
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            error={error.key === "country"}
            helperText={error.key === "country" && error.message}
            className="w-[540px] h-16"
            size="small"
            label="Country Name"
            placeholder="Iran"
          />
          <Button
            onClick={addCountryHandler}
            className={
              "bg-green-bg h-10 disabled:bg-opacity-30 text-blue-text hover:bg-green-bg hover:bg-opacity-60 w-60 "
            }
          >
            {isLoading ? <CircularProgress className="w-6 h-6" /> : "Add"}
          </Button>
        </div>
        <h2 className="self-start text-4xl font-bold text-gray-text">
          List of Country
        </h2>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead className="bg-green-text text-blue-text">
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Submitted date</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? countries.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : countries
              ).map((country) => (
                <TableRow
                  className="[&>*]:py-1 h-[41px] odd:bg-white even:bg-light-gray-bg"
                  key={country._id}
                >
                  <TableCell>{country._id}</TableCell>
                  <TableCell align="left">{country.createdAt}</TableCell>
                  <TableCell align="left">{country.name}</TableCell>
                  <TableCell align="left">
                    <DeleteDialog
                      id={country._id}
                      setCountriesList={setCountries}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 41 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={countries.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export async function getStaticProps(context) {
  let countriesList = [];
  try {
    const result = await getAllCountries();
    countriesList = result.data;
    countriesList.forEach((country) => {
      country.createdAt = changeDateFormat(country.createdAt);
    });
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      countriesList,
    },
    revalidate: 60,
  };
}

export default Country;
