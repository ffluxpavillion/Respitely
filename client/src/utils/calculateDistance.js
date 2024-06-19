// Utility Function for the Haversine Formula
// (completely free alternative to paid API services (for now) -- may migrate to API if scaling demands it
export const calculateDistance = (lat1, lon1, lat2, lon2) => { // Calculates the distance between two points on the Earth's surface
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(lat2 - lat1); // Convert latitude spherical coordinates in radians
  const dLon = toRad(lon2 - lon1); // Convert longitude to spherical coordinates in radians
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance.toFixed(2); // Return distance rounded to 2 decimal places
};
