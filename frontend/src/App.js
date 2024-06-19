import React, { useState, useRef, useCallback } from 'react';
import MapComponent from './components/MapComponent';
import CaptureButton from './components/CaptureButton';
import Cuboid3D from './components/Cuboid3D';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [capturedImage, setCapturedImage] = useState(null);
  const mapRef = useRef(null);

  const setMapRef = useCallback((map) => {
    mapRef.current = map;
    console.log('Map reference set:', mapRef.current);
  }, []);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  if (!token) {
    return (
      <div className="App">
        <h1>Map Capture App</h1>
        <Login setToken={(token) => {
          setToken(token);
          localStorage.setItem('token', token);
        }} />
        <Register />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Map Capture App</h1>
      <button onClick={handleLogout}>Logout</button>
      <MapComponent setMapRef={setMapRef} />
      <CaptureButton mapRef={mapRef} setCapturedImage={setCapturedImage} />
      {capturedImage && (
        <div>
          <h2>Captured Image</h2>
          <img src={capturedImage} alt="Captured Map" />
        </div>
      )}
      <Cuboid3D capturedImage={capturedImage} />
    </div>
  );
}

export default App;
