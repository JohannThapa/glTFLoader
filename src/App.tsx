import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import GltfLoaderFiber from './components/threeFiber/gltfLoader';
import GltfViewer from './components/threeJs/gltfLoader';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GltfLoaderFiber />} />
        <Route path="threejs/*" element={<GltfViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
