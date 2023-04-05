import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import Register from "./pages/Register";
import ChatProvider from './context/ChatProvider';

const App = () => (
  <div>
    <BrowserRouter>
      <Header />
      <div className="bg-cyan-100 w-full h-screen">
        <ChatProvider>
          <Routes>
            <Route path="/" element={<MyPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </ChatProvider>
      </div>
    </BrowserRouter>
  </div>
);

export default App;
