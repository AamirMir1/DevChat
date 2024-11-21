import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu, setUploadingLoader } from "../../redux/reducers/misc";
import {
  AudioFile as AudioFileIcon,
  Image as ImageIcon,
  UploadFile as UploadFileIcon,
  VideoFile as VideoFileIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { useSendAttachmentsMutation } from "../../redux/api/api";

const FileMenu = ({ anchorE1, chatId }) => {
  const { isFileMenu } = useSelector((state) => state.misc);

  const dispatch = useDispatch();

  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  const [sendAttachments] = useSendAttachmentsMutation();

  const closeFileMenu = () => dispatch(setIsFileMenu(false));

  const selectImage = () => imageRef.current?.click();
  const selectAudio = () => audioRef.current?.click();
  const selectVideo = () => videoRef.current?.click();
  const selectFile = () => fileRef.current?.click();

  const fileChangeHandler = async (e, key) => {
    const files = Array.from(e.target.files);

    if (files.length <= 0) return;

    if (files.length > 5)
      return toast.error(`You can only send 5 ${key} at a time`);

    dispatch(setUploadingLoader(true));

    const toastId = toast.loading(`Sending ${key}...`);
    closeFileMenu();

    try {
      const myForm = new FormData();

      myForm.append("chatId", chatId);
      files.forEach((file) => myForm.append("files", file));

      const res = await sendAttachments(myForm);

      if (res.data) toast.success(`${key} sent successfully`, { id: toastId });
      else toast.error(`Failed to send ${key}`, { id: toastId });

      // Fetching Here
    } catch (error) {
      toast.error(error, { id: toastId });
    } finally {
      dispatch(setUploadingLoader(false));
    }
  };

  return (
    <Menu
      anchorEl={anchorE1}
      open={isFileMenu}
      onClose={closeFileMenu}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "8px",
          padding: "0.5rem",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          width: "12rem",
          background: "linear-gradient(to bottom right, #FFFFFF, #F3F4F6)", // Subtle gradient
        },
      }}
    >
      <MenuList>
        {/* Image Upload */}
        <MenuItem
          onClick={selectImage}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem",
            borderRadius: "6px",
            "&:hover": {
              backgroundColor: "#E0F7FA",
            },
          }}
        >
          <Tooltip title="Image" arrow>
            <ImageIcon sx={{ color: "#0288D1", fontSize: "1.5rem" }} />
          </Tooltip>
          <ListItemText
            primary="Image"
            primaryTypographyProps={{
              fontSize: "0.9rem",
              fontWeight: "bold",
              color: "#333",
            }}
          />
          <input
            type="file"
            multiple
            accept="image/png, image/jpeg, image/gif"
            style={{ display: "none" }}
            onChange={(e) => fileChangeHandler(e, "Images")}
            ref={imageRef}
          />
        </MenuItem>

        {/* Audio Upload */}
        <MenuItem
          onClick={selectAudio}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem",
            borderRadius: "6px",
            "&:hover": {
              backgroundColor: "#E8F5E9",
            },
          }}
        >
          <Tooltip title="Audio" arrow>
            <AudioFileIcon sx={{ color: "#388E3C", fontSize: "1.5rem" }} />
          </Tooltip>
          <ListItemText
            primary="Audio"
            primaryTypographyProps={{
              fontSize: "0.9rem",
              fontWeight: "bold",
              color: "#333",
            }}
          />
          <input
            type="file"
            multiple
            accept="audio/mpeg, audio/wav"
            style={{ display: "none" }}
            onChange={(e) => fileChangeHandler(e, "Audios")}
            ref={audioRef}
          />
        </MenuItem>

        {/* Video Upload */}
        <MenuItem
          onClick={selectVideo}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem",
            borderRadius: "6px",
            "&:hover": {
              backgroundColor: "#FFF3E0",
            },
          }}
        >
          <Tooltip title="Video" arrow>
            <VideoFileIcon sx={{ color: "#F57C00", fontSize: "1.5rem" }} />
          </Tooltip>
          <ListItemText
            primary="Video"
            primaryTypographyProps={{
              fontSize: "0.9rem",
              fontWeight: "bold",
              color: "#333",
            }}
          />
          <input
            type="file"
            multiple
            accept="video/mp4, video/webm, video/ogg"
            style={{ display: "none" }}
            onChange={(e) => fileChangeHandler(e, "Videos")}
            ref={videoRef}
          />
        </MenuItem>

        {/* File Upload */}
        <MenuItem
          onClick={selectFile}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem",
            borderRadius: "6px",
            "&:hover": {
              backgroundColor: "#FCE4EC",
            },
          }}
        >
          <Tooltip title="File" arrow>
            <UploadFileIcon sx={{ color: "#C2185B", fontSize: "1.5rem" }} />
          </Tooltip>
          <ListItemText
            primary="File"
            primaryTypographyProps={{
              fontSize: "0.9rem",
              fontWeight: "bold",
              color: "#333",
            }}
          />
          <input
            type="file"
            multiple
            accept="*"
            style={{ display: "none" }}
            onChange={(e) => fileChangeHandler(e, "Files")}
            ref={fileRef}
          />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default FileMenu;
