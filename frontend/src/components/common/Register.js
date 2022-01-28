import { useState } from "react";
import * as React from 'react';
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact_number, setcontact_number] = useState("");
  const [type, settype] = useState("");
  const [canteen, setcanteen] = useState("");
  const [year, setyear] = useState("");
  const [age, setage] = useState("");
  const [batch_number, setbatch_number] = useState("");
  const [managers_name, setmanagers_name] = useState("");
  const [canteen_open, setcanteen_open] = useState("");
  const [canteen_close, setcanteen_close] = useState("");
  const [password, setpassword] = useState("");
  const [wallet, setwallet] = useState("1");
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };


  const onChangeUsername = (event) => {
    setName(event.target.value);
  };
  const onChangepassword = (event) => {
    setpassword(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangecontact_number = (event) => {
    setcontact_number(event.target.value);
  };

  const onChangetype = (event) => {
    settype(event.target.value);
  };

  const onChangecanteen = (event) => {
    setcanteen(event.target.value);
  };
  const onChangewallet = (event) => {
    setwallet(event.target.value);
  };

  const onChangeyear = (event) => {
    setyear(event.target.value);
  };

  const onChangeage = (event) => {
    setage(event.target.value);
  };

  const onChangebatch_number = (event) => {
    setbatch_number(event.target.value);
  };

  const onChangemanager_name = (event) => {
    setmanagers_name(event.target.value);
  };

  const onChangeopen = (event) => {
    setcanteen_open(event.target.value);
  };

  const onChangeclose = (event) => {
    setcanteen_close(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setcontact_number("");
    setage("");
    setbatch_number("");
    setmanagers_name("");
    setyear("");
    settype("");
    setcanteen("");
    setcanteen_close("");
    setcanteen_open("");
    setValues("");
    setpassword("");
    setwallet("1");
  };

  const onSubmitseller = (event) => {
    event.preventDefault();

    const newUser1 = {
      name: name,
      email: email,
      type: type,
      contact_number: contact_number,
      manager_name: managers_name,
      canteen: canteen,
      canteen_close: canteen_close,
      canteen_open: canteen_open,
      password: password,
      wallet: "0",
    };
    console.log(newUser1);
    axios
      .post("http://localhost:4000/user/register", newUser1)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      })
      .catch(() => {
        alert("email already exists");
      });

    resetInputs();
  };
  const onSubmitbuyer = (event) => {
    event.preventDefault();
    const newUser = {
      name: name,
      email: email,
      contact_number: contact_number,
      type: type,
      year: year,
      age: age,
      batch_number: batch_number,
      password: password,
      canteen_close: canteen_close,
      canteen_open: canteen_open,
    };
    console.log(newUser);

    axios
      .post("http://localhost:4000/user/register", newUser)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      });

    resetInputs();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Canteen Portal
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button color="inherit" onClick={() => navigate("/login")}>
              login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={onChangeUsername}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={onChangeEmail}
          />
        </Grid>
        <Grid item xs={12} style={{ minWidth: 225 }}>
          <TextField
            label="Contact Number"
            variant="outlined"
            value={contact_number}
            onChange={onChangecontact_number}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={onChangepassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} >
          <FormControl style={{ minWidth: 240 }}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              label="Person"
              variant="outlined"
              value={type}
              onChange={onChangetype}
            >
              <MenuItem value="SELLER">SELLER</MenuItem>
              <MenuItem value="STUDENT">STUDENT</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <text style={{ visibility: false }}>
          <br />
          .
          <br />
        </text>
        {type === "STUDENT" &&
          <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
              <FormControl style={{ minWidth: 240 }}>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                  label="Canteen"
                  variant="outlined"
                  value={year}
                  onChange={onChangeyear}
                >
                  <MenuItem value="UG1">UG1</MenuItem>
                  <MenuItem value="UG2">UG2</MenuItem>
                  <MenuItem value="UG3">UG3</MenuItem>
                  <MenuItem value="UG4">UG4</MenuItem>
                  <MenuItem value="UG5">UG5</MenuItem>
                  <MenuItem value="M.TECH/M.s">M.TECH/M.S.</MenuItem>
                  <MenuItem value="P.hd">P.hd</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Age"
                variant="outlined"
                value={age}
                onChange={onChangeage}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Batch Number"
                variant="outlined"
                value={batch_number}
                onChange={onChangebatch_number}
              />
            </Grid>
          </Grid>
        }
        {type === "SELLER" &&
          <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Manager Name"
                variant="outlined"
                value={managers_name}
                onChange={onChangemanager_name}
              />
            </Grid>
            <Grid item xs={12} >
              <FormControl style={{ minWidth: 240 }}>
                <InputLabel id="demo-simple-select-label">Canteen</InputLabel>
                <Select
                  label="Canteen"
                  variant="outlined"
                  value={canteen}
                  onChange={onChangecanteen}
                >
                  <MenuItem value="VC">VC</MenuItem>
                  <MenuItem value="JC">JC</MenuItem>
                  <MenuItem value="BBC">BBC</MenuItem>
                </Select>
              </FormControl>
            </Grid>

       
            <Grid item xs={12} >
              <TextField
                label="open"         
                style={{ minWidth: 235 }}
                value={canteen_open}
                onChange={onChangeopen}
              />

            </Grid>
            <Grid item xs={12} >
              <TextField
                label="close"         
                style={{ minWidth: 235 }}
                value={canteen_close}
                onChange={onChangeclose}
              />
            </Grid>
          </Grid>
        }
        {type === "SELLER" &&
          <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmitseller}>
              Register
            </Button>
          </Grid>
        }
        {type === "STUDENT" &&
          <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmitbuyer}>
              Register
            </Button>
          </Grid>
        }
      </Grid>
    </>
  );
};

export default Register;
