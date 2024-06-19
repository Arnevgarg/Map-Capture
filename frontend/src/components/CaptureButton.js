// import React from 'react';
// import html2canvas from 'html2canvas';
// import axios from 'axios';

// const CaptureButton = ({ mapRef, setCapturedImage }) => {
//   const captureMap = async () => {
//     console.log('Capture button clicked');
//     console.log('Map reference:', mapRef.current);

//     if (mapRef.current) {
//       const mapDiv = mapRef.current.getDiv();
//       const canvas = await html2canvas(mapDiv);
//       //const image = canvas.toDataURL('image/png');
//       const image = canvas.toDataURL('image/png').split(',')[1]; // Get base64 string
//       setCapturedImage(image);

//       const [latitude, longitude] = [
//         mapRef.current.getCenter().lat(),
//         mapRef.current.getCenter().lng()
//       ];
//       const zoom = mapRef.current.getZoom();

//       try {
//         console.log('Sending POST request to /api/capture');
//         const response = await axios.post('http://localhost:5000/api/capture', {
//           latitude,
//           longitude,
//           zoom,
//           //mapImage: image.split(',')[1] // Send the base64 
//           mapimage: image
//         });
//         console.log('Capture successful:', response.data);
//       } catch (error) {
//         console.error('Error capturing map:', error);
//       }
//     } else {
//       console.error('Map reference is null');
//     }
//   };

//   return (
//     <button onClick={captureMap}>Capture Map</button>
//   );
// };

// export default CaptureButton;

import React from 'react';
import axios from 'axios';

const CaptureButton = ({ mapRef, setCapturedImage }) => {
  const token = localStorage.getItem('token');
  const apiKey = 'dd7c10c6f5814de2ba305d22f701d035'; //geoapify key

  const getStaticMapImageUrl = (latitude, longitude, zoom, apiKey) => {
    return `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${longitude},${latitude}&zoom=${zoom}&apiKey=${apiKey}`;
    //return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=600x400&key=${apiKey}`;
    //return `https://staticmap.openstreetmap.de/staticmap.php?center=${latitude},${longitude}&zoom=${zoom}&size=600x400&markers=${latitude},${longitude},lightblue1`;
  };

  const captureMap = async () => {
    console.log('Capture button clicked');
    console.log('Map reference:', mapRef.current);

    if (mapRef.current) {
      // const [latitude, longitude] = [
      //   mapRef.current.getCenter().lat(),
      //   mapRef.current.getCenter().lng()
      // ];
      const center = mapRef.current.getCenter();
      const zoom = mapRef.current.getZoom();

      const staticMapUrl = getStaticMapImageUrl(center.lat, center.lng, zoom, apiKey);
      setCapturedImage(staticMapUrl);

      try {
        console.log('Sending POST request to /api/capture');
        const response = await axios.post('http://localhost:5000/api/capture', {
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
    <button onClick={captureMap}>Capture Map</button>
  );
};

export default CaptureButton;

