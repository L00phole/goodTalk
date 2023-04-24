
import { Box, Typography } from "@mui/material";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: " rgba(67, 43, 255, 0.8)",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
     
      <Box>
        <Typography>{user.username}</Typography>
        <Typography fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserListItem;
