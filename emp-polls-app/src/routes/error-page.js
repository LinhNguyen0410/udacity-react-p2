import React from "react";
import { Box, CssBaseline, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const routeError = useRouteError();
  console.error(routeError);

  const primaryColor = purple[500]; // #f44336

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: primaryColor,
        }}>
        <Typography variant="h6" style={{ color: "white" }}>
          Sorry, an unexpected error has occurred.
        </Typography>
        <Typography variant="h6" style={{ color: "white" }}>
          {routeError.statusText || routeError.message}
        </Typography>
      </Box>
    </>
  );
};

export default ErrorPage;
