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
import { id } from "date-fns/locale";

const FoodList = (props) => {

    const [users, setUsers] = useState([]);
    const [data, setData] = React.useState(JSON.parse(localStorage.getItem("user")));
    const [sortedUsers, setSortedUsers] = useState([]);
    const [sortName, setSortName] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [checker, setch] = React.useState(data.email);




    useEffect(() => {
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
        setch(data.email);
        console.log(checker);
        console.log(data);
        axios
            .get("http://localhost:4000/buyfood")
            .then((response) => {
                setUsers(response.data);
                console.log(response.data);
                console.log(users);
                setSortedUsers(response.data);
                setSearchText("");
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const navigate = useNavigate();


    const onchanger = ({ id, status }) => {

        if (status === "READY FOR PICKUP") {
            status = "DELIVERED";
        }
        const newUser = {
            id: id,
            status: status,
        };

        axios
            .post("http://localhost:4000/buyfood/status_update", newUser)
            .then((response) => {
                // alert("Created\t" + response.data.name);
                console.log(response.data);
                window.location.reload(false);
            });

    };

    // const sortChange = () => {
    //     let usersTemp = users;
    //     const flag = sortName;
    //     usersTemp.sort((a, b) => {
    //         if (a.date != undefined && b.date != undefined) {
    //             return (1 - flag * 2) * (new Date(a.date) - new Date(b.date));
    //         } else {
    //             return 1;
    //         }
    //     });
    //     setUsers(usersTemp);
    //     setSortName(!sortName);
    // };

    // const customFunction = (event) => {
    //     console.log(event.target.value);
    //     setSearchText(event.target.value);
    // };

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
                            MENU
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
                    <Grid item xs={12} md={13} lg={13}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <TableRow>
                                        <TableCell> Index</TableCell>
                                        <TableCell> Item</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>canteen</TableCell>
                                        <TableCell>quantity</TableCell>
                                        <TableCell>Add on </TableCell>
                                        <TableCell>Total</TableCell>
                                        <TableCell>email</TableCell>
                                        <TableCell>status</TableCell>
                                        <TableCell>view</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user, ind) => (
                                        <TableRow key={ind}>
                                            {checker === user.email &&
                                                <>
                                                    <TableCell>{ind}</TableCell>
                                                    <TableCell>{user.item}</TableCell>
                                                    <TableCell>{user.price}</TableCell>
                                                    <TableCell>{user.canteen2}</TableCell>
                                                    <TableCell>{user.quantity}</TableCell>
                                                    <TableCell>{user.add_on}</TableCell>
                                                    <TableCell>{user.total}</TableCell>
                                                    <TableCell>{user.email}</TableCell>
                                                    <TableCell>{user.status}</TableCell>
                                                    <TableCell>
                                                        {user.status === "READY FOR PICKUP" &&
                                                            <>
                                                                <Button color="inherit" onClick={() => onchanger({ id: user._id, status: user.status })}>
                                                                    PICKUP
                                                                </Button>
                                                            </>
                                                        }
                                                    </TableCell>
                                                </>
                                            }
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                        <br />
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default FoodList;
