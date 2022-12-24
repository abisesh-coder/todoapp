import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { Route,BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddTodo from "./pages/AddTodo";


function App() {
  return (
    <Router>
      
    <Routes>
    
    
      <Route path="/" element={<Home/>} />
      <Route path="/add" element={<AddTodo/>} />
      </Routes>
    
  </Router>
   
  );
}

export default App;
