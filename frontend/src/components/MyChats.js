import React, { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../context/ChatProvider";
import AddIcon from "@mui/icons-material/Add";
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
			const { data } = await api.get("/api/chat");
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
			sx={{
				base: selectedChat ? "none" : "flex",
				md: "flex",
				flexDirection: "column",
        alignItems: "center",
        padding: 3,
        backgroundColor: "white",
        width: { base: "100%", md: "31%" },
        borderRadius: "lg",
        border: "1px",
			}}
		>
			<Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          fontSize: { base: "28px", md: "30px" },
          fontFamily: "Poppins",
        }}
				spacing={3}
			>
				My Chats
				<GroupChatModal>
					<Button sx={{  fontSize: "17px", fontFamily: "Poppins", display: "flex" }}
					startIcon={<AddIcon />}
					>
						New Group Chat
					</Button>
				</GroupChatModal>
			</Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 3,
          backgroundColor: "#F8F8F8",
          width: "100%",
          height: "100%",
          borderRadius: "lg",
          scroll: "hidden",
        }}
			>
				{chats ? (
					<Stack scroll="scroll">
						{chats?.map((chat) => (
              <Box
                sx={{
                  cursor: "pointer",
                  backgroundColor: selectedChat === chat ? "rgba(67, 43, 255, 0.8)" : "#E8E8E8",
                  color: selectedChat === chat ? "white" : "black",
                  padding: 2,
                  borderRadius: "lg",
                }}

								onClick={() => setSelectedChat(chat)}
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
