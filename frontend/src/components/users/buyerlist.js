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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';

const FoodList = (props) => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [min, set1] = useState("1");
  const [max, set2] = useState("50000");
  const [data, setUpdateData] = React.useState(JSON.parse(localStorage.getItem("user")));
  const [shop, setshop] = React.useState([]);
  const [rating, setrating] = useState("");
  const [tags, settags] = useState("");
  const [type, settype] = useState("");
  const theme = useTheme();
  const ITEM_HEIGHT = 48;
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
    'JC',
    'VC',
    'BBC',
  ];
  const onChangetype = (event) => {
    settype(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/food")
      .then((response) => {
        setUsers(response.data);
        // setSortedUsers(response.data);
        setSearchText("");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();

  const onChangetags = (event) => {
    settags(event.target.value);
  };
  const sortChange = () => {
    let usersTemp = users;
    const flag = sortName;
    usersTemp.sort((a, b) => {
      if (a.price != undefined && b.price != undefined) {
        return (1 - flag * 2) * (new Date(a.price) - new Date(b.price));
      } else {
        return 1;
      }
    });
    setUsers(usersTemp);
    setSortName(!sortName);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setshop(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

  };
  const handleChange1 = (event) => {
    console.log(min);
    set1(event.target.value);
  }
  const handleChange2 = (event) => {
    console.log(max);

    set2(event.target.value);
  }
  function getStyles(name, shop, theme) {
    return {
      fontWeight:
        shop.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const customFunction = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };
  const reffresher = () => {
    window.location.reload(false);
  };
  const rating_ = (event) => {
    console.log(event.target.value);
    setrating(event.target.value);
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
                <h2>Filters</h2>
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
                      Rate
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-basic"
                        label="Enter Min price"
                        fullWidth={true}
                        defaultValue={min}
                        onChange={handleChange1}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-basic"
                        label="Enter Max price"
                        fullWidth={true}
                        defaultValue={max}
                        onChange={handleChange2}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider />
                <FormControl sx={{ m: 1, width: 450 }}>
                  <InputLabel id="demo-multiple-name-label">Shop</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={shop}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, shop, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Divider />
                <Grid item xs={12} >
                  <FormControl sx={{ m: 1, width: 450 }}>
                    <InputLabel id="demo-simple-select-label">Tags</InputLabel>
                    <Select
                      label="Person"
                      variant="outlined"
                      value={tags}
                      onChange={onChangetags}
                    >
                      <MenuItem value="cheesy">cheesy</MenuItem>
                      <MenuItem value="sweet">sweet</MenuItem>
                      <MenuItem value="cold">cold</MenuItem>
                      <MenuItem value="hot">hot</MenuItem>
                      <MenuItem value="spicy">spicy</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Divider />
                <Grid item xs={12} >
                  <FormControl sx={{ m: 1, width: 450 }}>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      label="type"
                      variant="outlined"
                      value={type}
                      onChange={onChangetype}
                    >
                      <MenuItem value="VEG">VEG</MenuItem>
                      <MenuItem value="NON-VEG">NON-VEG</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Divider />
                <Grid item xs={12}>
                  <FormControl sx={{ m: 1, width: 450 }}>
                    <Button variant="contained" color="success" onClick={reffresher}>
                      CLEAR FILTER
                    </Button>
                  </FormControl>
                </Grid>
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
                      <TableCell>Price
                        <Button onClick={sortChange}>
                          {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                        </Button>
                      </TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Tags</TableCell>
                      <TableCell>Canteen</TableCell>
                      <TableCell>Add on 1</TableCell>
                      <TableCell>Add on 2</TableCell>
                      <TableCell>Add on 3</TableCell>
                      <TableCell>Add on 4</TableCell>
                    </TableRow>
                  </TableHead>
                  {/* {(searchText === "" || searchText !== "") && */}
                  <>
                    <TableBody>
                      {users.map((user, ind) => (
                        <TableRow key={ind + 1}>
                          {(searchText === "" || user.item.includes(searchText)) && (type === "" || user.type === type) && (tags === "" || user.food_tags.includes(tags)) && ((user.price >= min) && (user.price <= max)) &&
                            <>
                              <TableCell>{ind + 1}</TableCell>
                              <TableCell>{user.item}</TableCell>
                              <TableCell>{user.price}</TableCell>
                              <TableCell>{user.rating}</TableCell>
                              <TableCell>{user.type}</TableCell>
                              <TableCell>{user.food_tags}</TableCell>
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
                  {/* } */}
                  {/* { &&
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
                  } */}
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
