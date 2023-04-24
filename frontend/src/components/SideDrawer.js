import React, { useState } from "react";
import {
  Menu,
  Divider,
  MenuItem,
  List,
  Button,
  Input,
  Box, Typography, Backdrop, Drawer
} from "@mui/material";
import { Tooltip } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import  CirkularProgress from "@mui/material/CircularProgress";
import { FiSearch } from "react-icons/fi";

import { toast } from "react-toastify";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";
import { useAppContext } from "../context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { removeUserFromLocalStorage } from "../utils/localstorage.js";
import { getSender } from "../config/chat";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = useAppContext();

  const logoutHandler = () => {
    removeUserFromLocalStorage("user");
    navigate("/register");
  };

  const handleSearch = async () => {
    if (!search) {
      toast.error("Please Provide username");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.get(`/api/v1/auth/users?search=${search}`);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error(error);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const { data } = await api.post(`/api/v1/chat`, { userId });

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
     setIsOpen(false);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={()=>setIsOpen(true)}>
            <FiSearch />
            <Typography d={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Typography>
          </Button>
        </Tooltip>
        <Typography
          fontSize="2xl"
          fontFamily="Poppins"
          css={{
            background:
              "linear-gradient(110.29deg, #2E5CFF 11.11%, #973DF0 60.96%)",
            textFillColor: "text",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            " -webkit-text-fill-color": "transparent",
            fontWeight: 700,
          }}
        >
          Chatify
        </Typography>
        <div>
          <Menu>
            <Button p={1}>
              {notification?.length > 0 ? (
                <>{toast.info(`New Message`)}</>
              ) : null}
              <NotificationsIcon fontSize="2xl" m={1} />
            </Button>
            <List pl={2}>
              {!notification?.length && "No New Message"}
              {notification?.map((noti) => (
                <MenuItem
                  key={noti._id}
                  onClick={() => {
                    setSelectedChat(noti.chat);
                    setNotification(notification.filter((n) => n !== noti));
                  }}
                >
                  {noti?.chat?.isGroupChat
                    ? `New Message in ${noti?.chat?.chatName} `
                    : ` New Message from ${getSender(user, noti?.chat?.users)}`}
                </MenuItem>
              ))}
            </List>
          </Menu>
          <Menu>
            <Button as={Button} rightIcon={<ExpandMoreIcon />}>
            </Button>
            <List>
              <MenuItem>My Profile</MenuItem>
              <ProfileModal user={user} />
              <Divider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </List>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={()=> setIsOpen(false)} isOpen={isOpen}>
        <Backdrop />
        <Box>
          <Typography
            height="max-content"
            fontSize="20px"
            fontFamily="Poppins"
            alignSelf="center"
            margin="20px"
          >
            Search Users
          </Typography>
          <List>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <CirkularProgress ml="auto" d="flex" />}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default SideDrawer;
