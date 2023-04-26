import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Chat from "./pages/Chat";
import Error from "./pages/Error";
import Register from "./pages/Register";
import { ChatProvider } from './context/ChatProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => (
  <div>
    <BrowserRouter>
      <Header />
      <div className="bg-cyan-100 w-full h-screen">
        <ChatProvider>
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <ToastContainer position="top-center" />
        </ChatProvider>
      </div>
    </BrowserRouter>
  </div>
);

export default App;
