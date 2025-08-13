// Map utility functions

export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

export const generateRandomLocationNearby = (baseLat, baseLng, radiusKm = 5) => {
  const radiusInDegrees = radiusKm / 111.32; // Rough conversion from km to degrees
  
  const randomLat = baseLat + (Math.random() - 0.5) * 2 * radiusInDegrees;
  const randomLng = baseLng + (Math.random() - 0.5) * 2 * radiusInDegrees;
  
  return {
    lat: randomLat,
    lng: randomLng,
  };
};

export const calculateBounds = (locations) => {
  if (!locations || locations.length === 0) return null;
  
  const lats = locations.map(loc => loc.lat);
  const lngs = locations.map(loc => loc.lng);
  
  return {
    north: Math.max(...lats),
    south: Math.min(...lats),
    east: Math.max(...lngs),
    west: Math.min(...lngs),
  };
};

export const calculateSpeed = (location1, location2) => {
  if (!location1 || !location2) return 0;
  
  const distance = calculateDistance(location1.lat, location1.lng, location2.lat, location2.lng);
  const timeDiff = (new Date(location2.timestamp) - new Date(location1.timestamp)) / (1000 * 60 * 60); // hours
  
  if (timeDiff <= 0) return 0;
  
  return Math.round(distance / timeDiff); // km/h
};

export const getAddressFromCoordinates = async (lat, lng) => {
  try {
    // Using a free geocoding service (replace with your preferred service)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    return data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  } catch (error) {
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  }
};

export const generateMockAddress = (lat, lng) => {
  const areas = [
    'Connaught Place', 'Karol Bagh', 'Lajpat Nagar', 'Rajouri Garden',
    'Janakpuri', 'Dwarka', 'Gurgaon', 'Noida', 'Faridabad', 'Ghaziabad',
    'Nehru Place', 'CP Metro Station', 'India Gate', 'Red Fort', 'Lotus Temple'
  ];
  
  const roads = [
    'MG Road', 'Ring Road', 'Outer Ring Road', 'NH-8', 'GT Road',
    'Ashram Road', 'Mathura Road', 'Palam Road', 'Rohtak Road', 'Mall Road'
  ];
  
  const area = areas[Math.floor(Math.random() * areas.length)];
  const road = roads[Math.floor(Math.random() * roads.length)];
  
  return `${area}, ${road}, New Delhi, India`;
};
