import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { setIsNotification } from "../../redux/reducers/misc";
import CloseIcon from "@mui/icons-material/Close";

const Notifications = () => {
  const { isNotification } = useSelector((state) => state.misc);

  const dispatch = useDispatch();

  const { isLoading, data, error, isError } = useGetNotificationsQuery();

  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    await acceptRequest("Accepting...", { requestId: _id, accept });
  };

  const closeHandler = () => dispatch(setIsNotification(false));

  useErrors([{ error, isError }]);

  return (
    <Dialog
      open={isNotification}
      onClose={closeHandler}
      sx={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(0, 175, 239, 0.2)",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Stack
        p={{ xs: "1rem", sm: "3rem" }}
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
            fontSize={{ xs: "1.3rem", sm: "2rem" }}
          >
            Notifications
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

        {isLoading ? (
          <Skeleton
            variant="rectangular"
            height={60}
            sx={{
              borderRadius: "8px",
              backgroundColor: "rgba(0, 175, 239, 0.1)",
            }}
          />
        ) : (
          <>
            {data?.allRequests.length > 0 ? (
              data?.allRequests.map(({ sender, _id }) => (
                <NotificationItem
                  sender={sender}
                  _id={_id}
                  handler={friendRequestHandler}
                  key={_id}
                />
              ))
            ) : (
              <Typography
                textAlign="center"
                sx={{
                  color: "#333",
                  fontSize: "1rem",
                  fontWeight: "400",
                }}
              >
                No new notifications
              </Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem
      sx={{
        padding: "0.5rem 0",
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        ":last-child": {
          borderBottom: "none",
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        width="100%"
        sx={{
          padding: "0.8rem",
          borderRadius: "8px",
          backgroundColor: "rgba(0, 175, 239, 0.05)",
          "&:hover": {
            backgroundColor: "rgba(0, 175, 239, 0.1)",
          },
        }}
      >
        <Avatar
          src={avatar}
          alt={name}
          sx={{
            width: 50,
            height: 50,
            border: `2px solid #00afef`,
          }}
        />
        <Typography
          variant="body1"
          sx={{
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: "1rem",
            fontWeight: "500",
          }}
        >
          {`${name} sent you a friend request.`}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            size="small"
            onClick={() => handler({ _id, accept: true })}
            sx={{
              textTransform: "none",
              backgroundColor: "#00afef",
              "&:hover": { backgroundColor: "#008bb3" },
            }}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handler({ _id, accept: false })}
            sx={{
              textTransform: "none",
              color: "#ff4d4d",
              borderColor: "#ff4d4d",
              "&:hover": {
                backgroundColor: "#ffe6e6",
              },
            }}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
