//import logo from './logo.svg';
//import './App.css';
import {React} from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Home from "./components/home.jsx";
import { MusicProvider } from "./components/context/MusicCont.jsx";
import Login from "./components/login.jsx";
import Signup from './components/signup.jsx';
import { ToastContainer } from "react-toastify";
import ADSignup from './admin/signup.jsx';
import ADLogin from './admin/login.jsx'; 
import Dashboard from "./admin/Dashboard.jsx"
import SongList from "./admin/song-list.jsx";

import ProtectedRoute from "./components/protected.jsx";


function App() {
  const isAuthenticated = !!localStorage.getItem("token");
  console.log("APP MODULE LOADED");


  return (
    <div className='app'>
      


<MusicProvider>
    
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home name="Amit"/>} />
        <Route path="/admin-signup" element={<ADSignup/>} />
        <Route path="/admin-login" element={ <ADLogin />} />
        {/* <Route path="/admin-dashboard" element={<Dashboard /> } /> */}
                        <Route path="/admin-dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/song-list" element={<SongList /> } />

      </Routes>
    
    <ToastContainer position="top-center" autoClose={2000} />
    </MusicProvider>

    </div>
  );
}

export default App;
