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
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { getAllUsers } from "../util/api";
import { changeDateFormat } from "../util/date";

const User = ({ usersList }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState(usersList);

  useEffect(() => {
    const getUsersList = async () => {
      const result = await getAllUsers();
      const usersList = result.data;
      usersList.forEach((user) => {
        user.createdAt = changeDateFormat(user.createdAt);
      });

      setUsers(usersList);
    };
    getUsersList();
  }, []);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col w-8/12 p-7 gap-7">
        <h2 className="self-start text-4xl font-bold text-gray-text">
          List of Users
        </h2>
        <TableContainer className="" component={Paper}>
          <Table aria-label="customized table">
            <TableHead className="bg-green-text text-blue-text">
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Submitted Date</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Position</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? users.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : users
              ).map((row) => (
                <TableRow
                  className="[&>*]:py-1 odd:bg-white even:bg-light-gray-bg"
                  key={row._id}
                >
                  <TableCell>{row._id}</TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>{row.fullName}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{row.position}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={users.length}
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
  let usersList = [];
  try {
    const result = await getAllUsers();
    usersList = result.data;
    usersList.forEach((user) => {
      user.createdAt = changeDateFormat(user.createdAt);
    });
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      usersList,
    },
    revalidate: 10,
  };
}

export default User;
