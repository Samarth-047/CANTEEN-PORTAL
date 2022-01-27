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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Find_food = (props) => {
  const navigate = useNavigate();
  const [item, setitem] = useState("");
  const [canteen, setcanteen] = useState("");


  const onChangeitem = (event) => {
    setitem(event.target.value);
  };
  const onChangecanteen = (event) => {
    setcanteen(event.target.value);
  };


  const resetInputs = () => {
    setitem("");
  };

  const onSubmitdetail = (event) => {
    event.preventDefault();

    const newUser = {
      item: item,
    };
    console.log(newUser);
    axios
      .post("http://localhost:4000/food/food_place_search", newUser)
      .then((res) => {
        alert("Item found");
        localStorage.setItem('order', JSON.stringify(res.data));
        console.log(res.data);
        navigate("/place_order");
      })
      .catch((err) => alert(err.error));

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
            <Button color="inherit" onClick={() => navigate("/buyer")}>
              BUY
            </Button>
            <Button color="inherit" onClick={() => navigate("/profile")}>
              My Profile
            </Button>
            <Button color="inherit" onClick={() => navigate("/cart")}>
              MY CART
            </Button>
            <Button color="inherit" onClick={() => navigate("/wallet")}>
              wallet
            </Button>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Log Out
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
            label="Item"
            variant="outlined"
            value={item}
            onChange={onChangeitem}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={onSubmitdetail}>
            Find Item
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Find_food;
