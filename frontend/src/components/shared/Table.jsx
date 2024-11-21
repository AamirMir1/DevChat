import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Paper, Typography } from "@mui/material";
import { matBlack } from "../../constants/color";

const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // background: "linear-gradient(135deg, #6e7dff, #3c5b9e)", // Gradient background for contrast
        padding: "2rem",
      }}
    >
      <Paper
        elevation={20} // Stronger shadow for a floating card look
        sx={{
          padding: "2rem",
          borderRadius: "1.5rem",
          width: "100%",
          // maxWidth: "1200px",
          height: "80%",
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.15)", // Deeper shadow for modern depth
          backgroundColor: "#fff",
        }}
      >
        <Typography
          textAlign={"center"}
          variant="h4"
          sx={{
            marginBottom: "2rem",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "#333",
            letterSpacing: "1.5px",
            fontSize: "1.8rem",
            textShadow: "1px 1px 5px rgba(0,0,0,0.3)", // Subtle text shadow for impact
          }}
        >
          {heading}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          style={{
            height: "100%",
            fontFamily: '"Poppins", sans-serif', // Custom font for a modern vibe
            fontSize: "1rem",
          }}
          sx={{
            border: "none",
            ".MuiDataGrid-columnHeaders": {
              backgroundColor: "#34495e", // Dark header for contrast
              color: "#fff",
              fontWeight: 600,
              fontSize: "1.1rem",
              borderBottom: "3px solid #2c3e50", // Stronger border for header
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            },
            ".MuiDataGrid-row": {
              transition: "background-color 0.2s ease-in-out", // Smooth row hover effect
              "&:hover": {
                backgroundColor: "#ecf0f1", // Light grey hover effect
                transform: "scale(1.02)", // Slight zoom effect on hover for interactivity
              },
            },
            ".MuiDataGrid-cell": {
              padding: "15px 18px",
              fontSize: "0.95rem",
              borderBottom: "1px solid #ecf0f1", // Subtle borders between rows
            },
            ".MuiDataGrid-footerContainer": {
              backgroundColor: "#ecf0f1", // Light footer for contrast
              borderTop: "1px solid #ddd", // Border separating footer
            },
            ".MuiDataGrid-toolbarContainer": {
              backgroundColor: "#ecf0f1",
            },
            ".MuiCheckbox-root": {
              color: "#34495e !important", // Custom checkbox color
            },
          }}
        />
      </Paper>
    </Container>
  );
};

export default Table;
