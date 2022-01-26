import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import * as React from 'react';

const Navbar = () => {
  // const navigate = useNavigate();
  // const [data, setData] = React.useState(JSON.parse(localStorage.getItem("user")));
  // if (data.type === 'SELLER') {
  //   setData({
  //     name: data.name,
  //     email: data.email,
  //     contact_number: data.contact_number,
  //     type: data.type,
  //     year: data.year,
  //     age: data.age,
  //     batch_number: data.batch_number,
  //   });
  // } else {

  //   setData({
  //     name: data.name,
  //     email: data.email,
  //     contact_number: data.contact_number,
  //     type: data.type,
  //     manager_name: data.manager_name,
  //     canteen: data.canteen,
  //   });
  // }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
                  Users
                </Button>
                <Button color="inherit" onClick={() => navigate("/register")}>
                  Register
                </Button>
                <Button color="inherit" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button color="inherit" onClick={() => navigate("/profile")}>
                  My Profile
                </Button>
                My Profile
              
            
          
          {/* {data.type === "STUDENTS" &&
            <>
              <Button color="inherit" onClick={() => navigate("/buyer")}>
                Users
              </Button>
              <Button color="inherit" onClick={() => navigate("/register")}>
                Register
              </Button>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/profile")}>
                My Profile
              </Button>
            </
          } */}
        </Toolbar>
        </AppBar >
    </Box >
  );
};

export default Navbar;
