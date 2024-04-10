import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Drawer,
    Grid,
    IconButton,
    Stack,
    TextField,
    Tooltip,
    Typography,
  } from "@mui/material"
  import React, { Suspense, lazy, memo, useEffect, useState } from "react";
  import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Done as DoneIcon,
    Edit as EditIcon,
    KeyboardBackspace as KeyboardBackspaceIcon,
    Menu as MenuIcon,
  } from "@mui/icons-material";
  import { bgGradient, matBlack } from "../components/constants/color";
  import { useNavigate, useSearchParams } from "react-router-dom";


  


  const Groups=()=>{
const navigate = useNavigate();

const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigateBack=()=>{
      navigate("/")
    }
    const handleMobile=()=>{
      setIsMobileMenuOpen((prev) => !prev);
    }
    const handleMobileClose = () => setIsMobileMenuOpen(false);
    const IconBtns = (
      <>
        <Box
          sx={{
            display: {
              xs: "block",
              sm: "none",
              position: "fixed",
              right: "1rem",
              top: "1rem",
            },
          }}
        >
          <IconButton onClick={handleMobile}>
            <MenuIcon />
          </IconButton>
        </Box>
  
        <Tooltip title="back">
          <IconButton
            sx={{
              position: "absolute",
              top: "2rem",
              left: "2rem",
              bgcolor: matBlack,
              color: "white",
              ":hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
            }}
            onClick={navigateBack}
          >
            <KeyboardBackspaceIcon />
          </IconButton>
        </Tooltip>
      </>
    );



    return <Grid container height={"100vh"}>
        <Grid item sx={{
            xs:"none",
            sm:"block",
        }}
        sm={4}
        bgcolor={"bisque"}>
            Groups list
        </Grid>
        <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}

         </Grid>
         <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        addp
        {/* <GroupsList
          w={"50vw"}
          myGroups={myGroups?.data?.groups}
          chatId={chatId}
        /> */}
      </Drawer>
    </Grid>
  };
  export default Groups;