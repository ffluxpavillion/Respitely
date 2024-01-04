import './SheltersMap.scss';
import { useState, useEffect, useRef } from 'react';
import Map, {
  NavigationControl, // zoom in/out buttons
  ScaleControl, // scale bar
  GeolocateControl, // find my location button
  Marker, // marker for locations
  Layer,
  Popup
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

export default function SheltersMap(props) {
  // piece of state to store maps API key
  const [apiKey, setApiKey] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // fetch and set maps key from server
    axios.get('http://localhost:8080/api/maps-key').then((response) => {
      setApiKey(response.data.key);
    });
  }, []);

  useEffect(() => {
    const fetchGeocode = async () => {
      if (!apiKey) return;
      // fetch geocode for each location
      const newLocations = await Promise.all(
        props.records.map(async (location) => {
          const fullAddress = `${location.LOCATION_ADDRESS} ${location.LOCATION_CITY} ${location.LOCATION_PROVINCE} ${location.LOCATION_POSTAL_CODE}`;
          const encodedAddress = encodeURIComponent(fullAddress); // encode address for URL
          try {
            const response = await axios.get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${apiKey}`
            );
            const coordinates = response.data.features[0].geometry.coordinates;
            return { ...location, coordinates };
          } catch (error) {
            console.error('Error fetching geocode:', error);
            return null;
          }
        })
      );

      // updating the locations state with the new array, and only include locations with valid geocoded data --this removes any locations where geocoding failed
      setLocations(newLocations.filter((loc) => loc != null));
    };

    fetchGeocode();
  }, [apiKey, props.records]);

  return (
    <>
      {apiKey && (
        <Map
          mapboxAccessToken={apiKey}
          initialViewState={{
            longitude: -79.384293,
            latitude: 43.653908,
            zoom: 12.1,
          }}
          style={{ width: '45vw', height: '40vw' }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <NavigationControl />
          <ScaleControl />
          <GeolocateControl />
x
          {locations.map(
            (location, index) =>
              location.coordinates && (
                <Marker
                  className="marker"
                  key={index}
                  latitude={location.coordinates[1]}
                  longitude={location.coordinates[0]}
                  draggable={false}
                  color="#6c85ba"
                />
              )
          )}
        </Map>
      )}
    </>
  );
}
