import { Close } from "@mui/icons-material"
import { Badge } from "@mui/material";
import styled from "styled-components";

const StyledBadge = styled(Badge)`
  && {
    padding: 4px 8px;
    border-radius: 16px;
    margin: 4px;
    margin-bottom: 8px;
    font-size: 12px;
    color: #fff;
    background-color: #8b5cf6;
    cursor: pointer;
  }
`;

const StyledCloseIcon = styled(Close)`
  && {
    padding-left: 4px;
  }
`;

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <StyledBadge onClick={handleFunction}>
      {user.username}
      {admin === user._id && <span> (Admin)</span>}
      <StyledCloseIcon />
    </StyledBadge>
  );
};

export default UserBadgeItem;