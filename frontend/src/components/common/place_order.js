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
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

var extra = "0";
var ch = 0;

const Register = (props) => {
  const navigate = useNavigate();

  const [data, setData] = React.useState(JSON.parse(localStorage.getItem("order")));
  const [Data, setdata] = React.useState(JSON.parse(localStorage.getItem("user")));
  const [item, setitem] = React.useState(data.item);
  const [quantity, setquantity] = useState("");
  const [total, settotal] = useState("0");
  const [add_on, setadd_on] = React.useState('');
  const [canteen2, setcanteen2] = React.useState(data.canteen1);
  const [price, setprice] = React.useState(data.price);
  const [email, setemail] = React.useState(Data.email);
  const [name, setname] = React.useState(Data.name);
  const [batch, setbatch] = React.useState(Data.year);
  const [age, setage] = React.useState(Data.age);
  var tr = "0";


  const handleChange = (event) => {

    if (ch == 0) {
      console.log(ch);
      settotal(parseInt(total) + parseInt(event.target.value.split(",")[1]));
      setadd_on(event.target.value);
      ch = 1;
    }
    else {
      console.log(ch);
      setadd_on(event.target.value);
    }
  };
  const [status, setstatus] = useState("");

  const onChangeitem = (event) => {
    setitem(event.target.value);
  };

  const onChangeemail = (event) => {
    setemail(event.target.value);
  };
  const onChangename = (event) => {
    setname(event.target.value);
  };
  const onChangebatch = (event) => {
    setbatch(event.target.value);
  };
  const onChangeage = (event) => {
    setage(event.target.value);
  };
  const onChangecanteen2 = (event) => {
    setcanteen2(event.target.value);
  };
  const onChangequantity = (event) => {

    settotal(data.price * event.target.value);
    setquantity(event.target.value);
  };

  const onChangetotal = (event) => {
    settotal(event.target.value);
  };
  const onChangeprice = (event) => {
    setprice(event.target.value);
  };

  const resetInputs = () => {
    settotal("");
    setquantity("0");
    setadd_on("");
    setstatus("");
  };

  const onSubmitfood = (event) => {
    var dt = new Date();

    var startTime = data.canteen_open+":00";
    var endTime = data.canteen_close+":00";
    console.log(startTime,endTime);
    
    var s =  startTime.split(':');
    var dt1 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), parseInt(s[0]), parseInt(s[1]), parseInt(s[2]));
    
    var e =  endTime.split(':');
    var dt2 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(),parseInt(e[0]), parseInt(e[1]), parseInt(e[2]));
    
    var value =  (dt >= dt1 && dt <= dt2) ? true : false;

    
    if (value) {
      event.preventDefault();
      var data3 = "Placed";
      setData(data.canteen1
      );
      setdata({
        email: Data.email,
        name: Data.name,
        year: Data.year,
        age: Data.age,
      });

      const newUser1 = {
        item: item,
        canteen2: canteen2,
        price: price,
        total: total,
        add_on: add_on,
        quantity: quantity,
        status: data3,
        email: email,
        name: name,
        batch: batch,
        age: age,
      };

      console.log(newUser1.name);
      axios
        .post("http://localhost:4000/buyfood/buy_reg", newUser1)
        .then((response) => {
          alert("Created\t" + response.data.name);
          console.log(response.data);

        });
      const newUser2 = {
        total: total,
        email: email,
      };

      axios
        .post("http://localhost:4000/user/old_monk", newUser2)
        .then((response) => {
          alert(response.data);
          console.log(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
        });
      resetInputs();

    }
else{
  alert("canteen is closed");
}
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
            label="item"
            variant="outlined"
            value={item}
            onChange={onChangeitem}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} style={{ minWidth: 225 }}>
            <Grid item xs={12}>
              <TextField
                label="Canteen"
                variant="outlined"
                defaultValue={canteen2}
                onChange={onChangecanteen2}
                inputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="price"
            variant="outlined"
            value={price}
            onChange={onChangeprice}
            inputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="email"
            variant="outlined"
            value={email}
            onChange={onChangeemail}
            inputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-number"
            label="Quantity"
            type="number"
            value={quantity}
            onChange={onChangequantity}
            InputProps={{ inputProps: { min: 1, max: 10 } }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} style={{ minWidth: 80 }}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 230 }}>
            <InputLabel id="demo-simple-select-standard-label">Add On</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={add_on}
              onChange={handleChange}
              label="Age"
            >
              <MenuItem value="none,0">
                None
              </MenuItem>
              <MenuItem value="extra masala,10">extra masala</MenuItem>
              <MenuItem value="extra cheese,10">extra cheese</MenuItem>
              <MenuItem value="extra butter,10">extra butter</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="total"
            variant="outlined"
            value={total}
            key={total}
            onChange={onChangetotal}
            inputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={onSubmitfood}>
            add to the menu
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
