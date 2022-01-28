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
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    BarSeries,
} from '@devexpress/dx-react-chart-material-ui';

const FoodList = (props) => {
    const [users, setUsers] = useState([]);
    // const [data, setData] = React.useState(JSON.parse(localStorage.getItem("user")));
    const [sortedUsers, setSortedUsers] = useState([]);
    const [sortName, setSortName] = useState(true);
    const [searchText, setSearchText] = useState("");
    // const [checker, setch] = React.useState(data.canteen);
    let o_pl = 0;
    let o_c = 0;
    let o_pd = 0;
    let data1 = [];
    let data2 = [];
    const freq = new Map();
    const freq1 = new Map();
    const freq2 = new Map();



    useEffect(() => {
        // setData(data.canteen
        // );
        // setch(data.canteen);
        // console.log(checker);
        // console.log(data);
        axios
            .get("http://localhost:4000/buyfood")
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
            <div>
                <Grid container>
                    <Grid item xs={12} md={13} lg={13}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <br />
                                    <br />
                                    <TableRow>
                                        <TableCell> Order placed</TableCell>
                                        <TableCell> Order pending</TableCell>
                                        <TableCell>Order completed</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.forEach((user, ind) => {

                                        if (user.status == "DELIVERED") { o_c++; }
                                        if (user.status == "Placed") { o_pl++; }
                                        if (user.status == "COOKING" || user.status == "READY FOR PICKUP") { o_pd++; }
                                        if (user.status == "DELIVERED") {
                                            var a = freq1.get(user.batch);
                                            var b = freq2.get(user.age);
                                            if (a === undefined) { a = 0; }
                                            freq1.set(user.batch, a + 1);
                                            if (b === undefined) { b = 0; }
                                            freq2.set(user.age, b + 1);
                                            data1.push({
                                                argument: user.batch,
                                                value: freq1.get(user.batch)
                                            })
                                            data2.push({
                                                argument: user.age,
                                                value: freq2.get(user.age),
                                            })
                                        }
                                    })}
                                    <>
                                        <TableCell>{o_pl}</TableCell>
                                        <TableCell>{o_pd}</TableCell>
                                        <TableCell>{o_c}</TableCell>
                                    </>
                                </TableBody>
                            </Table>
                        </Paper>
                        <br />
                    </Grid>
                    <Grid item xs={12}
                        align={"center"}
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { mx: 5, width: '25ch' },
                        }}
                    >
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <br />
                                    <br />
                                    <TableRow>
                                        <TableCell> Food name</TableCell>
                                        <TableCell> Number of order</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.forEach((user, ind) => {
                                        var t = freq.get(user.item);
                                        if (t === undefined) { t = 0; }
                                        freq.set(user.item, t + 1);

                                    })}
                                    {
                                        (Array
                                            .from(freq.entries(), ([k, v]) => [k, v]))
                                            .sort((a, b) => (b[1] - a[1]))
                                            .filter((val, i) => { if (i < 5) return val; })
                                            .map((ele) => (
                                                <TableRow>
                                                    <TableCell>{ele[0]}</TableCell>
                                                    <TableCell>{ele[1]}</TableCell>
                                                </TableRow>)
                                            )
                                    }
                                </TableBody>
                            </Table>
                        </Paper>
                        <br />
                    </Grid>
                </Grid>
                {console.log(freq)}
                {console.log(freq1)}
                {console.log(freq2)}
                <Grid>
                    <h1>BATCH VS ORDERS COMPLETED</h1>
                    <Grid spacing={1} direction='column' style={{ alignContent: "center" }}>
                        <Chart style={{ height: "100px", width: "500px"}} data={data1}>
                            <ArgumentAxis>
                            </ArgumentAxis>
                            <ValueAxis />
                            <BarSeries valueField="value" argumentField="argument" />
                        </Chart>
                        <h1>AGE VS ORDERS COMPLETED</h1>
                        <Chart style={{ height: "100px", width: "500px" }} data={data2}
                        >
                            <ArgumentAxis />
                            <ValueAxis />
                            <BarSeries valueField="value" argumentField="argument" />
                        </Chart>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default FoodList;
