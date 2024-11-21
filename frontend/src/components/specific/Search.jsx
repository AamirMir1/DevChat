import { useInputValidation } from "6pp";
import { Close, Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hook";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();

  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  const dispatch = useDispatch();

  const search = useInputValidation("");

  const [users, setUsers] = useState([]);

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request...", { userId: id });
  };

  const searchCloseHandler = () => dispatch(setIsSearch(false));

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

  return (
    <Dialog
      open={isSearch}
      onClose={searchCloseHandler}
      sx={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(0, 175, 239, 0.2)",
        borderRadius: "12px",
        // padding: "1rem",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Stack
        p={"1rem"}
        direction={"column"}
        width={"100%"}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <DialogTitle
          textAlign={"center"}
          sx={{
            color: "#00afef",
            fontWeight: "600",
            fontSize: "1.6rem",

            letterSpacing: "1px",
            marginBottom: "1rem",
          }}
        >
          Find People
        </DialogTitle>

        <TextField
          label="Search"
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#00afef" }} />
              </InputAdornment>
            ),
          }}
        />

        <List sx={{ maxHeight: "300px", overflowY: "auto" }}>
          {users.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>

        <IconButton
          onClick={searchCloseHandler}
          sx={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            color: "#00afef",
            backgroundColor: "rgba(0, 175, 239, 0.1)",
            "&:hover": {
              backgroundColor: "rgba(0, 175, 239, 0.2)",
            },
            borderRadius: "50%",
          }}
        >
          <Close />
        </IconButton>
      </Stack>
    </Dialog>
  );
};

export default Search;
