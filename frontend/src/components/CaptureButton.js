
import React from 'react';
import axios from 'axios';

const CaptureButton = ({ mapRef, setCapturedImage }) => {
  const token = localStorage.getItem('token');
  const apiKey = process.env.REACT_APP_GEOAPIFY_API_KEY;

  const getStaticMapImageUrl = (latitude, longitude, zoom, apiKey) => {
    return `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${longitude},${latitude}&zoom=${zoom}&apiKey=${apiKey}`;
  };

  const captureMap = async () => {
    console.log('Capture button clicked');
    console.log('Map reference:', mapRef.current);

    if (mapRef.current) {

      const center = mapRef.current.getCenter();
      const zoom = mapRef.current.getZoom();

      const staticMapUrl = getStaticMapImageUrl(center.lat, center.lng, zoom, apiKey);
      setCapturedImage(staticMapUrl);

      try {
        console.log('Sending POST request to /api/capture');
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/capture`, {
          latitude: center.lat,
          longitude: center.lng,
          zoom: zoom,
          mapImage: staticMapUrl
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Capture successful:', response.data);
      } catch (error) {
        console.error('Error capturing map:', error);
      }
    } else {
      console.error('Map reference is null');
    }
  };

  return (
    <button onClick={captureMap} className="btn btn-primary">Capture Map</button>
  );
};

export default CaptureButton;

