import React , { useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import { getUserFromLocalStorage } from '../utils/localstorage'
import {Container, Box, Typography, Tabs, Tab} from "@mui/material";
import PropTypes from 'prop-types'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'


const Register =() => {
const navigate = useNavigate();

useEffect(() => {
  if (getUserFromLocalStorage("user")) {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }
}, [navigate]);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function myProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  return (
    <>
     <div>
      <Container>
  
        <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs" className='pt-2'>
        <FaSignInAlt/> <Tab label="Login" {...myProps(0)} />
        <FaUser /> <Tab label="Register" {...myProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Login
      </TabPanel>
      <TabPanel value={value} index={1}>
        Register
      </TabPanel>
    </Box>
  
      </Container>
     </div>
    </>
  )
}

export default Register