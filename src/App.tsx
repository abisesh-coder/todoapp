import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import { Navigate, Route,BrowserRouter as Router, Routes } from "react-router-dom";
import AddTodo from "./pages/AddTodo";
import NewHome from "./pages/NewHome";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (

    <Router>
      
      <Routes>
      
      
         {/*<Route exact path="/" component={Home} />*/}
        <Route path="/add" element={<AddTodo/>} />
        <Route path="/new" element={<NewHome/>} />
        {/*<Navigate from="/" to="/new" />*/}
        <Route path="/" element={<Navigate replace to="/new" />} />
        </Routes>
      
    </Router>
      
  

  );
}

export default App;
