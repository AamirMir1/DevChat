import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, useState } from "react";
import { orange } from "../../constants/color";
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc";
import { resetNotificationCount } from "../../redux/reducers/chat";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotifcationDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );
  const { notificationCount } = useSelector((state) => state.chat);

  const handleMobile = () => dispatch(setIsMobile(true));

  const openSearch = () => dispatch(setIsSearch(true));

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };

  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };

  const navigateToGroup = () => navigate("/groups");

  const logoutHandler = async () => {
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Box
        sx={{ flexGrow: 1 }}
        height={"4rem"}
        width={"93vw"}
        margin={".7rem auto .7rem auto"}
      >
        <AppBar
          position="static"
          sx={{
            bgcolor: "#00afef",
            boxShadow: "10px 10px 54px -20px rgba(0,0,0,0.5)",
            borderRadius: "30px",
          }}
        >
          <Toolbar style={{ flexDirection: "row-reverse" }}>
            <IconBtn
              title={"Logout"}
              icon={<LogoutIcon className="icon-class-name" />}
              onClick={logoutHandler}
            />

            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
              }}
            />
            <Box>
              <IconBtn
                title={"Search"}
                icon={
                  <SearchIcon
                    className="icon-class-name"
                    style={{ margin: "0px" }}
                  />
                }
                onClick={openSearch}
              />

              <IconBtn
                title={"New Group"}
                icon={
                  <AddIcon
                    className="icon-class-name"
                    style={{ margin: "0px" }}
                  />
                }
                onClick={openNewGroup}
              />

              <IconBtn
                title={"Manage Groups"}
                icon={
                  <GroupIcon
                    className="icon-class-name"
                    style={{ margin: "0px" }}
                  />
                }
                onClick={navigateToGroup}
              />

              <IconBtn
                title={"Notifications"}
                icon={
                  <NotificationsIcon
                    className="icon-class-name"
                    style={{ margin: "0px" }}
                  />
                }
                onClick={openNotification}
                value={notificationCount}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotifcationDialog />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
