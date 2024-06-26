import React,{Suspense, lazy, useEffect} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from './components/auth/ProtectRoute';
import NotFound from './pages/NotFound';
import { LayoutLoader } from './components/layout/Loaders';
import {server} from './constants/config'
//import AdminLogin from './pages/admin/AdminLogin';
const Home=lazy(()=>import("./pages/Home"))
const Login=lazy(()=>import("./pages/Login"))
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));

const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const MessagesManagement = lazy(() =>
  import("./pages/admin/MessageManagement")
);

import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { userExists, userNotExists } from './redux/reducers/auth';
import {Toaster} from "react-hot-toast"
//let user=true;
import {SocketProvider} from "./utils/socket"
function App() {
//, { withCredentials: true }{ data }dispatch(userExists(data.user)).
const { user, loader } = useSelector((state) => state.auth);
const dispatch = useDispatch();

  useEffect(() => {
  //console.log(server);
     axios
      .get(`${server}/api/v1/user/me`,{withCredentials:true})
      .then(({data}) => dispatch(userExists(data.user) ))
       .catch((err) =>dispatch(userNotExists()));
  }, [dispatch]);


  return loader ?(
    <LayoutLoader />
  ) : (
    <BrowserRouter>
    <Suspense fallback={<LayoutLoader/>} >
    <Routes>
    <Route element={<SocketProvider>
      <ProtectRoute user={user}/>
    </SocketProvider>}>
      <Route path="/" element={<Home/>}/>
    <Route path="/chat/:chatId" element={<Chat />} />
    <Route path="/groups" element={<Groups />} /> 
    </Route>
    
    <Route path="/login" element={
      <ProtectRoute user={!user} redirect='/'>
        <Login/>
      </ProtectRoute>
    } /> 

<Route path="/admin" element={<AdminLogin/>}/>
<Route path="/admin/dashboard" element={<Dashboard/>}/>
<Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/chats" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessagesManagement />} />

<Route path="*" element={<NotFound/>}/>

    </Routes>
    </Suspense>
    <Toaster position='bottom-centre' />
    </BrowserRouter>
  )
}

export default App