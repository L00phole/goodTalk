import React, { useState } from "react";
import { useAppContext } from "../context/ChatProvider";
import { SideDrawer, MyChats, ChatBox } from "../components";
import { Box } from "@mui/material";

const Chat = () => {
  const { user } = useAppContext();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          height: { xs: "calc(100vh - 3.125rem)", sm: "calc(100vh - 3.75rem)" },
          marginTop: { xs: "3.125rem", sm: "3.75rem" },
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
