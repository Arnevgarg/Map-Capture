import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ setMapRef }) => {
  const mapContainer = useRef(null);
  const myAPIKey = process.env.REACT_APP_GEOAPIFY_API_KEY;
  

  useEffect(() => {
    const isRetina = L.Browser.retina;
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
  }, [setMapRef, myAPIKey]);

  return <div ref={mapContainer} style={{ height: '400px', width: '100%' }} id="my-map"></div>;
};

export default MapComponent;