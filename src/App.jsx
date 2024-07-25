import React from "react";
import NavBar from "./components/navbar/NavBar";
import SideBar from "./components/sidebar/SideBar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/add/Add";
import List from "./pages/List/List";
import Orders from "./pages/orders/orders";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const url = String(import.meta.env.VITE_URL);
  return (
    <div>
      <ToastContainer />
      <NavBar />
      <hr />
      <div className="app-content">
        <SideBar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
