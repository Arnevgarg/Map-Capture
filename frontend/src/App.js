import React, { useState, useRef, useCallback } from 'react';
import MapComponent from './components/MapComponent';
import CaptureButton from './components/CaptureButton';
import Cuboid3D from './components/Cuboid3D';
import './App.css';

function App() {
  const [capturedImage, setCapturedImage] = useState(null);
  const mapRef = useRef(null);

  const setMapRef = useCallback((map) => {
    mapRef.current = map;
    console.log('Map reference set:', mapRef.current);
  }, []);

  return (
    <div className="App">
        <h1>Map Capture App</h1>
      {/* <MapComponent setMapRef={(map) => mapRef.current = map} />
      <CaptureButton mapRef={mapRef.current} setCapturedImage={setCapturedImage} /> */}
      <MapComponent setMapRef={setMapRef} />
      <CaptureButton mapRef={mapRef} setCapturedImage={setCapturedImage} />
      {capturedImage && (
        <div>
          <h2>Captured Image</h2>
          <img src={capturedImage} alt="Captured Map" />
          {/* <img src={`data:image/png;base64,${capturedImage}`} alt="Captured Map" /> */}
        </div>
      )}
      <Cuboid3D capturedImage={capturedImage} />
    </div>
  );
}

export default App;
