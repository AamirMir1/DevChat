import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useDispatch, useSelector } from "react-redux";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { setIsNewGroup } from "../../redux/reducers/misc";
import toast from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";

const NewGroup = () => {
  const { isNewGroup } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const groupName = useInputValidation("");

  const [selectedMembers, setSelectedMembers] = useState([]);

  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");

    if (selectedMembers.length < 2)
      return toast.error("Please Select Atleast 3 Members");

    newGroup("Creating New Group...", {
      name: groupName.value,
      members: selectedMembers,
    });

    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  return (
    <Dialog
      onClose={closeHandler}
      open={isNewGroup}
      sx={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(0, 175, 239, 0.2)",
        borderRadius: "12px",

        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Stack
        p={{ xs: "1rem", sm: "3rem" }}
        // width={"25rem"}
        spacing={"2rem"}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <DialogTitle
            textAlign={"center"}
            sx={{
              color: "#00afef",
              fontWeight: "600",
              fontSize: "1.6rem",
              letterSpacing: "1px",
            }}
          >
            New Group
          </DialogTitle>
          <IconButton
            onClick={closeHandler}
            sx={{
              color: "#00afef",
              backgroundColor: "rgba(0, 175, 239, 0.1)",
              "&:hover": {
                backgroundColor: "rgba(0, 175, 239, 0.2)",
              },
              borderRadius: "50%",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
          sx={{
            marginBottom: "1rem",
            input: {
              color: "#00afef",
              fontWeight: "500",
            },
            fieldset: {
              borderColor: "#00afef",
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />

        <Typography variant="body1" sx={{ color: "#333" }}>
          Members
        </Typography>

        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          )}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"} spacing={2}>
          <Button
            variant="text"
            color="error"
            size="large"
            onClick={closeHandler}
            sx={{
              textTransform: "none",
              color: "#ff4d4d",
              "&:hover": {
                backgroundColor: "#ffe6e6",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={submitHandler}
            disabled={isLoadingNewGroup}
            sx={{
              textTransform: "none",
              backgroundColor: "#00afef",
              "&:hover": {
                backgroundColor: "#008bb3",
              },
            }}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
