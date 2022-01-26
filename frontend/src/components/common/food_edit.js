import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

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
    const [data, setData] = React.useState(JSON.parse(localStorage.getItem("food_edit")));
    const [updateData, setUpdateData] = React.useState(JSON.parse(localStorage.getItem("food_edit")));
    const navigate = useNavigate();
    const handleChange = (prop) => (event) => {
        setUpdateData({ ...updateData, [prop]: event.target.value });
    }

    const onUpdate = () => {

        setData({
            item: data.item,
            price: data.price,
            rating: data.rating,
            type: data.type,
            canteen1: data.canteen1,
            food_tags: data.food_tags,
            add_on1: data.add_on1,
            add_on2: data.add_on2,
            add_on3: data.add_on3,
            add_on4: data.add_on4,
        });
        setUpdateData({
            item: updateData.item,
            price: updateData.price,
            rating: updateData.rating,
            type: updateData.type,
            canteen1: updateData.canteen1,
            food_tags: updateData.food_tags,
            add_on1: updateData.add_on1,
            add_on2: updateData.add_on2,
            add_on3: updateData.add_on3,
            add_on4: updateData.add_on4,
        });

        // console.log(updateData);
        localStorage.setItem('food_edit', JSON.stringify(updateData));
        // console.log(data);

        axios
            .post('http://localhost:4000/food/food_edit', updateData)
            .then((res) => {
                console.log('Returned from routes: ', res);
                alert('Updated successfully');
                localStorage.setItem('food_edit', JSON.stringify(res.data));
                window.location.reload(false);
                // navigate("/users");
            });
    }

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
                            Shop
                        </Button>
                        <Button color="inherit" onClick={() => navigate("/register")}>
                            Register
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
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    '& .MuiTextField-root': { width: '25ch' },
                }}
            >
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
                                label="item"
                                defaultValue={data.item}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <br />
                        </div>
                        <div>
                            <TextField
                                id="outlined-read-only-input"
                                label="Price"
                                defaultValue={data.price}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <br />
                        </div>
                        <div>
                            <TextField
                                id="outlined-read-only-input"
                                label="Rating"
                                defaultValue={data.rating}
                                InputProps={{
                                    readOnly: true,
                                }}

                            />
                            <br />
                        </div>
                        <div>
                            <TextField
                                id="outlined-read-only-input"
                                label="Canteen"
                                defaultValue={data.canteen1}
                                InputProps={{
                                    readOnly: true,
                                }}

                            />
                            <br />
                        </div>
                        <div>
                            <TextField
                                id="outlined-read-only-input"
                                label="Tags"
                                defaultValue={data.food_tags}
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
                                label="Add on 1"
                                defaultValue={data.add_on1}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <br />
                        </div>
                        <div>
                            <TextField
                                id="outlined-read-only-input"
                                label="Add on 2"
                                defaultValue={data.add_on2}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <br />
                        </div>
                        <div>
                            <TextField
                                id="outlined-read-only-input"
                                label="Add on 3"
                                defaultValue={data.add_on3}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <br />
                        </div>
                        <div>
                            <TextField
                                id="outlined-read-only-input"
                                label="Add on 4"
                                defaultValue={data.add_on4}
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
                                label="item"
                                defaultValue={updateData.item}
                                onChange={handleChange('item')}
                            />
                            <br />
                        </div>
                        <div>
                            <TextField
                                id="outlined-read-only-input"
                                label="price"
                                defaultValue={updateData.price}
                                onChange={handleChange('price')}
                            />
                            <br />
                        </div>
                        <div>
                            <TextField
                                id="outlined-read-only-input"
                                label="Rating"
                                defaultValue={updateData.rating}
                                onChange={handleChange('rating')}

                            />
                            <br />
                        </div>
                        <div>
                            <TextField
                                id="outlined-read-only-input"
                                label="canteen"
                                defaultValue={updateData.canteen1}
                                onChange={handleChange('canteen1')}
                            />
                            <br />
                        </div>
                        <div>
                            <TextField
                                id="outlined-read-only-input"
                                label="food tags"
                                defaultValue={updateData.food_tags}
                                onChange={handleChange('food_tags')}
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
                                label="Add on 1"
                                defaultValue={updateData.add_on1}
                                onChange={handleChange('add_on1')}
                            />

                        </div>
                        <div>
                            <TextField
                                id="outlined-read-only-input"
                                label="Add on 2"
                                defaultValue={updateData.add_on2}
                                onChange={handleChange('add_on2')}
                            />

                        </div>
                        <div>
                            <TextField
                                id="outlined-read-only-input"
                                label="Add on 3"
                                defaultValue={updateData.add_on3}
                                onChange={handleChange('add_on3')}
                            />

                        </div>
                        <div>
                            <TextField
                                id="outlined-read-only-input"
                                label="Add on 4"
                                defaultValue={updateData.add_on4}
                                onChange={handleChange('add_on4')}
                            />

                        </div>
                        <br />
                        <Grid item xs={12}>
                            <Button variant="contained" onClick={onUpdate} >
                                update
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>
            </Box>
        </>
    );
};