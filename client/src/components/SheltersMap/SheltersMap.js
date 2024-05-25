import './SheltersMap.scss';
import React, { useState, useEffect, useRef, useContext } from 'react';
import Map, {
  NavigationControl,
  ScaleControl,
  GeolocateControl,
  Popup,
  Source,
  Layer,
} from 'react-map-gl';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import HeartMarker from '../../assets/icons/SafeHavenTO_icon-marker.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { ApiKeyContext } from '../../contexts/ApiKeyContext';

export default function SheltersMap(props) {
  const apiKey = useContext(ApiKeyContext); // piece of state to store maps API key
  const [locations, setLocations] = useState([]); // Raw locations as an array
  const [refreshKey, setRefreshKey] = useState(0); // Forces a re-render of the map
  const [selectedPlace, setSelectedPlace] = useState(null); // Sets the selected place upon marker click
  const [geoJsonLocations, setGeoJsonLocations] = useState({
    // GeoJSON representation for Mapbox
    type: 'FeatureCollection',
    features: [],
  });
  const [viewState, setViewState] = useState({
    // Initial view state
    longitude: -79.384293,
    latitude: 43.653908,
    zoom: 11,
  });

  const DEFAULT_VIEW_STATE = {
    longitude: -79.409527,
    latitude: 43.678122,
    zoom: 10,
  };

  const { goHere } = props;
  const mapRef = useRef(); // Reference to the map instance

  useEffect(() => {
    setViewState(DEFAULT_VIEW_STATE); // Reset the view state to the default
    setSelectedPlace(null); // to deselect any currently selected marker on the map
  }, [props.filterType]);


  // console.log('apiKey:', apiKey);
  // console.log('locations:', locations);
  // console.log('geoJsonLocations:', geoJsonLocations);
  // console.log('selectedPlace:', selectedPlace);

  useEffect(() => {
    // Fetch geocode for each location
    const fetchGeocode = async () => {
      if (!apiKey) return;
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
            // console.error('Error fetching geocode:', error);
            return null;
          }
        })
      );
      // updating the locations state with the new array, and only include locations with valid geocoded data --this removes any locations where geocoding failed
      setLocations(newLocations.filter((loc) => loc != null));
    };

    fetchGeocode();
  }, [apiKey, props.records]);

  useEffect(() => {
    // useEffect to update geoJsonLocations  --this will update the map markers when the filterType changes
    const features = locations // Convert locations to GeoJSON format
      .filter((location) => {
        // Filter by capacity type
        if (props.filterType === 'All') return true;
        return (
          location.CAPACITY_TYPE ===
          (props.filterType === 'Beds'
            ? 'Bed Based Capacity'
            : 'Room Based Capacity')
        );
      })
      .map((location) => ({
        type: 'Feature',
        properties: { ...location }, // Copy all properties
        name: location.CAPACITY_TYPE,
        geometry: {
          // Add the coordinates
          type: 'Point',
          coordinates: location.coordinates,
        },
      }));

    setGeoJsonLocations({
      // Update the GeoJSON representation
      type: 'FeatureCollection',
      features,
    });
  }, [locations, props.filterType]);

  const handleMapLoad = () => {
    // Load the HeartMarker icon and attach event listeners
    const map = mapRef.current.getMap(); // Get the map instance

    map.loadImage(HeartMarker, (error, image) => {
      // Load the HeartMarker icon as soon as the map loads
      if (error) throw error;
      map.addImage('heart-marker', image); // Add the image with the ID 'heart-marker'

      map.on('click', 'location-markers', (e) => {
        // Attach a click event listener to the "location-markers" layer
        if (e.features.length > 0) {
          const feature = e.features[0];
          setSelectedPlace(feature); // Store the entire feature
          setViewState({
            // Update the view state to center on the clicked marker
            longitude: feature.geometry.coordinates[0],
            latitude: feature.geometry.coordinates[1],
            zoom: map.getZoom(), // centers on the clicked marker without changing current zoom level
          });
        }
      });

      map.on('mouseenter', 'location-markers', () => {
        // Change cursor to pointer when over marker
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'location-markers', () => {
        // Change cursor back to default when not over marker
        map.getCanvas().style.cursor = '';
      });
    });
  };

  const handleMapClick = (e) => {
    // Handle map click event
    const map = mapRef.current.getMap();
    const features = map.queryRenderedFeatures(e.point, {
      layers: ['location-markers'],
    }); // Query the map for features at the clicked point

    if (features.length > 0) {
      // If a feature is clicked, store the entire feature and update the view state via force re-render
      const feature = features[0];
      setSelectedPlace(feature);
      setViewState({
        ...viewState,
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
      });
      setRefreshKey((prevKey) => prevKey + 1); // Force re-render by toggling the refresh key --required to update the popups
    } else {
      setSelectedPlace(null); // Hide the popup if no feature is clicked
    }
    // console.log('selectedPlace= ', selectedPlace)
  };

  // console.log('selectedPlace.properties.LOCATION_ADDRESS= ', {selectedPlace})
  // console.log('goHere= ', {goHere})
  // console.log('selectedPlace= ', {selectedPlace})
  // console.log('locations= ', {locations})

  useEffect(() => {
    // Update the view state and selected place when goHere changes
    if (goHere && locations.length > 0) {
      const matchingLocation = locations.find(
        (location) => location.LOCATION_ID === goHere.LOCATION_ID
      ); // Find the location that matches the goHere ID

      if (matchingLocation && matchingLocation.coordinates) {
        const [longitude, latitude] = matchingLocation.coordinates;

        setViewState((prevViewState) => ({
          // Update the view state to center on the selected location
          ...prevViewState,
          longitude: longitude,
          latitude: latitude + 0.003, // Offset the latitude slightly to prevent the popup from covering the marker
          zoom: 13,
        }));

        const selectedPlaceForPopup = {
          // Ensure the structure includes `geometry` for coordinates
          geometry: {
            coordinates: [longitude, latitude],
          },
          properties: { ...matchingLocation },
        };

        setSelectedPlace(selectedPlaceForPopup);
      }
    }
  }, [goHere, locations]);

  return (
    <>
      {apiKey && (
        <Map
          key={refreshKey} // This forces the map to re-render, which is necessary to update the markers
          ref={mapRef}
          {...viewState} // updates view state on marker click
          onMove={(evt) => setViewState(evt.viewState)} // updates view state on marker click
          mapboxAccessToken={apiKey}
          style={{ width: '100%', Height: '100%' }}
          mapStyle='mapbox://styles/mapbox/streets-v9'
          onClick={handleMapClick}
          onLoad={handleMapLoad}
          cooperativeGestures // requires CMD + scroll to zoom --helps prevent accidental zooming
        >
          <NavigationControl position='bottom-right' />
          <ScaleControl />
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            position='bottom-right'
          />

          <Source id='locations' type='geojson' data={geoJsonLocations}>
            <Layer // Add the location markers
              id='location-markers'
              type='symbol'
              className='location-marker'
              layout={{
                'icon-image': 'heart-marker',
                'icon-size': 0.15,
                'icon-allow-overlap': true,
                'icon-ignore-placement':
                  props.filterType === 'All' ? false : true,
              }}
            />
          </Source>

          {selectedPlace && (
            <Popup
              // className='popup'
              latitude={selectedPlace.geometry.coordinates[1]}
              longitude={selectedPlace.geometry.coordinates[0]}
              draggable={false}
              anchor='bottom'
              closeButton={false}
              onClose={() => setSelectedPlace(null)}
              offset={[0, -20]}
            >
              <div className='popup__div'>
                <div className='popup__div-left'>
                  <h4 className='popup__div-header'>
                    {selectedPlace.properties.SHELTER_GROUP || 'LOCATION NAME'}
                  </h4>
                  <br />
                  {selectedPlace.properties.CAPACITY_TYPE ===
                  'Bed Based Capacity' ? (
                    <p className='popup__div-subheader-1 '>
                      Available Beds:{' '}
                      <span className='popup-availability'>
                        {selectedPlace.properties.UNOCCUPIED_BEDS}
                      </span>
                    </p>
                  ) : (
                    <p className='popup__div-subheader-1'>
                      Available Rooms:{' '}
                      <span className='popup-availability'>
                        {selectedPlace.properties.UNOCCUPIED_ROOMS}
                      </span>
                    </p>
                  )}
                </div>
                <br />
                <div className='popup__div-right'>
                  <p className='popup__div-subheader-2'>Address:</p>
                  <p className='popup__div-text'>
                    {selectedPlace.properties.LOCATION_ADDRESS}
                    <br />
                    {selectedPlace.properties.LOCATION_CITY}
                  </p>
                </div>
              </div>
              <div className='popup__button-container'>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    selectedPlace.properties.LOCATION_ADDRESS +
                      ', ' +
                      selectedPlace.properties.LOCATION_CITY +
                      ', ' +
                      selectedPlace.properties.LOCATION_POSTAL_CODE
                  )}&travelmode=walking`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn--Directions-anchor'
                >
                  <button className='popup__button-directions'>
                    <span>
                      <FontAwesomeIcon icon={faRoute} size='lg' />
                    </span>
                    <p className='popup__button-directions-text'>
                      {' '}
                      Get Directions
                    </p>
                  </button>
                </a>
              </div>
            </Popup>
            //<SearchBox accessToken={apiKey} />
          )}
        </Map>
      )}
    </>
  );
}
