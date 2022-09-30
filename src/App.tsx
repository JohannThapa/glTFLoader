import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import MainLoader from './components/mainLoader';
import GltfLoaderFiber from './components/threeFiber/gltfLoader';
import GltfLoaderCore from './components/threeJs/gltfLoader';
import GltfX from './components/threeJs/gltfLoader/components/loader';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLoader />} />
        <Route path="threejs/*" element={<GltfLoaderCore />} />
        <Route path="core/*" element={<GltfX />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
