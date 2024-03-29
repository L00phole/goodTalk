import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  FormControl,
  Input,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import api from "../utils/axios";
import { useAppContext } from "../context/ChatProvider";
import UserBadgeItem from "./UserBadge";
import UserListItem from "./UserListItem";
import { toast } from "react-toastify";
import { purple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const GroupChatModal = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { chats, setChats } = useAppContext();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.get(`/api/user/users?search=${search}`);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast.error("User Already Added!");
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast.error("Please Fill Up All The Fields");
      return;
    }

    try {
      const { data } = await api.post(`/api/chat/createGroup`, {
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((u) => u._id)),
      });
      setChats([data, ...chats]);
      setOpen(false);
      toast.success("SuccessFully Created New Group");
    } catch (error) {
      toast.error("Failed To Create Group");
    }
  };
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <span onClick={handleClick}>{children}</span>

      <Dialog open={open} isCentered>
        <DialogContent>
          <DialogTitle
            sx={{
              fontSize: "35px",
              display: "flex",
              justifyContent: "center",
              fontFamily: "Poppins",
            }}
          >
            Create Group Chat
          </DialogTitle>
          <Button onClick={handleClick}>
            <CloseIcon />
          </Button>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormControl>
              <Input
                placeholder="Group Name"
                sx={{ marginBottom: 3 }}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users:"
                sx={{ marginBottom: 1 }}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w="100%" display="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {loading ? (
              <div>Loading...</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </DialogContent>
          <DialogActions>
            <ColorButton onClick={handleSubmit}>Create Chat</ColorButton>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GroupChatModal;
