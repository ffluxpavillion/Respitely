import { useState, useEffect } from 'react';

export const useGeolocation = () => {// hook function to get user's geolocation
  const [locationInfo, setLocationInfo] = useState(null);
  const [locationError, setLocationError] = useState(null);

  const { geolocation } = navigator;

  const successFn = (res) => {
    setLocationInfo(res.coords);
  };

  const errorFn = (res) => {
    setLocationError(res.message);
  };

  useEffect(() => {
    if (!locationError && !locationInfo) {
      geolocation.getCurrentPosition(successFn, errorFn);
    }
  }, [geolocation, locationError, locationInfo]);

  return { locationError, locationInfo };
};
