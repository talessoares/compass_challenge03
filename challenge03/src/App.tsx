import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import RestaurantPage from "./pages/RestaurantPage";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<> <HomePage /> <Footer /> </>} />
        <Route path="/login" element={<> <LoginPage /> <Footer /> </>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/restaurant" element={<RestaurantPage />} />
        <Route path="/restaurant/:id" element={<> <RestaurantPage /> <Footer /> </>}  />
      </Routes>
    </Router>
  );
}

export default App;
