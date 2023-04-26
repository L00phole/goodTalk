import React from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { addUserToLocalStorage } from "../utils/localstorage";
import { FormControl, FormGroup,IconButton, InputAdornment, Button, Stack, TextField, Grid, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Registration = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [values, setValues] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  //   const onChange = (e) => {
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       [e.target.name]: e.target.value,
  //     }))
  //   }

  const submitHandler = async () => {
    const { username, fullName, email, password} = values;

    // if (password !== passwordConfirm) {
    //   throw new Error("password do not match");
    // }
    if (!username || !fullName || !email || !password){
      toast.error("Please fill in all fields", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return;
    }
    try {
      const { data } = await api.post("/api/user/register", {
        username,
        fullName,
        email,
        password,
      });
      toast.success(`Hi There! ${data.username}`);
      addUserToLocalStorage(data);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
console.log(values);
  return (
    <>
      <Stack spacing={1} marginBottom={4}>
        <Grid justifyContent={"center"} alignItems={"center"} display={"flex"} >
          <FaUser />
          <Typography>
            REGISTER
          </Typography></Grid>
        <Grid justifyContent={"center"} alignItems={"center"} display={"flex"} >
          <Typography>Please create a new account</Typography>
        </Grid>
      </Stack>
      <Stack spacing={2} className="place-content-center grid ">
          <FormControl id="username" required >
            <TextField
              type="text"
              placeholder="Enter username"
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
            />
          </FormControl>
          <FormControl required id="fullName" className="py-9">
            <TextField
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter fullName"
              onChange={(e) =>
                setValues({ ...values, fullName: e.target.value })
              }
            />
          </FormControl>
          <FormControl id="email" required className="p-2">
            <TextField
              type="email"
             
              id="email"
              name="email"
              placeholder="Enter email"
              onChange={(e) =>
                setValues({ ...values, email: e.target.value })
              }
            />
          </FormControl>
          <FormControl id="password" required className="p-2">
            <FormGroup>
              <TextField
                type={show ? "text" : "password"}
                InputProps={{
                  endAdornment:(
                  <InputAdornment position="end" >
                      <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClick}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                      >
                          {show ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                  </InputAdornment>
                  ),
                }}
               
                id="password"
                name="password"
                placeholder="Enter password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
            </FormGroup>
          </FormControl>
          {/* <FormControl id="passwordConfirm" required className="p-2">
            <FormGroup>
              <TextField
              type={show ? "text" : "password"}
              InputProps={{
                endAdornment:(
                <InputAdornment position="end" >
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClick}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        {show ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
                ),
              }}
               
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="Confirm password "
                onChange={(e) =>
                  setValues({ ...values, passwordConfirm: e.target.value })
                }
              />
            </FormGroup>
          </FormControl> */}
          <Button 
              onClick={submitHandler}
              type="submit"
            >
              Sign Up
          </Button>
          <Link
            to="/login"
            className="flex items-center justify-center m-2 hover:text-blue-600 underline"
          >
            <p className="pl-1">Or login here</p>
          </Link>
      </Stack>
    </>
  );
};

export default Registration;
