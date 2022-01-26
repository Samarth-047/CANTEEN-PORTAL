import { useState, useEffect } from "react";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();


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
        </Toolbar>
      </AppBar>
    </Box>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1 >
          Welcome to Hunger Hub
        </h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
          <Button variant="contained" color="success" onClick={() => navigate("/login")}>
            Login
          </Button>
      </div>
      <br/>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button variant="contained" color="success" onClick={() => navigate("/register")}>
            Register
          </Button>
        
      </div>
    </>
  );
};

export default Home;
