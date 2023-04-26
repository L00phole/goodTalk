import React, { useState } from "react";
import { toast } from "react-toastify";

import { Button, Stack } from "@mui/material";
import { FormControl, FormLabel } from "@mui/material";
import { TextField, InputAdornment } from '@mui/material';
import { useNavigate } from "react-router-dom";

import api from "../utils/axios";
import { addUserToLocalStorage } from "../utils/localstorage";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: "false",
  });

  const navigate = useNavigate();

  const submitHandler = async () => {
    setValues({ ...values, loading: true });
    const { email, password } = values;
    if (!email || !password) {
      toast.error("Please Fill All the Fields");
      setValues({ ...values, loading: false });
      return;
    }
    try {
      const { data } = await api.post("/api/auth/login", {
        email,
        password,
      });
      
      toast.success(`Welcome Back! ${data.username}`);
      addUserToLocalStorage(data);
      setValues({ ...values, loading: false });
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.msg);
      setValues({ ...values, loading: false });
    }
  };
  // console.log(values);
  return (
    <Stack spacing="10px" fontFamily="Poppins">
      <FormControl id="email" required>
        <FormLabel>email</FormLabel>
        <TextField
          value={values.email}
          type="email"
          placeholder="email"
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
      </FormControl>
      <FormControl id="password" required>
        <FormLabel>password</FormLabel>
        <FormControl size="md">
          <TextField
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            type={show ? "text" : "password"}
            placeholder="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    size="small"
                    onClick={handleClick}
                  >
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          
        </FormControl>
      </FormControl>
      <Button
        onClick={submitHandler}
        loading={values.loading}
      >
        Login
      </Button>
      <Button
        variant="solid"
       
        onClick={() => {
          setValues({ email: "test@gmail.com", password: "t1s25!96" });
        }}
      >
        Login For Test
      </Button>
    </Stack>
  );
};

export default Login;
