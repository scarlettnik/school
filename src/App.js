import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
                <Route exact path='/' Component={Login}></Route>
                <Route exact path='/home' Component={Home}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
