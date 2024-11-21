import { useInputValidation } from "6pp";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock"; // Import an icon
import { bgGradient } from "../../constants/color";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";

const AdminLogin = () => {
  const { isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const secretKey = useInputValidation("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value));
  };

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  if (isAdmin) return <Navigate to="/admin/dashboard" />;

  return (
    <div
      style={{
        backgroundImage: "white",
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
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
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              marginBottom: 2,
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: "#1976d2",
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                marginTop: 1,
              }}
            >
              Please enter your secret key to access the admin panel.
            </Typography>
          </Box>
          <form
            style={{
              width: "100%",
            }}
            onSubmit={submitHandler}
          >
            <TextField
              required
              fullWidth
              label="Secret Key"
              type="password"
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />
            <Button
              sx={{
                marginTop: 3,
                padding: 1,
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "1rem",
                borderRadius: 2,
                backgroundImage: "linear-gradient(90deg, #1976d2, #42a5f5)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  backgroundImage: "linear-gradient(90deg, #1565c0, #2196f3)",
                },
              }}
              variant="contained"
              type="submit"
              fullWidth
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
