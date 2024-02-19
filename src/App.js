/* eslint-disable react/jsx-pascal-case */
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nave_24 from "./Component/users/Nave_24";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Contact from "./Pages/Contact";
import Services from "./Pages/Services";
import { ToastContainer } from "react-toastify";
// import DashBoard from "./Pages/Dash_Board";
import Profile from "./Pages/Users/Profile";

import UserProvider from "./Context/users.provider";
import Home from "./Pages/Users/Home";
import Dash_Board from "./Pages/Dash_Board";
import AdminDashBoard from "./Pages/Admin/AdminDashBoard";
import HomeAdmin from "./Pages/Admin/Home";
import AddProduct from "./Pages/Admin/AddProduct";
import AddCategory from "./Pages/Admin/AddCategory";
import ViewCategories from "./Pages/Admin/ViewCategories";
import ViewProduct from "./Pages/Admin/ViewProduct";
import AdminOrders from "./Pages/Admin/AdminOrders";
import AdminUsers from "./Pages/Admin/AdminUsers";

function App() {
  return (
    <>
     <ToastContainer />
     <UserProvider> 
      <Nave_24 />
      <BrowserRouter>
     
        <Routes>
        <Route exact path="/" element={<About/>} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/services" element={<Services />} />

               <Route path="/users" element={<Dash_Board/>}>
              <Route path="homenew" element={<Home/>} />
              <Route path="profile/:userId" element={<Profile />} />
            </Route>

            <Route path="/admin" element={<AdminDashBoard/>}>
            <Route path="home" element={<HomeAdmin/>} />
            <Route path="add-product" element={<AddProduct/>} />
            <Route path="add-category" element={<AddCategory/>} />
            <Route path="categories" element={<ViewCategories/>} />
            <Route path="products" element={<ViewProduct/>} />
            <Route path="orders" element={<AdminOrders/>} />
            <Route path="users" element={<AdminUsers/>} />
            </Route>
        </Routes>
      
      </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
