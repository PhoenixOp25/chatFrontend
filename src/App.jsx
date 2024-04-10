import React,{Suspense, lazy} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from './components/auth/ProtectRoute';
import NotFound from './pages/NotFound';
import { LayoutLoader } from './components/layout/Loaders';
//import AdminLogin from './pages/admin/AdminLogin';
const Home=lazy(()=>import("./pages/Home"))
const Login=lazy(()=>import("./pages/Login"))
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));

let user=true;

function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<LayoutLoader/>} >
    <Routes>
    <Route element={<ProtectRoute user={user}/>}>
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

<Route path="*" element={<NotFound/>}/>

    </Routes>
    </Suspense>
    </BrowserRouter>
  )
}

export default App