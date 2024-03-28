import React from "react";
import { Box, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";

const primary = purple[500]; // #f44336

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#ccc",
      }}>
      <Typography variant="h1" style={{ color: "white" }}>
        404 Not Found
      </Typography>
    </Box>
  );
}
