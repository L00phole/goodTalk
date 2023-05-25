import React from "react";
import { Box } from "@mui/material";
import "./style.css";
import SingleChat from "./SingleChat";
import { useAppContext } from "../context/ChatProvider";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = useAppContext();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        background: "yellow",
        padding: 3,
        width: "100%",
      }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
