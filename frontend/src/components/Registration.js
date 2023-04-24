import React from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { addUserToLocalStorage } from "../utils/localstorage";
import { FormControl, InputLabel, Input, FormGroup,IconButton, InputAdornment, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const Registration = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  //   const onChange = (e) => {
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       [e.target.name]: e.target.value,
  //     }))
  //   }

  const onSubmit = async () => {
    const { firstName, lastName, email, password, passwordConfirm } = formData;

    if (password !== passwordConfirm) {
      throw new Error("password do not match");
    }
    if (!firstName || !lastName || !email || !password || !passwordConfirm) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const { userData } = await api.post("/api/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });
      toast.success(`Hi There! ${userData.firstName}`);
      addUserToLocalStorage(userData);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <section className="flex place-content-center ">
        <div className="p-3  items-center justify-between pb-8">
          <h1 className="flex items-center font-medium">
            <FaUser />
            REGISTER
          </h1>
          <p>Please create a new account</p>
        </div>
      </section>
      <section className="place-content-center grid ">
        <form>
          <FormControl id="firstName" isRequired className="p-2">
            <InputLabel htmlFor="firstname">Firstname</InputLabel>
            <Input
              type="text"
              className="form-control place-content-center px-2 rounded-md border-2 border-slate-600"
              id="firstName"
              name="firstName"
              placeholder="Enter firstname"
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </FormControl>
          <FormControl isRequired id="lastName" className="p-2">
            <InputLabel htmlFor="lastname">Lastname</InputLabel>
            <Input
              type="text"
              className="form-control place-content-center px-2 rounded-md border-2 border-slate-600"
              id="lastName"
              name="lastName"
              placeholder="Enter lastname"
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </FormControl>
          <FormControl id="email" isRequired className="p-2">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              type="email"
              className="form-control place-content-center px-2 rounded-md border-2 border-slate-600"
              id="email"
              name="email"
              placeholder="Enter email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </FormControl>
          <FormControl id="password" isRequired className="p-2">
            <InputLabel htmlFor="password">Password</InputLabel>
            <FormGroup>
              <Input
                type={show ? "text" : "password"}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClick}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {show ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                className="form-control place-content-center px-2 rounded-md border-2 border-slate-600"
                id="password"
                name="password"
                placeholder="Enter password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </FormGroup>
          </FormControl>
          <FormControl id="passwordConfirm" isRequired className="p-2">
            <InputLabel htmlFor="passwordConfirm">Confirm password</InputLabel>
            <FormGroup>
              <Input
                type="password"
                className="form-control place-content-center px-2 rounded-md border-2 border-slate-600"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="Confirm password "
                onChange={(e) =>
                  setFormData({ ...formData, passwordConfirm: e.target.value })
                }
              />
            </FormGroup>
          </FormControl>
          <Button className="rounded bg-cyan-200 border-2 border-slate-600/50 hover:bg-slate-700 justify-center flex mt-2 mx-2 py-1 bg-black text-white font-bold"
              onSubmit={onSubmit}
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
        </form>
      </section>
    </>
  );
};

export default Registration;
