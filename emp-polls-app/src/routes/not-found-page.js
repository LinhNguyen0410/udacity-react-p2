import React from "react";
import { Box, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";

const primary = purple[500];

export default function NotFound() {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: primary,
      }}>
      <Typography variant="h1">404 Not Found</Typography>
    </Box>
  );
}
