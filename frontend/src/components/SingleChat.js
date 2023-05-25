import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Box,
  FormControl,
  Input,
  CircularProgress,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { getSender, getSenderFull } from "../config/chat";
import { useAppContext } from "../context/ChatProvider";
import api from "../utils/axios";
import ProfileModal from "./ProfileModal";
import ScrollableChat from "./ScrollableChat";
import UpdateGroupChat from "./UpdateGroupChat";
import io from "socket.io-client";

let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    useAppContext();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const fetchMessages = useCallback(async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);

      const { data } = await api.get(`/api/message/${selectedChat._id}`);
      console.log("data", data);
      setMessages(data);
      setLoading(false);
      socket.emit("join-chat", selectedChat._id);
    } catch (error) {
      toast.error(error);
    }
  }, [selectedChat]);

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop-typing", selectedChat._id);
      try {
        const { data } = await api.post(`/api/message/`, {
          message: newMessage,
          chatId: selectedChat._id,
        });

        setNewMessage("");
        socket.emit("new-message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.error(error);
      }
    }
  };

  useEffect(() => {
    console.log("connect to websocket...?");
    socket = io("http://localhost:8080");
    socket.emit("setup", user);

    socket.on("connected", () => setSocketConnected(true));

    socket.on("typing", () => setIsTyping(true));
    socket.on("stop-typing", () => setIsTyping(false));
  }, [user]);

  useEffect(() => {
    fetchMessages();
  }, [selectedChat, fetchMessages]);

  useEffect(() => {
    socket.on("message-received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // notification
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop-typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Typography
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Poppins"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIosIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChat
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: 3,
              background: "#E8E8E8",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            {loading ? (
              <CircularProgress size="xl" w={20} h={20} margin="auto" />
            ) : (
              <div className="message">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl
              onKeyDown={sendMessage}
              h="15%"
              required={false}
              mt={3}
            >
              {isTyping ? <div>Typing ...</div> : <></>}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Typography fontSize="3xl" pb={3} fontFamily="Poppins">
            Click On Users to Start Conversation
          </Typography>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
