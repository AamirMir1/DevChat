import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";

const GradientBackground = styled(Box)({
  // background: "linear-gradient(to right, #4e54c8, #8f94fb)", // Modern gradient background
  height: "200px",
  marginTop: "30px",
  display: "flex",
  // alignItems: "center",
  justifyContent: "center",
});

const ContentBox = styled(Paper)({
  padding: "2rem",
  textAlign: "center",
  maxWidth: "400px",
  borderRadius: "16px",
  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)", // Modern shadow effect
  background: "rgba(255, 255, 255, 0.8)", // Subtle transparency
});

const Home = () => {
  return (
    <GradientBackground>
      <ContentBox elevation={3}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome!
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Select a chat to get started.
        </Typography>
      </ContentBox>
    </GradientBackground>
  );
};

export default AppLayout()(Home);
