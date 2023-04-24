import React, { useState, useEffect,useCallback } from "react";
import { useAppContext } from "../context/ChatProvider";
import AddIcon from '@mui/icons-material/Add';
import { Box, Stack, Typography } from "@mui/material";
import api from "../utils/axios";
import { Button } from "@mui/material";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./GroupChatModal";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../utils/localstorage";
import { getSender } from "../config/chat";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, chats, setChats } = useAppContext();

  const fetchChats = useCallback(async () => {
    try {
      const { data } = await api.get("/api/v1/chat");
      setChats(data);
    } catch (error) {
      toast.error(error);
    }
  }, [setChats]);
  
  useEffect(() => {
    setLoggedUser(getUserFromLocalStorage("user"));
    fetchChats();
  }, [fetchAgain, fetchChats]);
  

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Poppins"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontFamily="Poppins"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats?.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={
                  selectedChat === chat ? "rgba(67, 43, 255, 0.8)" : "#E8E8E8"
                }
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat?._id}
              >
                <Typography>
                  {!chat?.isGroupChat
                    ? getSender(loggedUser, chat?.users)
                    : chat?.chatName}
                </Typography>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
