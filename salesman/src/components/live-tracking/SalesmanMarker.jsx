// import React from 'react';
// import { Marker, Popup } from 'react-leaflet';
// import { Typography, Box, Chip } from '@mui/material';
// import { format } from 'date-fns';
// import L from 'leaflet';

// const createCustomIcon = (isOnline, isSelected) => {
//   const color = isOnline ? '#4caf50' : '#f44336';
//   const size = isSelected ? 35 : 25;
  
//   return L.divIcon({
//     html: `
//       <div style="
//         width: ${size}px;
//         height: ${size}px;
//         background-color: ${color};
//         border: 3px solid white;
//         border-radius: 50%;
//         box-shadow: 0 2px 4px rgba(0,0,0,0.3);
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         color: white;
//         font-weight: bold;
//         font-size: ${size > 30 ? '12px' : '10px'};
//       ">
//         ${isOnline ? '●' : '○'}
//       </div>
//     `,
//     className: 'custom-div-icon',
//     iconSize: [size, size],
//     iconAnchor: [size / 2, size / 2],
//   });
// };

// const SalesmanMarker = ({ salesman, onClick, isSelected }) => {
//   const icon = createCustomIcon(salesman.isOnline, isSelected);

//   return (
//     <Marker
//       position={[salesman.currentLocation.lat, salesman.currentLocation.lng]}
//       icon={icon}
//       eventHandlers={{
//         click: onClick,
//       }}
//     >
//       <Popup>
//         <Box sx={{ minWidth: 200 }}>
//           <Typography variant="h6" gutterBottom>
//             {salesman.name}
//           </Typography>
          
//           <Box sx={{ mb: 1 }}>
//             <Chip
//               label={salesman.isOnline ? 'Online' : 'Offline'}
//               color={salesman.isOnline ? 'success' : 'error'}
//               size="small"
//             />
//           </Box>
          
//           <Typography variant="body2" color="text.secondary" gutterBottom>
//             📞 {salesman.phone}
//           </Typography>
          
//           <Typography variant="body2" color="text.secondary" gutterBottom>
//             📍 {salesman.currentLocation.address}
//           </Typography>
          
//           <Typography variant="caption" color="text.secondary">
//             Last Update: {format(new Date(salesman.lastUpdate), 'dd/MM/yyyy HH:mm:ss')}
//           </Typography>
//         </Box>
//       </Popup>
//     </Marker>
//   );
// };

// export default SalesmanMarker;


// import React from 'react';
// import { Marker, Popup } from 'react-leaflet';
// import { Typography, Box, Chip } from '@mui/material';
// import { format } from 'date-fns';
// import L from 'leaflet';

// const createCustomIcon = (isOnline, isSelected) => {
//   const color = isOnline ? '#4caf50' : '#f44336';
//   const size = isSelected ? 35 : 25;
  
//   return L.divIcon({
//     html: `
//       <div style="
//         width: ${size}px;
//         height: ${size}px;
//         background-color: ${color};
//         border: 3px solid white;
//         border-radius: 50%;
//         box-shadow: 0 2px 4px rgba(0,0,0,0.3);
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         color: white;
//         font-weight: bold;
//         font-size: ${size > 30 ? '12px' : '10px'};
//       ">
//         ${isOnline ? '●' : '○'}
//       </div>
//     `,
//     className: 'custom-div-icon',
//     iconSize: [size, size],
//     iconAnchor: [size / 2, size / 2],
//   });
// };

// const SalesmanMarker = ({ salesman, onClick, isSelected }) => {
//   const icon = createCustomIcon(salesman.isOnline, isSelected);

//   return (
//     <Marker
//       position={[salesman.currentLocation.lat, salesman.currentLocation.lng]}
//       icon={icon}
//       eventHandlers={{ click: onClick }}
//     >
//       <Popup>
//         <Box sx={{ minWidth: 200, textAlign: 'center' }}>
//           {salesman.avatarUrl && (
//             <img
//               src={salesman.avatarUrl}
//               alt={salesman.name}
//               style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: '50%',
//                 objectFit: 'cover',
//                 marginBottom: 8
//               }}
//             />
//           )}
//           <Typography variant="h6" gutterBottom>
//             {salesman.name}
//           </Typography>

//           <Chip
//             label={salesman.isOnline ? 'Online' : 'Offline'}
//             color={salesman.isOnline ? 'success' : 'error'}
//             size="small"
//             sx={{ mb: 1 }}
//           />

//           <Typography variant="body2" gutterBottom>
//             📞 {salesman.phone}
//           </Typography>

//           <Typography variant="body2" gutterBottom>
//             📍 {salesman.currentLocation.address}
//           </Typography>

//           <Typography variant="caption" color="text.secondary">
//             Last Update: {format(new Date(salesman.lastUpdate), 'dd/MM/yyyy HH:mm:ss')}
//           </Typography>
//         </Box>
//       </Popup>
//     </Marker>
//   );
// };

// export default SalesmanMarker;


// import React from 'react';
// import { Marker, Popup } from 'react-leaflet';
// import { Typography, Box, Chip } from '@mui/material';
// import { format } from 'date-fns';
// import L from 'leaflet';

// const createCustomIcon = (isOnline, isSelected) => {
//   const color = isOnline ? '#4caf50' : '#f44336';
//   const size = isSelected ? 35 : 25;
//   return L.divIcon({
//     html: `<div style="width:${size}px;height:${size}px;background:${color};border:3px solid white;border-radius:50%;"></div>`,
//     className: 'custom-div-icon',
//     iconSize: [size, size],
//     iconAnchor: [size / 2, size / 2],
//   });
// };

// export default function SalesmanMarker({ salesman, onClick, isSelected }) {
//   const icon = createCustomIcon(salesman.isOnline, isSelected);
//   return (
//     <Marker position={[salesman.currentLocation.lat, salesman.currentLocation.lng]} icon={icon} eventHandlers={{ click: onClick }}>
//       <Popup>
//         <Box sx={{ minWidth: 200, textAlign: 'center', p: 1 }}>
//           {salesman.avatarUrl && <img src={salesman.avatarUrl} alt={salesman.name} style={{ width: 60, height: 60, borderRadius: '50%', marginBottom: 8 }} />}
//           <Typography variant="h6">{salesman.name}</Typography>
//           <Chip label={salesman.isOnline ? 'Online' : 'Offline'} color={salesman.isOnline ? 'success' : 'error'} size="small" sx={{ mb: 1 }} />
//           <Typography variant="body2">📞 {salesman.phone}</Typography>
//           <Typography variant="body2">📍 {salesman.currentLocation.address}</Typography>
//           <Typography variant="caption" color="text.secondary">{format(new Date(salesman.lastUpdate), 'dd/MM/yyyy HH:mm:ss')}</Typography>
//         </Box>
//       </Popup>
//     </Marker>
//   );
// }

import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Typography, Box, Chip, Avatar, Divider } from '@mui/material';
import { format } from 'date-fns';
import L from 'leaflet';

const createCustomIcon = (isOnline, isSelected) => {
  const color = isOnline ? '#4caf50' : '#f44336';
  const size = isSelected ? 36 : 28;
  return L.divIcon({
    html: `<div style="width:${size}px;height:${size}px;background:${color};border:2px solid white;border-radius:50%;"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    className: 'custom-div-icon',
  });
};

export default function SalesmanMarker({ salesman, onClick, isSelected }) {
  const icon = createCustomIcon(salesman.isOnline, isSelected);
  return (
    <Marker
      position={[salesman.currentLocation.lat, salesman.currentLocation.lng]}
      icon={icon}
      eventHandlers={{ click: onClick }}
    >
      <Popup>
        <Box sx={{ minWidth: 200, textAlign: 'center', p: 1 }}>
          <Avatar
            src={salesman.avatarUrl}
            alt={salesman.name}
            sx={{ width: 60, height: 60, mx: 'auto', mb: 1 }}
          />
          <Typography variant="h6">{salesman.name}</Typography>
          <Chip
            label={salesman.isOnline ? 'Online' : 'Offline'}
            color={salesman.isOnline ? 'success' : 'error'}
            size="small"
            sx={{ mb: 1 }}
          />
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2">📞 {salesman.phone}</Typography>
          <Typography variant="body2">📍 {salesman.currentLocation.address}</Typography>
          <Typography variant="caption" color="text.secondary">
            Last Update: {format(new Date(salesman.lastUpdate), 'dd/MM/yyyy HH:mm:ss')}
          </Typography>
        </Box>
      </Popup>
    </Marker>
  );
}

