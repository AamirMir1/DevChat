import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";
import { motion } from "framer-motion";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  console.log(index, "we're index");
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        backgroundColor: window.innerWidth < 600 ? "#00afef" : "white",
      }}
    >
      <Link
        sx={{
          padding: "0",
        }}
        to={`/chat/${_id}`}
        style={{
          position: window.innerWidth >= 600 ? "absolute" : "initial",
          left: "2.3rem",
          width: window.innerWidth >= 600 ? "calc(100% - 30px)" : "100%",
          borderTopLeftRadius: window.innerWidth >= 600 ? "36px" : "0",
          borderBottomLeftRadius: window.innerWidth >= 600 ? "36px" : "0",
          overflow: "hidden",
          backgroundColor: sameSender ? "#00698f" : "#00afef",
          marginBottom: "1rem",
          top: `${index * 5.7}rem`,
        }}
        onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
      >
        <motion.div
          initial={{ opacity: 0, y: "-100%" }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          style={{
            display: "flex",
            alignItems: "center",
            // backgroundColor: sameSender ? "black" : "unset",
            color: "white",
            position: "relative",
            padding: "1rem",
          }}
        >
          <AvatarCard avatar={avatar} />

          <Stack style={{ paddingLeft: groupChat ? ".7rem" : "0" }}>
            <Typography>{name}</Typography>
            {newMessageAlert && (
              <Typography>{newMessageAlert.count} New Message</Typography>
            )}
          </Stack>

          {isOnline && (
            <Box
              sx={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "green",
                position: "absolute",
                top: "50%",
                right: "1rem",
                transform: "translateY(-50%)",
              }}
            />
          )}
        </motion.div>
      </Link>
    </div>
  );
};

export default memo(ChatItem);
