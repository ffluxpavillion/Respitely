import { useState } from 'react';

export const useGeolocation = () => { // useGeolocation hook function
  const [locationInfo, setLocationInfo] = useState(null);
  const [locationError, setLocationError] = useState(null);

  const { geolocation } = navigator;

  const successFn = (res) => {
    console.log({res});
    setLocationInfo(res.coords);
  }

  const errorFn = (res) => {
    console.log({res});
    setLocationError(res.message);
  }

  if (!locationError && !locationInfo) { // if no error and no location info
    geolocation.getCurrentPosition(successFn, errorFn);
  }

  return { locationError, locationInfo }; // return locationError and locationInfo
}