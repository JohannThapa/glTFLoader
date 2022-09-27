import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import './App.css';
import ThreeFiberTabs from './components/threeFiber';
import Applayout from './layout/mainLayout/header';

function App() {
  return (
    <BrowserRouter>
   <Routes>
        <Route path="/" element={<Applayout><ThreeFiberTabs /> </Applayout>} />
        {/* <Route path="users/*" element={<Users />} /> */}
      </Routes>
  </BrowserRouter>
  );
}

export default App;
