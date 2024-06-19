import { useState, useEffect, useContext } from 'react';
import { calculateDistance } from '../utils/calculateDistance';
import { useGeolocation } from './useGeolocation';

const useDistanceCalculator = () => { // hook function to calculate distances between user and locations
  const { locationInfo } = useGeolocation();
  const [distances, setDistances] = useState([]);

  const calculateDistances = (locations) => {
    if (!locationInfo) return;

    const { latitude: userLat, longitude: userLon } = locationInfo;

    const updatedLocations = locations.map((location) => {
      const distance = calculateDistance(
        userLat,
        userLon,
        location.latitude,
        location.longitude
      );
      return { ...location, distance };
    });

    setDistances(updatedLocations);
    return updatedLocations;
  };

  return { distances, calculateDistances };
};

export default useDistanceCalculator;
