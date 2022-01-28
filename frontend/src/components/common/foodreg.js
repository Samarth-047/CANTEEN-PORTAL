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
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
var extra = "0";

const Register = (props) => {

  const ITEM_HEIGHT = 48;
  const [data, setData] = React.useState(JSON.parse(localStorage.getItem("user")));
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = [
    'spicy',
    'cheesy',
    'sweet',
    'cold',
    'drinks',
  ];
  const navigate = useNavigate();


  function getStyles(name, food_tags, theme) {
    return {
      fontWeight:
        food_tags.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const [item, setitem] = useState("");
  const [price, setprice] = useState("");
  const [rating, setrating] = useState("");
  const [type, settype] = useState("");
  const [add_on1, setadd_on1] = useState("");
  const [add_on2, setadd_on2] = useState("");
  const [add_on3, setadd_on3] = useState("");
  const [add_on4, setadd_on4] = useState("");
  const [canteen1, setcanteen1] = React.useState(data.canteen);
  const theme = useTheme();
  const [food_tags, setfood_tags] = React.useState([]);

  const onChangeitem = (event) => {
    setitem(event.target.value);
  };

  const onChangeprice = (event) => {
    if(parseInt(event.target.value)>0){
    setprice(event.target.value);
    }
    else{
      alert("Invalid price entered");
    }
  };

  const onChangerating = (event) => {
    setrating(event.target.value);
  };

  const onChangetype = (event) => {
    settype(event.target.value);
  };

  const onChangeadd_on1 = (event) => {
    setadd_on1(event.target.value);
  };
  const onChangeadd_on2 = (event) => {
    setadd_on2(event.target.value);
  };
  const onChangeadd_on3 = (event) => {
    setadd_on3(event.target.value);
  };
  const onChangeadd_on4 = (event) => {
    setadd_on4(event.target.value);
  };
  const onChangecanteen1 = (event) => {
    setcanteen1(event.target.value);
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setfood_tags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChange1 = (event) => {
   

    setadd_on1(event.target.value);
  };
  const handleChange2 = (event) => {
    console.log(event.target.value);

    setadd_on2(event.target.value);
  };
  const handleChange3 = (event) => {
    console.log(event.target.value);

    setadd_on3(event.target.value);
  };
  const handleChange4 = (event) => {
    console.log(event.target.value);

    setadd_on4(event.target.value);
  };
  function refreshPage() {
    window.location.reload(false);
  };



  const resetInputs = () => {
    setitem("");
    setprice("");
    setrating("0");
    settype("");
    setfood_tags("");
    setadd_on1("");
    setadd_on2("");
    setadd_on3("");
    setadd_on4("");
  };

  const onSubmitfood = (event) => {
    event.preventDefault();
    setData(data.canteen
    );

    const newUser1 = {
      item: item,
      price: price,
      type: type,
      rating: rating,
      canteen1: canteen1,
      food_tags: food_tags.join(','),
      add_on1: add_on1,
      add_on2: add_on2,
      add_on3: add_on3,
      add_on4: add_on4,
      canteen_open:data.canteen_open,
      canteen_close:data.canteen_close,
    };
    console.log(newUser1);
    console.log(data);
    axios
      .post("http://localhost:4000/food/foodadd", newUser1)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
        window.location.reload(false);
        navigate("/users");
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
            <Button color="inherit" onClick={() => navigate("/users")}>
              MENU
            </Button>
            <Button color="inherit" onClick={() => navigate("/profile")}>
              My Profile
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
          <TextField
            label="price"
            variant="outlined"
            value={price}
            onChange={onChangeprice}
          />
        </Grid>
        <Grid item xs={12} style={{ minWidth: 225 }}>
          <TextField
            label="rating"
            variant="outlined"
            value={rating}
            onChange={onChangerating}
          />
        </Grid>
        <Grid item xs={12} >
          <Grid item xs={12} style={{ minWidth: 225 }}>
            <TextField
              label="Canteen"
              variant="outlined"
              value={canteen1}
              onChange={onChangecanteen1}
              inputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} >
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                label="Person"
                variant="outlined"
                value={type}
                onChange={onChangetype}
              >
                <MenuItem value="VEG">VEG</MenuItem>
                <MenuItem value="NON-VEG">NON-VEG</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <div>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Tags</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={food_tags}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, food_tags, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={12} style={{ minWidth: 225 }}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 230 }}>
            <InputLabel id="demo-simple-select-standard-label">Add on 1</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={add_on1}
              onChange={handleChange1}
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="extra masala,10">extra masala</MenuItem>
              <MenuItem value="extra cheese,10">extra cheese</MenuItem>
              <MenuItem value="extra butter,10">extra butter</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} style={{ minWidth: 225 }}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 230 }}>
            <InputLabel id="demo-simple-select-standard-label">Add on 2</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={add_on2}
              onChange={handleChange2}
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="extra masala,10">extra masala</MenuItem>
              <MenuItem value="extra cheese,10">extra cheese</MenuItem>
              <MenuItem value="extra butter,10">extra butter</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} style={{ minWidth: 225 }}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 230 }}>
            <InputLabel id="demo-simple-select-standard-label">Add on 3</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={add_on3}
              onChange={handleChange3}
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="extra masala,10">extra masala</MenuItem>
              <MenuItem value="extra cheese,10">extra cheese</MenuItem>
              <MenuItem value="extra butter,10">extra butter</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} style={{ minWidth: 225 }}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 230 }}>
            <InputLabel id="demo-simple-select-standard-label">Add on 4</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={add_on4}
              onChange={handleChange4}
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="extra masala,10">extra masala</MenuItem>
              <MenuItem value="extra cheese,10">extra cheese</MenuItem>
              <MenuItem value="extra butter,10">extra butter</MenuItem>
            </Select>
          </FormControl>
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
