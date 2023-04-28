import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const CustomBox = styled(Box)({
cursor: 'pointer',
backgroundColor: '#E8E8E8',
'&:hover': {
background: 'rgba(67, 43, 255, 0.8)',
color: 'white',
},
width: '100%',
display: 'flex',
alignItems: 'center',
color: 'black',
padding: '8px 16px',
marginBottom: '8px',
borderRadius: '8px',
});

const UserListItem = ({ user, handleFunction }) => {
return (
<CustomBox onClick={handleFunction}>
<Box>
<Typography>{user.username}</Typography>
<Typography variant="subtitle2">
<b>Email: </b>
{user.email}
</Typography>
</Box>
</CustomBox>
);
};

export default UserListItem;