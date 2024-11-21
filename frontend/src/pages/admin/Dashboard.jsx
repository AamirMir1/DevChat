import { useFetchData } from "6pp";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";
import {
  CurveButton,
  SearchField,
} from "../../components/styles/StyledComponents";
import { matBlack } from "../../constants/color";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";

const Dashboard = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/stats`,
    "dashboard-stats"
  );

  const { stats } = data || {};

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  const Appbar = (
    <Paper
      elevation={2}
      sx={{
        padding: "1.5rem 2rem",
        margin: "2rem 0",
        borderRadius: "1rem",
        backgroundColor: "#f5f5f5", // Soft background color for a modern look
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{
          gap: { xs: "1rem", sm: "2rem" },
          flexWrap: "wrap", // Ensures responsiveness on smaller screens
        }}
      >
        <SearchField
          placeholder="Search..."
          sx={{
            flex: { xs: "1 1 100%", sm: "none" }, // Take full width on small screens
            maxWidth: "300px", // Limit width on larger screens
            borderRadius: "0.5rem",
          }}
        />

        <CurveButton
          sx={{
            padding: "0.5rem 1.5rem",
            fontSize: "1rem",
            backgroundColor: "#007BFF",
            color: "#fff",
            borderRadius: "0.5rem",
            textTransform: "none",
            "&:hover": { backgroundColor: "#0056b3" }, // Stylish hover effect
          }}
        >
          Search
        </CurveButton>

        <Box flexGrow={1} />

        <Typography
          display={{ xs: "none", lg: "block" }}
          sx={{
            color: "#555",
            fontSize: "0.9rem",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          {moment().format("dddd, D MMMM YYYY")}
        </Typography>
      </Stack>
    </Paper>
  );

  const Widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing="2rem"
      justifyContent="space-between"
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget title={"Users"} value={stats?.usersCount} Icon={<PersonIcon />} />
      <Widget
        title={"Chats"}
        value={stats?.totalChatsCount}
        Icon={<GroupIcon />}
      />
      <Widget
        title={"Messages"}
        value={stats?.messagesCount}
        Icon={<MessageIcon />}
      />
    </Stack>
  );

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Container component={"main"}>
          {Widgets}
          <Stack
            direction={{
              xs: "column",
              lg: "row",
            }}
            flexWrap={"wrap"}
            justifyContent={"center"}
            alignItems={{
              xs: "center",
              lg: "stretch",
            }}
            sx={{ gap: "2rem" }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: "2rem 3.5rem",
                borderRadius: "1rem",
                width: "100%",
                maxWidth: "45rem",
              }}
            >
              <Typography margin={"2rem 0"} variant="h4">
                Last Messages
              </Typography>

              <LineChart value={stats?.messagesChart || []} />
            </Paper>

            <Paper
              elevation={3}
              sx={{
                padding: "1rem ",
                borderRadius: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: { xs: "100%", sm: "50%" },
                position: "relative",
                maxWidth: "25rem",
              }}
            >
              <DoughnutChart
                labels={["Single Chats", "Group Chats"]}
                value={[
                  stats?.totalChatsCount - stats?.groupsCount || 0,
                  stats?.groupsCount || 0,
                ]}
              />

              <Stack
                position={"absolute"}
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={"0.5rem"}
                width={"100%"}
                height={"100%"}
              >
                <GroupIcon /> <Typography>Vs </Typography>
                <PersonIcon />
              </Stack>
            </Paper>
          </Stack>
        </Container>
      )}
    </AdminLayout>
  );
};

const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={4}
    sx={{
      padding: "1.5rem",
      margin: "1.5rem 0",
      borderRadius: "1rem",
      width: "20rem",
      backgroundColor: "#fff",
      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)", // Subtle but noticeable shadow
      transition: "transform 0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)", // Lift effect on hover for modern interaction
      },
    }}
  >
    <Stack alignItems="center" spacing={1.5}>
      <Box
        sx={{
          backgroundColor: "#F5F5F5", // Soft background for the value circle
          width: "3.5rem",
          height: "3.5rem",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid #D1D1D1", // Light border for definition
        }}
      >
        <Typography
          sx={{
            fontSize: "1.3rem",
            fontWeight: "500",
            color: "#333", // Darker text for clarity
          }}
        >
          {value}
        </Typography>
      </Box>

      <Stack direction="row" spacing={1} alignItems="center">
        <Box
          sx={{
            width: "2rem",
            height: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#007BFF", // Accent color for the icon
            borderRadius: "50%",
            color: "#fff",
          }}
        >
          {Icon}
        </Box>
        <Typography
          sx={{
            fontSize: "1.1rem",
            fontWeight: "500",
            color: "#555", // Softer title color
            textTransform: "capitalize",
          }}
        >
          {title}
        </Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default Dashboard;
