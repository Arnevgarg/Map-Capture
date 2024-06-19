// import React, { useEffect } from 'react';
// import { MapContainer, TileLayer, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// const center = [48.1500327, 11.5753989];
// const zoom = 10;
// const myAPIKey = 'dd7c10c6f5814de2ba305d22f701d035';

// function SetViewOnClick({ setMapRef }) {
//   const map = useMap();
//   useEffect(() => {
//     setMapRef(map);
//   }, [map, setMapRef]);

//   return null;
// }

// function MapComponent({ setMapRef }) {
//   return (
//     <MapContainer center={center} zoom={zoom} style={{ height: '400px', width: '100%' }} id="my-map">
//       <TileLayer
//         url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${myAPIKey}`}
//         attribution='Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" rel="nofollow" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" rel="nofollow" target="_blank">© OpenStreetMap</a> contributors'
//       />
//       <SetViewOnClick setMapRef={setMapRef} />
//     </MapContainer>
//   );
// }

// export default MapComponent;

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ setMapRef }) => {
  const mapContainer = useRef(null);
  const myAPIKey = 'dd7c10c6f5814de2ba305d22f701d035'; //geoapify key
  const isRetina = L.Browser.retina;

  useEffect(() => {
    const map = L.map(mapContainer.current).setView([48.1500327, 11.5753989], 10);

    const baseUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey={apiKey}";
    const retinaUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey={apiKey}";

    L.tileLayer(isRetina ? retinaUrl : baseUrl, {
      attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" rel="nofollow" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" rel="nofollow" target="_blank">© OpenStreetMap</a> contributors',
      apiKey: myAPIKey,
      maxZoom: 20,
      id: 'osm-bright',
    }).addTo(map);

    setMapRef(map);

    return () => {
      map.remove();
    };
  }, [setMapRef]);

  return <div ref={mapContainer} style={{ height: '400px', width: '100%' }} id="my-map"></div>;
};

export default MapComponent;
