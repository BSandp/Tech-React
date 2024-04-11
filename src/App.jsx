import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Example from "./components/example";
import Footer from "./components/footer";
import Header from "./components/header";
import UserList from "./components/user/userList";
import Login from "./components/auth/login";
import UserFormCreate from "./components/user/userFormCreate";
import UserFormEdit from "./components/user/userFormEdit";
import HouseFormCreate from "./components/house/HouseFormCreate";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./features/authSlice";
import PrivateRoute from "./components/privateRoute";
import Chat from "./components/chat/Chat";


import { useEffect } from "react";
import changePassword from "./components/auth/changePassword";
import Home from "./components/Home";

function App() {
  
  
  const dispatch = useDispatch();

  useEffect(() => {
    const sessionData = localStorage.getItem('sessionData');
    if(sessionData) {
      dispatch(loginSuccess(JSON.parse(sessionData)))      
    }
  })

  return (
    <>      
      <BrowserRouter>
        <Header />
        <Routes>
        <Route path="/" element={<PrivateRoute Component={Home} />} />
        {/* Rutas usuarios */}
          <Route path="/user" element={<PrivateRoute Component={UserList} />} />
          <Route path="/user/:id" element={<PrivateRoute Component={UserFormEdit} />} />
          <Route path="/change-password" element={<PrivateRoute Component={changePassword} />} />

          {/* ruta del chat  */}
          <Route path="/chat" element={<PrivateRoute Component={Chat} />} />

          {/* Rutas casas */}
          <Route path="/create-house" element={<PrivateRoute Component={HouseFormCreate} />} />

          {/* rutas publicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/create-user" element={<UserFormCreate />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;