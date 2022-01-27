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
  const handleChange = (prop) => (event) => {
    setUpdateData({ ...updateData, [prop]: event.target.value });
  }

  const onUpdate = () => {
    if (updateData.type === 'SELLER') {
      setData({
        name: updateData.name,
        email: updateData.email,
        contact_number: updateData.contact_number,
        type: updateData.type,
        year: updateData.year,
        age: updateData.age,
        batch_number: updateData.batch_number,
      });
    } else {

      setData({
        name: updateData.name,
        email: updateData.email,
        contact_number: updateData.contact_number,
        type: updateData.type,
        manager_name: updateData.manager_name,
        canteen: updateData.canteen,
      });
    }
    console.log(updateData);
    localStorage.setItem('user', JSON.stringify(updateData));
    console.log(data);

    axios
      .post('http://localhost:4000/user/profile', updateData)
      .then((res) => {
        console.log('Returned from routes: ', res);
        alert('Updated successfully');
        localStorage.setItem('user', JSON.stringify(res.data));
        window.location.reload(false);
      });
  }

  return (
    <>
      {data.type === "SELLER" &&
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
        </>
      }
      {data.type === "STUDENT" &&
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
                  ADD MONEY
                </Button>
                <Button color="success" variant="contained" >
                  balance: {data.wallet}
                </Button>
                <Button color="inherit" onClick={() => navigate("/login")}>
                  Log Out
                </Button>
              </Toolbar>
            </AppBar>
          </Box>
        </>
      }
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
        {data.type === "STUDENT" &&
          <Grid container spacing={2}>
            <Grid item xs={6}
              align={"center"}
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}>
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="Name"
                  defaultValue={data.name}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <br />
              </div>
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="email"
                  defaultValue={data.email}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <br />
              </div>
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="contact number"
                  defaultValue={data.contact_number}
                  InputProps={{
                    readOnly: true,
                  }}

                />
                <br />
              </div>
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="Type"
                  defaultValue={data.type}
                  InputProps={{
                    readOnly: true,
                  }}

                />
                <br />
              </div>
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="Year"
                  defaultValue={data.year}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <br />
              </div>
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="Age"
                  defaultValue={data.age}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <br />
              </div>
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="Year"
                  defaultValue={data.batch_number}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <br />
              </div>
            </Grid>
            <Grid item xs={6}
              align={"center"}
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}>
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="Name"
                  defaultValue={updateData.name}
                  onChange={handleChange('name')}
                />
                <br />
              </div>
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="email"
                  defaultValue={updateData.email}
                  onChange={handleChange('email')}
                />
                <br />
              </div>
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="contact number"
                  defaultValue={updateData.contact_bumber}
                  onChange={handleChange('contact_number')}

                />
                <br />
              </div>
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="Type"
                  defaultValue={updateData.type}
                  onChange={handleChange('type')}

                />
                <br />
              </div>
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="Year"
                  defaultValue={updateData.year}
                  onChange={handleChange('year')}
                />
                <br />
              </div>
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="Age"
                  defaultValue={updateData.age}
                  onChange={handleChange('age')}
                />
                <br />
              </div>
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="Year"
                  defaultValue={updateData.batch_number}
                  onChange={handleChange('batch_number')}
                />
                <br />
              </div>
              <Grid item xs={12}>
                <Button variant="contained" onClick={onUpdate} >
                  update
                </Button>
              </Grid>
            </Grid>
          </Grid>
        }
        {data.type === "SELLER" &&
          <Grid container spacing={2}>
            <Grid item xs={6}
              align={"center"}
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}>
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="Name"
                  defaultValue={updateData.name}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <br />
              </div>
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="email"
                  defaultValue={updateData.email}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <br />
              </div>
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="contact number"
                  defaultValue={updateData.contact_number}
                  InputProps={{
                    readOnly: true,
                  }}

                />
                <br />
              </div>

              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="Type"
                  defaultValue={updateData.type}
                  InputProps={{
                    readOnly: true,
                  }}

                />
                <br />
              </div>
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="Manager name"
                  defaultValue={updateData.manager_name}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <br />
              </div>
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="canteen"
                  defaultValue={updateData.canteen}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <br />
              </div>

            </Grid>
            <Grid item xs={6}
              align={"center"}
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}>
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="Name"
                  defaultValue={updateData.name}
                  onChange={handleChange('name')}
                />
                <br />
              </div>
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="email"
                  defaultValue={updateData.email}
                  onChange={handleChange('email')}
                />
                <br />
              </div>
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="contact number"
                  defaultValue={updateData.contact_number}
                  onChange={handleChange('contact_number')}

                />
                <br />
              </div>
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="Type"
                  defaultValue={updateData.type}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <br />
              </div>
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="Manager name"
                  defaultValue={updateData.manager_name}
                  onChange={handleChange('manager_name')}
                />

              </div>
              <br />
              <div>

                <FormControl style={{ minWidth: 240 }}>
                  <InputLabel id="demo-simple-select-label">Canteen</InputLabel>
                  <Select
                    label="Canteen"
                    variant="outlined"
                    value={updateData.canteen}
                    onChange={handleChange('canteen')}
                  >
                    <MenuItem value="VC">VC</MenuItem>
                    <MenuItem value="JC">JC</MenuItem>
                    <MenuItem value="BBC">BBC</MenuItem>
                  </Select>
                  <br />
                </FormControl>

              </div>
              <Grid item xs={12}>
                <Button variant="contained" onClick={onUpdate} >
                  update
                </Button>
              </Grid>

            </Grid>
          </Grid>

        }
      </Box>
    </>
  );
};