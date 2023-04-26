import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../utils/localstorage";
import { Box, Typography, Tabs, Tab } from "@mui/material";

import PropTypes from "prop-types";
// import { FaSignInAlt, FaUser } from "react-icons/fa";
import { Login, Registration } from "../components";
import { useState } from "react";


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
					<Typography component={'span'}>{children}</Typography>
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
function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const Register = () => {
	const navigate = useNavigate();


	const [value, setValue] = useState(0);

const handleChange = (event, newValue) => {
	setValue(newValue);
};
	useEffect(() => {
		if (getUserFromLocalStorage("user")) {
			setTimeout(() => {
				navigate("/");
			}, 3000);
		}
	}, [navigate]);

	
	return (
		<>
					<Box sx={{ width: "100%" }}>
						<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
							<Tabs
								value={value}
								onChange={handleChange}
								aria-label="basic tabs"
								className="pt-2"
							>
								<Tab label="Login"  {...a11yProps(0)}/>
								<Tab label="Register"  {...a11yProps(1)}/>
							</Tabs>
						</Box>
						<TabPanel value={value} index={0}>
							<Login /> 
						</TabPanel>
						<TabPanel value={value} index={1}>
							<Registration />
						</TabPanel>
					</Box>
		</>
	);
};

export default Register;
