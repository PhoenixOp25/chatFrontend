import React, {Suspense, lazy,  useState } from 'react'
import { AppBar,Backdrop, Box, Toolbar, Typography,Tooltip,IconButton ,Badge} from '@mui/material'
import { orange } from '../constants/color'
import {
    Add as AddIcon,
    Menu as MenuIcon,
    Search as SearchIcon,
    Group as GroupIcon,
    Logout as LogoutIcon,
    Notifications as NotificationsIcon,
  } from "@mui/icons-material";
  import { useNavigate } from "react-router-dom";
 // import Backdrop from '@mui/material/Backdrop';



  const SearchDialog = lazy(() => import("../specific/Search"));
  const NotifcationDialog = lazy(() => import("../specific/Notification"));
  const NewGroupDialog = lazy(() => import("../specific/NewGroup"));


const Header = () => {
    const navigate = useNavigate();
    const [ismobile,setIsMobile]=useState(false);
    const [isSearch,setIsSerach]=useState(false);
    const [isNewGroup,setIsNewGroup]=useState(false);
    const [isNotification,setIsNotification]=useState(false);
    const handleMobile = () => {
        setIsMobile(!ismobile);

    };
    const openSearch = () => {
        setIsSerach((prev)=>!prev);
    };
    const openNewGroup = () => {
        setIsNewGroup((prev)=>!prev);
    };
    const openNotification = () => {
        setIsNotification((prev)=>!prev);
    };
    const logoutHandler= () => {
        console.log("logoutHandler");
    };
    const navigateToGroup = () => navigate("/groups");
  return (<>
  
  


  <Box sx={{ flexGrow: 1 }} height={"4rem"}>
    <AppBar  position="static"
          sx={{
            bgcolor: orange,
          }}>

            <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              Chat 
            </Typography>
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
              }}
            />

<Box>
              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearch}
              />

              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />

              <IconBtn
                title={"Manage Groups"}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />

              { <IconBtn
                title={"Notifications"}
                icon={<NotificationsIcon />}
                onClick={openNotification}
                //value={notificationCount}
              />
            }
              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              /> 
            </Box>
            </Toolbar>
          </AppBar>

  </Box>
  {isSearch && 
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      }

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotifcationDialog />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}

  </>
  );
};

const IconBtn = ({ title, icon, onClick, value }) => {
    return (
      <Tooltip title={title}>
        <IconButton color="inherit" size="large" onClick={onClick}>
          {icon}
        </IconButton>
      </Tooltip>
    );
  };

export default Header