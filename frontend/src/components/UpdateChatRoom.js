import React, { useState } from "react";
import {
  Dialog,
  Backdrop,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  IconButton,
  FormControl,
  Input,
  Box,
  CirkularProgress,
} from "@mui/material";
import api from "../utils/axios";
import UserBadgeItem from "./UserBadge";
import UserListItem from "./UserListItem";
import { useAppContext } from "../context/ChatProvider";
import { Visibility, CloseIcon } from "@mui/material/Icon";
import { toast } from "react-toastify";

const UpdateGroupChatModel = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user } = useAppContext();

  const [isOpen, setIsOpen] = useState(false); 
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast.error("Only Admin Have Permission To Remove User");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.patch(`/api/v1/chat/removeFromGroup`, {
        chatId: selectedChat._id,
        userId: user1._id,
      });

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
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

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);

      const { data } = await api.patch(`/api/v1/chat/renameGroup`, {
        chatId: selectedChat._id,
        chatName: groupChatName,
      });

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast.error(error);
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast.error("User Already In Group");
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast.error("Ony Admin Can Add Users");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.patch(`/api/v1/chat/addUserToGroup`, {
        chatId: selectedChat._id,
        userId: user1._id,
      });

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
    setGroupChatName("");
  };

  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<Visibility />}
        onClick={() => setIsOpen(true)}
      />

      <Dialog onClose={()=> setIsOpen(false)} isOpen={isOpen} isCentered>
        <Backdrop />
        <DialogContent>
          <DialogTitle
            fontSize="35px"
            fontFamily="Poppins"
            display="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </DialogTitle>

          <IconButton
           display={{ base: "flex" }}
           icon={<CloseIcon />}
           onClick={()=> setIsOpen(true)}/>
          <DialogContent
            display="flex"
            flexDir="column"
            alignItems="center"
            fontFamily="Poppins"
          >
            <Box w="100%" d="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                background=" rgba(67, 43, 255, 0.8)"
                _hover={{
                  background: " rgba(67, 43, 255, 0.8)",
                  color: "white",
                }}
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {loading ? (
              <CirkularProgress size="lg" />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </DialogContent>
          <DialogActions>
            <Button
              fontFamily="Poppins"
              onClick={() => handleRemove(user)}
              colorScheme="red"
            >
              Leave Group
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateGroupChatModel;
