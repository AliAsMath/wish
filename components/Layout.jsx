import React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { Alert, Snackbar, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { alertActions } from "../redux/slice/alert";

const Layout = ({ children }) => {
  const alertState = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const closeHandler = (event, reason) => {
    if (reason === "clickaway") return;

    dispatch(alertActions.closeAlert());
  };

  return (
    <>
      <Head>
        <title>Wish Work</title>
      </Head>
      <div className="w-screen h-screen font-jost">
        <nav className="flex items-center h-20 bg-gray-bg px-11">
          <div className="ml-20">
            <Image
              src="/svg/wish-logo.svg"
              alt="logo"
              width={150}
              height={48}
            />
          </div>
          <div className="flex gap-20 ml-auto text-4xl font-light text-blue-text">
            <Link href="/">Find A Position</Link>
            <Link href="/user">User List</Link>
            <Link href="/country">Country List</Link>
          </div>
        </nav>
        <main className=" w-screen h-[calc(100%-80px)]">{children}</main>
      </div>
      <Snackbar
        open={alertState?.isEnable}
        autoHideDuration={6000}
        onClose={closeHandler}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => dispatch(alertActions.closeAlert())}
          severity={alertState?.type}
        >
          {alertState?.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Layout;
