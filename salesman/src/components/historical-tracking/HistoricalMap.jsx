// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
// import { Box, Typography, CircularProgress } from '@mui/material';
// import { format } from 'date-fns';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// const createStartIcon = () =>
//   L.divIcon({
//     html: `
//       <div style="
//         width: 30px;
//         height: 30px;
//         background-color: #4caf50;
//         border: 3px solid white;
//         border-radius: 50%;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         color: white;
//         font-weight: bold;
//         font-size: 12px;
//         box-shadow: 0 2px 4px rgba(0,0,0,0.3);
//       ">
//         S
//       </div>
//     `,
//     className: 'start-icon',
//     iconSize: [30, 30],
//     iconAnchor: [15, 15],
//   });

// const createEndIcon = () =>
//   L.divIcon({
//     html: `
//       <div style="
//         width: 30px;
//         height: 30px;
//         background-color: #f44336;
//         border: 3px solid white;
//         border-radius: 50%;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         color: white;
//         font-weight: bold;
//         font-size: 12px;
//         box-shadow: 0 2px 4px rgba(0,0,0,0.3);
//       ">
//         E
//       </div>
//     `,
//     className: 'end-icon',
//     iconSize: [30, 30],
//     iconAnchor: [15, 15],
//   });

// /**
//  * Avatar icon similar to ride-hailing apps
//  * You can replace the inner HTML with an <img> tag if you have a PNG/SVG bike/scooter.
//  */
// const createAvatarIcon = () =>
//   L.divIcon({
//     html: `
//       <div style="
//         width: 32px;
//         height: 32px;
//         background: #fff;
//         border: 2px solid #2196f3;
//         border-radius: 50%;
//         box-shadow: 0 2px 8px rgba(0,0,0,0.25);
//         display: flex;
//         align-items: center;
//         justify-content: center;
//       ">
//         <div style="
//           width: 20px;
//           height: 20px;
//           background: #2196f3;
//           border-radius: 50%;
//           color: #fff;
//           font-weight: 700;
//           font-size: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         ">
//           R
//         </div>
//       </div>
//     `,
//     className: 'avatar-icon',
//     iconSize: [32, 32],
//     iconAnchor: [16, 16],
//   });

// const createCurrentIcon = () =>
//   L.divIcon({
//     html: `
//       <div style="
//         width: 14px;
//         height: 14px;
//         background-color: #2196f3;
//         border: 3px solid white;
//         border-radius: 50%;
//         box-shadow: 0 2px 4px rgba(0,0,0,0.3);
//         animation: pulse 2s infinite;
//       "></div>
//     `,
//     className: 'current-position-icon',
//     iconSize: [20, 20],
//     iconAnchor: [10, 10],
//   });

// const MapUpdater = ({ trackingData, followLatLng }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (trackingData?.locations?.length) {
//       const coordinates = trackingData.locations.map(l => [l.lat, l.lng]);
//       const bounds = L.latLngBounds(coordinates);
//       map.fitBounds(bounds.pad(0.15));
//     }
//   }, [map, trackingData]);

//   // Keep map centered on avatar while playing (gentle follow)
//   useEffect(() => {
//     if (followLatLng) {
//       // do not change zoom, only pan center
//       map.panTo([followLatLng.lat, followLatLng.lng], { animate: true });
//     }
//   }, [map, followLatLng]);

//   return null;
// };

// // Helper to linearly interpolate between two points 0..1
// const lerp = (a, b, t) => a + (b - a) * t;

// // Interpolates position for a given time between location[i] and location[i+1]
// function interpolatePosition(locA, locB, timeMs) {
//   const t0 = new Date(locA.timestamp).getTime();
//   const t1 = new Date(locB.timestamp).getTime();
//   if (t1 === t0) return { lat: locA.lat, lng: locA.lng, timestamp: timeMs, address: locA.address };

//   const alpha = Math.min(1, Math.max(0, (timeMs - t0) / (t1 - t0)));
//   return {
//     lat: lerp(locA.lat, locB.lat, alpha),
//     lng: lerp(locA.lng, locB.lng, alpha),
//     timestamp: new Date(timeMs).toISOString(),
//     address: alpha < 0.5 ? locA.address : locB.address,
//   };
// }

// const HistoricalMap = ({ trackingData, currentPosition, salesman }) => {
//   const mapRef = useRef();
//   const avatarIcon = useMemo(() => createAvatarIcon(), []);
//   const startIcon = useMemo(() => createStartIcon(), []);
//   const endIcon = useMemo(() => createEndIcon(), []);
//   const [avatarLatLng, setAvatarLatLng] = useState(null);

//   // Precompute path
//   const pathCoordinates = useMemo(() => {
//     if (!trackingData?.locations?.length) return [];
//     return trackingData.locations.map(l => [l.lat, l.lng]);
//   }, [trackingData]);

//   // Keep an animation frame that interpolates between points based on currentPosition.time
//   useEffect(() => {
//     if (!trackingData?.locations?.length || !currentPosition) return;

//     const locations = trackingData.locations;
//     const nowTime = new Date(currentPosition.timestamp).getTime();

//     // Find segment around nowTime
//     let i = 0;
//     while (i < locations.length - 1 && new Date(locations[i + 1].timestamp).getTime() < nowTime) {
//       i++;
//     }

//     let interp;
//     if (i >= locations.length - 1) {
//       // end
//       const last = locations[locations.length - 1];
//       interp = { lat: last.lat, lng: last.lng, timestamp: last.timestamp, address: last.address };
//     } else {
//       interp = interpolatePosition(locations[i], locations[i + 1], nowTime);
//     }

//     setAvatarLatLng({ lat: interp.lat, lng: interp.lng, info: interp });

//   }, [trackingData, currentPosition]);

//   if (!trackingData || !trackingData.locations || trackingData.locations.length === 0) {
//     return (
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           height: '100%',
//           backgroundColor: '#f5f5f5',
//           borderRadius: 1,
//         }}
//       >
//         {!trackingData ? (
//           <Typography variant="h6" color="text.secondary">
//             Select a salesman and date range to view historical tracking
//           </Typography>
//         ) : (
//           <>
//             <CircularProgress />
//             <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
//               Loading tracking data...
//             </Typography>
//           </>
//         )}
//       </Box>
//     );
//   }

//   const startLocation = trackingData.locations[0];
//   const endLocation = trackingData.locations[trackingData.locations.length - 1];

//   return (
//     <MapContainer
//       center={[startLocation.lat, startLocation.lng]}
//       zoom={13}
//       style={{ height: '100%', width: '100%', borderRadius: '4px' }}
//       ref={mapRef}
//     >
//       <TileLayer
//         attribution="&copy; OpenStreetMap contributors"
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />

//       <MapUpdater trackingData={trackingData} followLatLng={avatarLatLng} />

//       {/* Route Path */}
//       <Polyline positions={pathCoordinates} color="#2196f3" weight={5} opacity={0.9} />

//       {/* Start Marker */}
//       <Marker position={[startLocation.lat, startLocation.lng]} icon={startIcon}>
//         <Popup>
//           <Box sx={{ minWidth: 200 }}>
//             <Typography variant="h6" color="success.main" gutterBottom>
//               Journey Start
//             </Typography>
//             <Typography variant="body2" gutterBottom>
//               📍 {startLocation.address}
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               {format(new Date(startLocation.timestamp), 'dd/MM/yyyy HH:mm:ss')}
//             </Typography>
//           </Box>
//         </Popup>
//       </Marker>

//       {/* End Marker */}
//       <Marker position={[endLocation.lat, endLocation.lng]} icon={endIcon}>
//         <Popup>
//           <Box sx={{ minWidth: 200 }}>
//             <Typography variant="h6" color="error.main" gutterBottom>
//               Journey End
//             </Typography>
//             <Typography variant="body2" gutterBottom>
//               📍 {endLocation.address}
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               {format(new Date(endLocation.timestamp), 'dd/MM/yyyy HH:mm:ss')}
//             </Typography>
//           </Box>
//         </Popup>
//       </Marker>

//       {/* Animated Avatar Marker (continuous movement) */}
//       {avatarLatLng && (
//         <Marker position={[avatarLatLng.lat, avatarLatLng.lng]} icon={avatarIcon}>
//           <Popup>
//             <Box sx={{ minWidth: 200 }}>
//               <Typography variant="h6" color="primary.main" gutterBottom>
//                 {salesman?.name || 'Current Position'}
//               </Typography>
//               <Typography variant="body2" gutterBottom>
//                 📍 {avatarLatLng.info?.address || ''}
//               </Typography>
//               <Typography variant="caption" color="text.secondary">
//                 {avatarLatLng.info?.timestamp
//                   ? format(new Date(avatarLatLng.info.timestamp), 'dd/MM/yyyy HH:mm:ss')
//                   : ''}
//               </Typography>
//             </Box>
//           </Popup>
//         </Marker>
//       )}
//     </MapContainer>
//   );
// };

// export default HistoricalMap;
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import { Box, Typography, CircularProgress } from '@mui/material';
import { format } from 'date-fns';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const createStartIcon = () =>
  L.divIcon({
    html: `
      <div style="
        width: 30px;
        height: 30px;
        background-color: #4caf50;
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      ">
        S
      </div>
    `,
    className: 'start-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

const createEndIcon = () =>
  L.divIcon({
    html: `
      <div style="
        width: 30px;
        height: 30px;
        background-color: #f44336;
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      ">
        E
      </div>
    `,
    className: 'end-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

/**
 * Avatar icon similar to ride-hailing apps
 * You can replace the inner HTML with an <img> tag if you have a PNG/SVG bike/scooter.
 */
const createAvatarIcon = () =>
  L.divIcon({
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: #fff;
        border: 2px solid #2196f3;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 20px;
          height: 20px;
          background: #2196f3;
          border-radius: 50%;
          color: #fff;
          font-weight: 700;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          R
        </div>
      </div>
    `,
    className: 'avatar-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

const MapUpdater = ({ trackingData, followLatLng }) => {
  const map = useMap();

  useEffect(() => {
    if (trackingData?.locations?.length) {
      const coordinates = trackingData.locations.map(l => [l.lat, l.lng]);
      const bounds = L.latLngBounds(coordinates);
      map.fitBounds(bounds.pad(0.15));
    }
  }, [map, trackingData]);

  // Keep map centered on avatar while playing (gentle follow)
  useEffect(() => {
    if (followLatLng) {
      // do not change zoom, only pan center
      map.panTo([followLatLng.lat, followLatLng.lng], { animate: true });
    }
  }, [map, followLatLng]);

  return null;
};

// Helper to linearly interpolate between two points 0..1
const lerp = (a, b, t) => a + (b - a) * t;

// Interpolates position for a given time between location[i] and location[i+1]
function interpolatePosition(locA, locB, timeMs) {
  const t0 = new Date(locA.timestamp).getTime();
  const t1 = new Date(locB.timestamp).getTime();
  if (t1 === t0) return { lat: locA.lat, lng: locA.lng, timestamp: timeMs, address: locA.address };

  const alpha = Math.min(1, Math.max(0, (timeMs - t0) / (t1 - t0)));
  return {
    lat: lerp(locA.lat, locB.lat, alpha),
    lng: lerp(locA.lng, locB.lng, alpha),
    timestamp: new Date(timeMs).toISOString(),
    address: alpha < 0.5 ? locA.address : locB.address,
  };
}

const HistoricalMap = ({ trackingData, currentPosition, salesman }) => {
  const mapRef = useRef();
  const avatarIcon = useMemo(() => createAvatarIcon(), []);
  const startIcon = useMemo(() => createStartIcon(), []);
  const endIcon = useMemo(() => createEndIcon(), []);
  const [avatarLatLng, setAvatarLatLng] = useState(null);

  // Precompute path
  const pathCoordinates = useMemo(() => {
    if (!trackingData?.locations?.length) return [];
    return trackingData.locations.map(l => [l.lat, l.lng]);
  }, [trackingData]);

  // Keep an animation frame that interpolates between points based on currentPosition.time
  useEffect(() => {
    if (!trackingData?.locations?.length || !currentPosition) return;

    const locations = trackingData.locations;
    const nowTime = new Date(currentPosition.timestamp).getTime();

    // Find segment around nowTime
    let i = 0;
    while (i < locations.length - 1 && new Date(locations[i + 1].timestamp).getTime() < nowTime) {
      i++;
    }

    let interp;
    if (i >= locations.length - 1) {
      // end
      const last = locations[locations.length - 1];
      interp = { lat: last.lat, lng: last.lng, timestamp: last.timestamp, address: last.address };
    } else {
      interp = interpolatePosition(locations[i], locations[i + 1], nowTime);
    }

    setAvatarLatLng({ lat: interp.lat, lng: interp.lng, info: interp });
  }, [trackingData, currentPosition]);

  if (!trackingData || !trackingData.locations || trackingData.locations.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          backgroundColor: '#f5f5f5',
          borderRadius: 1,
        }}
      >
        {!trackingData ? (
          <Typography variant="h6" color="text.secondary">
            Select a salesman and date range to view historical tracking
          </Typography>
        ) : (
          <>
            <CircularProgress />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Loading tracking data...
            </Typography>
          </>
        )}
      </Box>
    );
  }

  const startLocation = trackingData.locations[0];
  const endLocation = trackingData.locations[trackingData.locations.length - 1];

  return (
    <MapContainer
      center={[startLocation.lat, startLocation.lng]}
      zoom={13}
      style={{ height: '100%', width: '100%', borderRadius: '4px' }}
      ref={mapRef}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapUpdater trackingData={trackingData} followLatLng={avatarLatLng} />

      {/* Route Path */}
      <Polyline positions={pathCoordinates} color="#2196f3" weight={5} opacity={0.9} />

      {/* Start Marker */}
      <Marker position={[startLocation.lat, startLocation.lng]} icon={startIcon}>
        <Popup>
          <Box sx={{ minWidth: 200 }}>
            <Typography variant="h6" color="success.main" gutterBottom>
              Journey Start
            </Typography>
            <Typography variant="body2" gutterBottom>
              📍 {startLocation.address}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {format(new Date(startLocation.timestamp), 'dd/MM/yyyy HH:mm:ss')}
            </Typography>
          </Box>
        </Popup>
      </Marker>

      {/* End Marker */}
      <Marker position={[endLocation.lat, endLocation.lng]} icon={endIcon}>
        <Popup>
          <Box sx={{ minWidth: 200 }}>
            <Typography variant="h6" color="error.main" gutterBottom>
              Journey End
            </Typography>
            <Typography variant="body2" gutterBottom>
              📍 {endLocation.address}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {format(new Date(endLocation.timestamp), 'dd/MM/yyyy HH:mm:ss')}
            </Typography>
          </Box>
        </Popup>
      </Marker>

      {/* Animated Avatar Marker (continuous movement) */}
      {avatarLatLng && (
        <Marker position={[avatarLatLng.lat, avatarLatLng.lng]} icon={avatarIcon}>
          <Popup>
            <Box sx={{ minWidth: 200, textAlign: 'center' }}>
              {salesman?.avatarUrl && (
                <img
                  src={salesman.avatarUrl}
                  alt={salesman.name}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginBottom: 8,
                  }}
                />
              )}
              <Typography variant="h6" color="primary.main" gutterBottom>
                {salesman?.name || 'Current Position'}
              </Typography>
              <Typography variant="body2" gutterBottom>
                📍 {avatarLatLng.info?.address || ''}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {avatarLatLng.info?.timestamp
                  ? format(new Date(avatarLatLng.info.timestamp), 'dd/MM/yyyy HH:mm:ss')
                  : ''}
              </Typography>
            </Box>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default HistoricalMap;
