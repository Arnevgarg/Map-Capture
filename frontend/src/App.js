import React, { useState, useRef, useCallback } from 'react';
import MapComponent from './components/MapComponent';
import CaptureButton from './components/CaptureButton';
import Cuboid3D from './components/Cuboid3D';
import Login from './components/Login';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      <div className="App container mt-5">
      <h1 className="mb-4">Map Capture App</h1>
      <div className="row">
        <div className="col-md-6">
          <Login setToken={(token) => {
            setToken(token);
            localStorage.setItem('token', token);
          }} />
        </div>
        <div className="col-md-6">
          <Register />
        </div>
      </div>
    </div>
    );
  }

  return (
    // <div className="App">
    //   <h1>Map Capture App</h1>
    //   <button onClick={handleLogout}>Logout</button>
    //   <MapComponent setMapRef={setMapRef} />
    //   <CaptureButton mapRef={mapRef} setCapturedImage={setCapturedImage} />
    //   {capturedImage && (
    //     <div>
    //       <h2>Captured Image</h2>
    //       <img src={capturedImage} alt="Captured Map" />
    //     </div>
    //   )}
    //   <Cuboid3D capturedImage={capturedImage} />
    // </div>
    <div className="App container mt-5">
      <h1 className="mb-4">Map Capture App</h1>
      <button className="btn btn-danger mb-3" onClick={handleLogout}>Logout</button>
      <div className="row">
        <div className="col-md-12 mb-3">
          <MapComponent setMapRef={setMapRef} />
        </div>
        <div className="col-md-12 mb-3">
          <CaptureButton mapRef={mapRef} setCapturedImage={setCapturedImage} />
        </div>
        {capturedImage && (
          <div className="col-md-12 mb-3">
            <h2>Captured Image</h2>
            <img src={capturedImage} alt="Captured Map" className="img-fluid" />
          </div>
        )}
        <div className="col-md-12">
          <Cuboid3D capturedImage={capturedImage} />
        </div>
      </div>
    </div>
  );
}

export default App;
