

import { generateRandomLocationNearby, generateMockAddress, calculateSpeed } from './mapHelpers';
import { addMinutes } from 'date-fns';

// Sample Avatar URLs (Free randomuser.me API - you can replace with your own)
const AVATAR_URLS = [
  "https://randomuser.me/api/portraits/men/11.jpg",
  "https://randomuser.me/api/portraits/men/12.jpg",
  "https://randomuser.me/api/portraits/men/13.jpg",
  "https://randomuser.me/api/portraits/men/14.jpg",
  "https://randomuser.me/api/portraits/men/15.jpg",
  "https://randomuser.me/api/portraits/men/16.jpg",
  "https://randomuser.me/api/portraits/men/17.jpg",
  "https://randomuser.me/api/portraits/men/18.jpg",
];

// Base locations in Delhi/NCR
const BASE_LOCATIONS = [
  { lat: 28.6139, lng: 77.2090, name: 'Connaught Place' },
  { lat: 28.6692, lng: 77.4538, name: 'Noida' },
  { lat: 28.4595, lng: 77.0266, name: 'Gurgaon' },
  { lat: 28.7041, lng: 77.1025, name: 'Delhi' },
  { lat: 28.5355, lng: 77.3910, name: 'Faridabad' },
  { lat: 28.6692, lng: 77.4538, name: 'Greater Noida' },
  { lat: 28.6129, lng: 77.2295, name: 'India Gate' },
  { lat: 28.6280, lng: 77.2187, name: 'Karol Bagh' },
];

const SALESMAN_NAMES = [
  'Rajesh Kumar', 'Amit Singh', 'Priyansh Sharma', 'Vikash Gupta',
  'Sanjay Verma', 'Ravi Patel', ' Ramesh Agarwal', 'Mohit Jain',
  'Suresh Yadav', 'Purav Mishra', 'Rahul Saxena', 'Deepak Tiwari'
];

const PHONE_PREFIXES = ['+91-98', '+91-99', '+91-97', '+91-96'];

let salesmenData = [];

export const generateSalesmenData = (count = 8) => {
  if (salesmenData.length >= count) {
    return salesmenData.slice(0, count);
  }

  const salesmen = [];

  for (let i = 0; i < count; i++) {
    const baseLocation = BASE_LOCATIONS[i % BASE_LOCATIONS.length];
    const location = generateRandomLocationNearby(baseLocation.lat, baseLocation.lng, 3);
    
    const salesman = {
      id: `salesman_${i + 1}`,
      name: SALESMAN_NAMES[i % SALESMAN_NAMES.length],
      phone: `${PHONE_PREFIXES[i % PHONE_PREFIXES.length]}${Math.floor(10000000 + Math.random() * 90000000)}`,
      isOnline: Math.random() > 0.2, // 80% chance of being online
      lastUpdate: new Date().toISOString(),
      currentLocation: {
        lat: location.lat,
        lng: location.lng,
        address: generateMockAddress(location.lat, location.lng),
      },
      baseLocation: baseLocation,
      avatarUrl: AVATAR_URLS[i % AVATAR_URLS.length], // ✅ New avatar property
    };

    salesmen.push(salesman);
  }

  salesmenData = salesmen;
  return salesmen;
};

export const updateSalesmanLocations = (salesmen) => {
  return salesmen.map(salesman => {
    // Only update online salesmen unless a random chance toggles status
    if (!salesman.isOnline && Math.random() > 0.1) {
      return salesman;
    }

    // Randomly toggle online/offline
    if (Math.random() < 0.05) {
      return {
        ...salesman,
        isOnline: !salesman.isOnline,
        lastUpdate: new Date().toISOString(),
      };
    }

    // Generate new location near current one
    const currentLoc = salesman.currentLocation;
    const newLocation = generateRandomLocationNearby(currentLoc.lat, currentLoc.lng, 0.5);

    return {
      ...salesman,
      lastUpdate: new Date().toISOString(),
      currentLocation: {
        lat: newLocation.lat,
        lng: newLocation.lng,
        address: generateMockAddress(newLocation.lat, newLocation.lng),
      },
      avatarUrl: salesman.avatarUrl, // Keep avatar intact
    };
  });
};

export const generateHistoricalData = (salesmanId, startDate, endDate) => {
  const salesman = salesmenData.find(s => s.id === salesmanId);
  if (!salesman) return null;

  const locations = [];
  const baseLocation = salesman.baseLocation || BASE_LOCATIONS[0];
  
  // Generate locations every 5 minutes
  const intervalMinutes = 5;
  let currentTime = new Date(startDate);
  const end = new Date(endDate);
  
  let currentLat = baseLocation.lat;
  let currentLng = baseLocation.lng;
  let previousLocation = null;

  while (currentTime <= end) {
    // Generate movement near previous location
    const movement = generateRandomLocationNearby(currentLat, currentLng, 0.3);
    currentLat = movement.lat;
    currentLng = movement.lng;

    const location = {
      timestamp: currentTime.toISOString(),
      lat: currentLat,
      lng: currentLng,
      address: generateMockAddress(currentLat, currentLng),
      speed: 0,
    };

    // Calculate speed vs previous point
    if (previousLocation) {
      location.speed = calculateSpeed(previousLocation, location);
    }

    locations.push(location);
    previousLocation = location;
    currentTime = addMinutes(currentTime, intervalMinutes);
  }

  return {
    salesmanId,
    locations,
    startTime: startDate,
    endTime: endDate,
  };
};

// Example for quick testing
export const generateSampleHistoricalData = () => {
  const now = new Date();
  const startTime = new Date(now.getTime() - 8 * 60 * 60 * 1000); // 8 hours ago
  return generateHistoricalData('salesman_1', startTime, now);
};

