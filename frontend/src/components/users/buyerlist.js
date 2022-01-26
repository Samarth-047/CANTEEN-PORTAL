import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const FoodList = (props) => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/food")
      .then((response) => {
        setUsers(response.data);
        setSortedUsers(response.data);
        setSearchText("");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();


  const sortChange = () => {
    let usersTemp = users;
    const flag = sortName;
    usersTemp.sort((a, b) => {
      if (a.date != undefined && b.date != undefined) {
        return (1 - flag * 2) * (new Date(a.date) - new Date(b.date));
      } else {
        return 1;
      }
    });
    setUsers(usersTemp);
    setSortName(!sortName);
  };

  const customFunction = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
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
      <div>
        <Grid container>
          <Grid item xs={12} md={3} lg={3}>
            <List component="nav" aria-label="mailbox folders">
              <ListItem text>
                <h1>Filters</h1>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={9} lg={9}>
            <List component="nav" aria-label="mailbox folders">
              <TextField
                id="standard-basic"
                label="Search"
                fullWidth={true}
                value={searchText}
                onChange={customFunction}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              // onChange={customFunction}
              />
            </List>
          </Grid>
        </Grid>
        {
          <Grid container>
            <Grid item xs={12} md={3} lg={3}>
              <List component="nav" aria-label="mailbox folders">
                <ListItem>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      Salary
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-basic"
                        label="Enter Min"
                        fullWidth={true}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-basic"
                        label="Enter Max"
                        fullWidth={true}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider />
                <ListItem divider>
                  <Autocomplete
                    id="combo-box-demo"
                    options={users}
                    getOptionLabel={(option) => option.name}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Names"
                        variant="outlined"
                      />
                    )}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={9} lg={9}>
              <Paper>
                <Table size="small">
                  <TableHead>
                    <Button variant="contained" onClick={() => navigate("/placesearch")}>
                      Place order
                    </Button>

                    <br />
                    <br />
                    <br />
                    <br />
                    <TableRow>
                      <TableCell> Index</TableCell>
                      <TableCell> Item</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Canteen</TableCell>
                      <TableCell>Add on 1</TableCell>
                      <TableCell>Add on 2</TableCell>
                      <TableCell>Add on 3</TableCell>
                      <TableCell>Add on 4</TableCell>
                    </TableRow>
                  </TableHead>
                  {searchText !== "" &&
                    <>
                      <TableBody>
                        {users.map((user, ind) => (
                          <TableRow key={ind}>
                            {user.item.includes(searchText) &&
                              <>
                                <TableCell>{ind}</TableCell>
                                <TableCell>{user.item}</TableCell>
                                <TableCell>{user.price}</TableCell>
                                <TableCell>{user.rating}</TableCell>
                                <TableCell>{user.type}</TableCell>
                                <TableCell>{user.canteen1}</TableCell>
                                <TableCell>{user.add_on1}</TableCell>
                                <TableCell>{user.add_on2}</TableCell>
                                <TableCell>{user.add_on3}</TableCell>
                                <TableCell>{user.add_on4}</TableCell>
                              </>
                            }
                          </TableRow>
                        ))}
                      </TableBody>
                    </>
                  }
                  {searchText === "" &&
                    <>
                      <TableBody>
                        {users.map((user, ind) => (
                          <TableRow key={ind}>
                            
                              <>
                                <TableCell>{ind}</TableCell>
                                <TableCell>{user.item}</TableCell>
                                <TableCell>{user.price}</TableCell>
                                <TableCell>{user.rating}</TableCell>
                                <TableCell>{user.type}</TableCell>
                                <TableCell>{user.canteen1}</TableCell>
                                <TableCell>{user.add_on1}</TableCell>
                                <TableCell>{user.add_on2}</TableCell>
                                <TableCell>{user.add_on3}</TableCell>
                                <TableCell>{user.add_on4}</TableCell>
                              </>
                            
                          </TableRow>
                        ))}
                      </TableBody>
                    </>
                  }
                </Table>
              </Paper>
              <br />
            </Grid>
          </Grid>
        }
      </div>
    </>
  );
};

export default FoodList;
