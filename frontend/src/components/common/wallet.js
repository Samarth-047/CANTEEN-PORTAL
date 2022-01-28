import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import axios from "axios";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import { useNavigate } from "react-router-dom";

function RedBar() {

  return (
    <Box
      sx={{
        height: 20,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? 'rgba(255, 0, 0, 0.1)'
            : 'rgb(255 132 132 / 25%)',
      }}
    />
  );
}


export default function Profile() {
  const [data, setData] = React.useState(JSON.parse(localStorage.getItem("user")));
  const [updateData, setUpdateData] = React.useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();
  var wallet=null;
  
  const handleChange = (prop) => (event) => {
    if (data.wallet === "0") {      
      setUpdateData({ ...updateData, [prop]: event.target.value });
    }
    else {
      var cr = parseInt(event.target.value) + parseInt(data.wallet);
      setUpdateData({ ...updateData, [prop]: cr });
    }
  }

  const onUpdate = () => {
    setUpdateData({
      name: updateData.name,
      email: updateData.email,
      contact_number: updateData.contact_number,
      type: updateData.type,
      year: updateData.year,
      age: updateData.age,
      batch_number: updateData.batch_number,
      wallet: wallet,
    });

    setData({
      name: data.name,
      email: data.email,
      contact_number: data.contact_number,
      type: data.type,
      year: data.year,
      age: data.age,
      batch_number: data.batch_number,
      wallet: data.wallet,
    });

    console.log(updateData);
    localStorage.setItem('user', JSON.stringify(updateData));
    console.log(data);

    axios
      .post('http://localhost:4000/user/wallet', updateData)
      .then((res) => {
        console.log('Returned from routes: ', res);
        alert('money added successfully');
        localStorage.setItem('user', JSON.stringify(res.data));
        window.location.reload(false);
      });
  }

  return (
    <>
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
                Shop
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
              <Button color="success" variant="contained" >
                balance: {data.wallet}
              </Button>
              <Button color="inherit" onClick={() => navigate("/login")}>
                LOGOUT
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '& .MuiTextField-root': { width: '25ch' },
        }}
      >

        <Grid item xs={12}
          align={"center"}
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}>
          <div>
            <TextField
              id="outlined-read-only-input"
              label="Enter money to be added-"
              defaultValue={wallet}
              onChange={handleChange('wallet')}
            />
            <br />
            <br />
          </div>
          <Grid item xs={12}>
            <Button variant="contained" color="success" onClick={onUpdate} >
              ADD MONEY
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};