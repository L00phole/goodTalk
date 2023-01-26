import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Router>
        <div>
          <Header />
          <div className="bg-cyan-100 w-full h-screen">
            <Routes>
              <Route path="/" element={<MyPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
