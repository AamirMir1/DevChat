import { Grid, Skeleton, Stack, Box } from "@mui/material";
import React from "react";
import { BouncingSkeleton } from "../styles/StyledComponents";

const LayoutLoader = () => {
  return (
    <Grid
      container
      sx={{
        height: "calc(100vh - 4rem)",
        background: "linear-gradient(to bottom, #f0f4f8, #ffffff)", // Soft gradient background
        padding: "1rem",
        gap: "1rem",
      }}
    >
      {/* Left Sidebar */}
      <Grid
        item
        sm={4}
        md={3}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        height="100%"
      >
        <Stack spacing={2}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              height="4rem"
              sx={{
                borderRadius: "12px",
                animation: "wave",
                background: "linear-gradient(to right, #e0e0e0, #f7f7f7)",
              }}
            />
          ))}
        </Stack>
      </Grid>

      {/* Main Content */}
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        lg={6}
        sx={{
          height: "100%",
        }}
      >
        <Stack spacing={3}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              height="5rem"
              sx={{
                borderRadius: "16px",
                animation: "wave",
                background: "linear-gradient(to right, #e0e0e0, #f7f7f7)",
              }}
            />
          ))}
        </Stack>
      </Grid>

      {/* Right Sidebar */}
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: { xs: "none", md: "block" },
        }}
        height="100%"
      >
        <Stack spacing={2}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              height="4rem"
              sx={{
                borderRadius: "12px",
                animation: "wave",
                background: "linear-gradient(to right, #e0e0e0, #f7f7f7)",
              }}
            />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

const TypingLoader = () => {
  return (
    <Stack
      spacing={"0.5rem"}
      direction={"row"}
      padding={"0.5rem"}
      justifyContent={"center"}
    >
      <BouncingSkeleton
        variant="rounded"
        width={15}
        height={15}
        style={{
          animationDelay: "0.1s",
          backgroundColor: "#00afef",
        }}
      />
      <BouncingSkeleton
        variant="rounded"
        width={15}
        height={15}
        style={{
          animationDelay: "0.2s",
          backgroundColor: "#00afef",
        }}
      />
      <BouncingSkeleton
        variant="rounded"
        width={15}
        height={15}
        style={{
          animationDelay: "0.4s",
          backgroundColor: "#00afef",
        }}
      />
      <BouncingSkeleton
        variant="rounded"
        width={15}
        height={15}
        style={{
          animationDelay: "0.6s",
          backgroundColor: "#00afef",
        }}
      />
    </Stack>
  );
};

export { TypingLoader, LayoutLoader };
