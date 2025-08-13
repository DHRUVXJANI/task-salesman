import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Box, CircularProgress } from '@mui/material';
import SalesmanMarker from './SalesmanMarker';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapUpdater = ({ salesmen, selectedSalesman }) => {
  const map = useMap();

  useEffect(() => {
    if (salesmen && salesmen.length > 0) {
      const group = new L.featureGroup(
        salesmen.map(salesman => 
          L.marker([salesman.currentLocation.lat, salesman.currentLocation.lng])
        )
      );
      
      if (selectedSalesman) {
        map.setView([selectedSalesman.currentLocation.lat, selectedSalesman.currentLocation.lng], 15);
      } else {
        map.fitBounds(group.getBounds().pad(0.1));
      }
    }
  }, [map, salesmen, selectedSalesman]);

  return null;
};

const LiveMap = ({ salesmen, selectedSalesman, onMarkerClick }) => {
  const mapRef = useRef();

  if (!salesmen || salesmen.length === 0) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100%' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const center = salesmen.length > 0 
    ? [salesmen[0].currentLocation.lat, salesmen[0].currentLocation.lng]
    : [28.6139, 77.2090]; // Default to Delhi

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapUpdater 
        salesmen={salesmen} 
        selectedSalesman={selectedSalesman} 
      />
      
      {salesmen.map((salesman) => (
        <SalesmanMarker
          key={salesman.id}
          salesman={salesman}
          onClick={() => onMarkerClick(salesman)}
          isSelected={selectedSalesman?.id === salesman.id}
        />
      ))}
    </MapContainer>
  );
};

export default LiveMap;
