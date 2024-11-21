import { useFileHandler, useInputValidation } from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { bgGradient } from "../constants/color";
import { server } from "../constants/config";
import { userExists } from "../redux/reducers/auth";
import { usernameValidator } from "../utils/validators";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");

  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");

    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?chat,technology')", // Replace with a suitable image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: "1rem",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, marginBottom: "1rem" }}
          >
            {isLogin ? "DevChat" : "Create Your Account"}
          </Typography>
          <form onSubmit={isLogin ? handleLogin : handleSignUp}>
            {!isLogin && (
              <Stack
                position="relative"
                width="10rem"
                margin="auto"
                sx={{ marginBottom: "1rem" }}
              >
                <Avatar
                  sx={{
                    width: "10rem",
                    height: "10rem",
                    border: "2px solid #667eea",
                  }}
                  src={avatar.preview}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: "0.5rem",
                    right: "0.5rem",
                    backgroundColor: "#667eea",
                    color: "white",
                    ":hover": {
                      backgroundColor: "#764ba2",
                    },
                  }}
                  component="label"
                >
                  <CameraAltIcon />
                  <input type="file" hidden onChange={avatar.changeHandler} />
                </IconButton>
              </Stack>
            )}

            {[
              !isLogin && { label: "Name", value: name, type: "text" },
              !isLogin && { label: "Bio", value: bio, type: "text" },
              { label: "Username", value: username, type: "text" },
              { label: "Password", value: password, type: "password" },
            ]
              .filter(Boolean)
              .map(({ label, value, type }, index) => (
                <TextField
                  key={index}
                  label={label}
                  type={type}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={value.value}
                  onChange={value.changeHandler}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#667eea",
                    },
                  }}
                />
              ))}

            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={isLoading}
              sx={{
                marginTop: "1rem",
                backgroundColor: "#667eea",
                ":hover": {
                  backgroundColor: "#764ba2",
                },
              }}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>

            <Typography sx={{ marginY: "1rem", color: "#666" }}>OR</Typography>

            <Button
              variant="text"
              fullWidth
              onClick={toggleLogin}
              disabled={isLoading}
              sx={{
                color: "#667eea",
                fontWeight: 600,
                ":hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {isLogin ? "Sign Up Instead" : "Login Instead"}
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
