import React, { createContext, useState } from 'react';

const GeocodedLocationsContext = createContext();

export const GeocodedLocationsProvider = ({ children }) => {
  const [geocodedLocations, setGeocodedLocations] = useState([]);

  return (
    <GeocodedLocationsContext.Provider value={{ geocodedLocations, setGeocodedLocations }}>
      {children}
    </GeocodedLocationsContext.Provider>
  );
};

export default GeocodedLocationsContext;
