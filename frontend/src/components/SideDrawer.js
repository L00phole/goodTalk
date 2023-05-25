import React, { useState } from "react";
import {
  Menu,
  Divider,
  MenuItem,
  List,
  MenuList,
  Button,
  Input,
  Box,
  Typography,
  ListItem,
  Drawer,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CssBaseline from "@mui/material/CssBaseline";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Tooltip } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import CircularProgress from "@mui/material/CircularProgress";
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
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const theme = useTheme();

  const drawerWidth = 370;

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
      console.log("Searching....", search, api);
      const { data } = await api.get(`/api/user/users`, { params: { search } });

      console.log("Searched...", data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error(error);
    }
    console.log(searchResult);
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const { data } = await api.post(`/api/chat`, { userId });

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      toast.error(error);
    }
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <CssBaseline />
          <AppBar
            position="fixed"
            open={open}
            sx={{
              maxHeight: "xs",
              height: { xs: "3.125rem", sm: "3.75rem" },
              backgroundColor: "white",
              width: "100vw",
              maxWidth: "100%",
              justifyContent: "center",
              backdropFilter: "blur(10px)",
              borderBottom: "5px solid #92a7f0",
            }}
          >
            <Toolbar variant="dense" disableGutters sx={{ width: "100%" }}>
              <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gap={2}
                direction="row"
              >
                <Box gridColumn="span 1">
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleOpen}
                    sx={{ marginRight: 2 }}
                  >
                    <MenuIcon sx={{ color: "#2E5CFF" }} fontSize="large" />
                  </IconButton>
                </Box>
                <Box gridColumn="span 4">
                  <Tooltip
                    title="Search Users to chat"
                    arrow
                    placement="bottom-end"
                  >
                    <Button
                      sx={{ color: "#2E5CFF" }}
                      variant="ghost"
                      onClick={handleOpen}
                    >
                      <FiSearch sx={{ color: "#2E5CFF" }} />
                      <Typography
                        sx={{
                          display: { md: "flex" },
                          paddingLeft: 4,
                          paddingTop: 1,
                        }}
                      >
                        Search User
                      </Typography>
                    </Button>
                  </Tooltip>
                </Box>
                <Box gridColumn="span 5">
                  <Typography
                    variant="h4"
                    fontFamily="Poppins"
                    sx={{
                      backgroundImage:
                        "linear-gradient(110.29deg, #2E5CFF 11.11%, #973DF0 60.96%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 700,
                    }}
                  >
                    CatchUp
                  </Typography>
                </Box>

                <Box gridColumn="span 1">
                  <IconButton
                    id="menu-button1"
                    aria-controls={menuOpen ? "menu-list1" : undefined}
                    aria-haspopup="true"
                    aria-expanded={menuOpen ? "true" : undefined}
                    onClick={handleClickMenu}
                    p={1}
                  >
                    {notification?.length > 0 && toast.info(`New Message`)}
                    <NotificationsIcon fontSize="md" m={1} />
                    Menu
                  </IconButton>
                  <Menu
                    id="menu-list1"
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleCloseMenu}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    MenuListProps={{ "aria-labelledby": "menu-button1" }}
                  >
                    <MenuList>
                      {notification?.length === 0 && (
                        <MenuItem>No New Message</MenuItem>
                      )}
                      {notification?.map((noti) => (
                        <MenuItem
                          key={noti._id}
                          onClick={() => {
                            setSelectedChat(noti.chat);
                            setNotification(
                              notification.filter((n) => n !== noti)
                            );
                          }}
                        >
                          {noti?.chat?.isGroupChat
                            ? `New Message in ${noti?.chat?.chatName} `
                            : ` New Message from ${getSender(
                                user,
                                noti?.chat?.users
                              )}`}
                        </MenuItem>
                      ))}
                    </MenuList>
                    <MenuList>
                      <MenuItem>My Profile</MenuItem>
                      <ProfileModal user={user} />
                      <Divider />
                      <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>

        <Drawer
          sx={{
            paddingLeft: 4,
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="left"
          // onClick={toggleOpen}
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Typography
            height="max-content"
            fontSize="20px"
            fontFamily="Poppins"
            margin="20px"
          >
            Search Users
          </Typography>
          <List>
            <ListItem display="flex" sx={{ paddingLeft: 6 }}>
              <Input
                fullWidth
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button sx={{ paddingLeft: 4 }} onClick={handleSearch}>
                Go
              </Button>
            </ListItem>
            {loading ? (
              <ChatLoading></ChatLoading>
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && (
              <CircularProgress marginLeft="auto" display="flex" />
            )}
          </List>
        </Drawer>
      </Box>
    </>
  );
};

export default SideDrawer;
