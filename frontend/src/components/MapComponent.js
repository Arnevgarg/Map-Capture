// import React, { useCallback } from 'react'; // { useState, useCallback } was before
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// const center = {
//   lat: -3.745,
//   lng: -38.523
// };

// function MapComponent({ setMapRef }) {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: 'AIzaSyA2-XGn_Hrg11RdJx6L7jgIoxVKeMBg6Yo'
//   });

//   //const [map, setMap] = useState(null);

//   const onLoad = useCallback((map) => {
//     console.log('Map loaded:', map);
//     //setMap(map);
//     setMapRef(map);
//   }, [setMapRef]);

//   const onUnmount = useCallback((map) => {
//     setMapRef(null); // changed setMap(null) to this and added [setMapRef].  earlier it was just [].
//   }, [setMapRef]);

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={10}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//     >
//       { /* Child components, such as markers, info windows, etc. */ }
//       <></>
//     </GoogleMap>
//   ) : <></>;
// }

// export default React.memo(MapComponent);

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const center = [48.1500327, 11.5753989];
const zoom = 10;
const myAPIKey = 'dd7c10c6f5814de2ba305d22f701d035';

function SetViewOnClick({ setMapRef }) {
  const map = useMap();
  useEffect(() => {
    setMapRef(map);
  }, [map, setMapRef]);

  return null;
}

function MapComponent({ setMapRef }) {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '400px', width: '100%' }} id="my-map">
      <TileLayer
        url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${myAPIKey}`}
        attribution='Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" rel="nofollow" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" rel="nofollow" target="_blank">© OpenStreetMap</a> contributors'
      />
      <SetViewOnClick setMapRef={setMapRef} />
    </MapContainer>
  );
}

export default MapComponent;
