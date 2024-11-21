import React from "react";
import { Avatar, Stack, Typography, Paper } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../../lib/features";

const Profile = ({ user }) => {
  return (
    <Paper
      elevation={4}
      sx={{
        padding: "2rem",
        borderTopRightRadius: "3rem",
        borderTopLeftRadius: "3rem",

        background: "linear-gradient(135deg, #00afef, #007bbd)",
        color: "white",
        maxWidth: "400px",
        margin: "auto",
        textAlign: "center",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Avatar
        src={transformImage(user?.avatar?.url)}
        alt="User Avatar"
        sx={{
          width: 100,
          height: 100,
          margin: "auto",
          marginBottom: "1rem",
          border: "4px solid #ffffff",
        }}
      />
      <Typography
        variant="h5"
        fontWeight="bold"
        color="white"
        gutterBottom
        sx={{ textTransform: "uppercase" }}
      >
        {user?.name || "User Name"}
      </Typography>
      <Typography variant="body2" color="rgba(255, 255, 255, 0.8)" gutterBottom>
        {user?.bio || "No bio provided"}
      </Typography>

      <Stack
        spacing={2}
        sx={{
          marginTop: "2rem",
          padding: ".4rem",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "1rem",
        }}
      >
        <ProfileCard
          heading="Username"
          text={user?.username || "N/A"}
          Icon={<UserNameIcon sx={{ color: "white" }} />}
        />
        <ProfileCard
          heading="Name"
          text={user?.name || "N/A"}
          Icon={<FaceIcon sx={{ color: "white" }} />}
        />
        <ProfileCard
          heading="Joined"
          text={moment(user?.createdAt).fromNow() || "N/A"}
          Icon={<CalendarIcon sx={{ color: "white" }} />}
        />
      </Stack>
    </Paper>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction="row"
    alignItems="center"
    spacing={2}
    sx={{
      padding: "0.75rem 1rem",
      background: "rgba(0, 175, 239, 0.1)",
      borderRadius: "8px",
      textAlign: "left",
      color: "white",
    }}
  >
    <div>{Icon}</div>
    <Stack>
      <Typography variant="body1" fontWeight="bold">
        {text}
      </Typography>
      <Typography variant="caption" color="rgba(255, 255, 255, 0.7)">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
