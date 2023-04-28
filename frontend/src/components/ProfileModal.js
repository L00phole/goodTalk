import React, { useState } from "react";
import {
  Visibility
  , 
} from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import {
  Modal,
   
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from "@mui/material";

const ProfileModal = ({ user, children }) => {
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <>
      {children ? (
        <span onClick={() => setIsOpen(true)}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<Visibility />}
          onClick={() => setIsOpen(true)}
        />
      )}
      <Modal size="lg" onClose={()=> setIsOpen(false)} open={isOpen} isCentered>
        
        <DialogContent h="440px">
          <CloseIcon />

          <DialogContent
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              fontSize="20px"
              fontFamily="Poppins"
              display="flex"
              justifyContent="center"
            >
              {user.username}
            </Typography>
          
            <Typography component={'span'} fontSize={{ base: "28px", md: "30px" }} fontFamily="Poppins">
              Email: {user.email}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=> setIsOpen(false)}>Close</Button>
          </DialogActions>
        </DialogContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
