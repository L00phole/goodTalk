import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/ChatProvider";
import { SideDrawer, MyChats, ChatBox } from "../components";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../utils/localstorage";

const Chat = () => {
  const { user } = useAppContext();
  const [fetchAgain, setFetchAgain] = useState(false);
  



  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        sx={{
          display: "flex",
          marginTop: 4,
          justifyContent: "space-between",
          width: "100%",
          height: "91.5vh",
          padding: "10px",
        }}
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chat;
