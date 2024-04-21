import React, {Suspense, lazy,  useState } from 'react'
import { AppBar,Backdrop, Box, Toolbar, Typography,Tooltip,IconButton ,Badge} from '@mui/material'
import { orange } from '../../constants/color'
import {
    Add as AddIcon,
    Menu as MenuIcon,
    Search as SearchIcon,
    Group as GroupIcon,
    Logout as LogoutIcon,
    Notifications as NotificationsIcon,
  } from "@mui/icons-material";
  import { useNavigate } from "react-router-dom";
import { server } from '../../constants/config';
import toast from 'react-hot-toast';
import { userNotExists } from '../../redux/reducers/auth';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
 // import Backdrop from '@mui/material/Backdrop';
import {setIsMobile, setIsNotification, setIsSearch} from "../../redux/reducers/misc.js"
import { resetNotificationCount } from '../../redux/reducers/chat.js';


  const SearchDialog = lazy(() => import("../specific/Search"));
  const NotifcationDialog = lazy(() => import("../specific/Notification"));
  const NewGroupDialog = lazy(() => import("../specific/NewGroup"));


const Header = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();


    const { isSearch,isNotification } = useSelector(
      (state) => state.misc
    );
    const {notificationCount}=useSelector((state)=>state.chat);


   // const [ismobile,setIsMobile]=useState(false);
    
    const [isNewGroup,setIsNewGroup]=useState(false);
    
    const handleMobile = () => {
        dispatch(setIsMobile(true));

    };
    const openSearch = () => {
        dispatch(setIsSearch(true));
    };
    const openNewGroup = () => {
        setIsNewGroup((prev)=>!prev);
    };
    const openNotification = () => {
        dispatch(setIsNotification(true));
        dispatch(resetNotificationCount)
    };
    const logoutHandler= async () => {
        //console.log("logoutHandler");
        try {
          const { data } = await axios.get(`${server}/api/v1/user/logout`, {
            withCredentials: true,
          });
          dispatch(userNotExists());
          toast.success(data.message);
        } catch (error) {
          toast.error(error?.response?.data?.message || "Something went wrong");
        }
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
                value={notificationCount}
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
          {value?<Badge badgeContent={value} color='error'>{icon}</Badge>:icon}
        </IconButton>
      </Tooltip>
    );
  };

export default Header