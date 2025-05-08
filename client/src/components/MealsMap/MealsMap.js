import './MealsMap.scss';
import React, { useState, useEffect, useRef, useContext } from 'react';
import Map, {
  NavigationControl,
  ScaleControl,
  GeolocateControl,
  Popup,
  Source,
  Layer,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ApiKeyContext } from '../../contexts/ApiKeyContext';
import mealList from '../../data/TDIN_MealList.json';
import MealMarker from '../../assets/icons/SafeHavenTO_icon-meal-marker.png';
import SelectedMealMarker from '../../assets/icons/SafeHavenTO_icon-meal.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { Drawer, Button, Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import {
  faMapMarkerAlt,
  faCity,
  faPeopleGroup,
  faGlobe,
  faPhone,
  faDog,
  faWheelchair,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import moment from 'moment';

export default function MealsMap() {
  const apiKey = useContext(ApiKeyContext); // API Key
  const [allDropIns, setAllDropIns] = useState([]); // Raw locations as an array
  const [selectedPlace, setSelectedPlace] = useState(null); // Sets the selected place upon marker click
  const [drawerVisible, setDrawerVisible] = useState(false); // Manage the drawer visibility
  const [activeKey, setActiveKey] = useState(null);
  const [lastClickedMarker, setLastClickedMarker] = useState(null); // State to track the last selected marker for detecting double taps
  const [dropIns, setDropIns] = useState([]);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null); // Track the ID of selected marker
  const [geoJsonLocations, setGeoJsonLocations] = useState({
    // GeoJSON representation for Mapbox
    // type: 'FeatureCollection',
    // features: allDropIns.map((dropIn) => ({
    //   type: 'Feature',
    //   properties: dropIn,
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [dropIn.longitude, dropIn.latitude],
    //   },
    // })),
  });

  const [viewState, setViewState] = useState({
    longitude: -79.384293,
    latitude: 43.653908,
    zoom: 11,
  });
  const DEFAULT_VIEW_STATE = {
    longitude: -79.409527,
    latitude: 43.678122,
    zoom: 10.5,
  };

  const mapRef = useRef(); // Reference to the map instance

  useEffect(() => {
    const fetchDropins = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/toronto/meals`
        );
        const data = response.data;
        setAllDropIns(data);
      } catch (error) {
        console.error('Error fetching drop-ins:', error);
      }
    };

    fetchDropins();
  }, []);

  useEffect(() => {
    setViewState(DEFAULT_VIEW_STATE); // Reset the view state to the default
    setSelectedPlace(null); // to deselect any currently selected marker on the map
    setSelectedMarkerId(null); // Also reset the selected marker ID
  }, []);

  useEffect(() => {
    // useEffect to update geoJsonLocations  --this will update the map markers when the filterType changes
    const features = allDropIns // Convert locations to GeoJSON format
      .map((dropIn) => ({
        type: 'Feature',
        properties: { ...dropIn }, // Copy all properties
        // name: dropIn.name,
        geometry: {
          // Add the coordinates
          type: 'Point',
          coordinates: [dropIn.longitude, dropIn.latitude],
        },
      }));

    console.log('FEATURES', features);

    setGeoJsonLocations({
      // Update the GeoJSON representation
      type: 'FeatureCollection',
      features,
    });
  }, [allDropIns]);

  const parseJSONFields = (data) => {
    const parsedData = { ...data };

    const fieldsToParse = ['address', 'contact', 'schedule'];

    fieldsToParse.forEach((field) => {
      if (typeof data[field] === 'string') {
        try {
          parsedData[field] = JSON.parse(data[field]);
        } catch (error) {
          console.error(`Error parsing ${field}:`, error);
        }
      }
    });

    return parsedData;
  };

  const handleMapLoad = () => {
    const map = mapRef.current.getMap();

    map.loadImage(MealMarker, (error, image) => {
      if (error) throw error;
      map.addImage('meal-marker', image);
    });

    map.loadImage(SelectedMealMarker, (error, image) => {
      if (error) throw error;
      map.addImage('selected-meal-marker', image);
    });

    function handleMouseEnter(e) {
      map.getCanvas().style.cursor = 'pointer';
    }

    function handleMouseLeave() {
      map.getCanvas().style.cursor = '';
    }

    // Add mouse and touch event listeners for markers
    map.on('mouseenter', 'drop-in-markers', handleMouseEnter);
    map.on('mouseleave', 'drop-in-markers', handleMouseLeave);

    // Touch-specific event handling
    map.on('touchstart', 'drop-in-markers', handleMouseEnter);
    map.on('touchend', 'drop-in-markers', handleMouseLeave);

    map.on('click', 'drop-in-markers', (e) => {
      if (e.features.length > 0) {
        const thisLocation = e.features[0].properties;

        // Use the refined helper function to parse JSON strings only if necessary
        const parsedLocation = parseJSONFields(thisLocation);

        // Set the selected marker ID
        setSelectedMarkerId(thisLocation.id);

        setSelectedPlace(parsedLocation);
        setDrawerVisible(true);
        console.log('Raw thisLocation:', thisLocation);
        console.log('Parsed thisLocation:', parsedLocation);

        // Prevent the map from zooming on marker click
        e.originalEvent.preventDefault();

        map.easeTo({
          center: e.features[0].geometry.coordinates,
          duration: 1000,
        });
        console.log('E.FEATURES[0]', e.features[0]);
      }
    });
  };

  const handleShowDrawer = () => {
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedPlace(null);
    setSelectedMarkerId(null); // Clear the selected marker ID when drawer is closed
  };

  console.log('SELECTEDPLACE======', selectedPlace);

  return (
    <>
      <section
        className='mealsMap-section'
        aria-label='Map showing weekly meal drop-ins Toronto'
      >
        {apiKey && (
          <Map
            ref={mapRef}
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)} // updates view state on marker click
            mapboxAccessToken={apiKey}
            style={{ width: '100%', height: '100%' }}
            mapStyle='mapbox://styles/mapbox/streets-v9'
            onLoad={handleMapLoad}
            cooperativeGestures // requires CMD + scroll to zoom --helps prevent accidental zooming
            maxBounds={[
              [-80.000039, 43.4], // Southwest coordinates
              [-78.700044, 44.0], // Northeast coordinates
            ]}
          >
            <NavigationControl position='bottom-right' />
            <ScaleControl />
            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
              position='bottom-right'
            />
            <Source id='meals' type='geojson' data={geoJsonLocations}>
              <Layer
                id='drop-in-markers'
                className='drop-in-marker'
                type='symbol'
                layout={{
                  'icon-image': [
                    'case',
                    ['==', ['get', 'id'], selectedMarkerId],
                    'selected-meal-marker',
                    'meal-marker',
                  ],
                  'icon-size': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    10,
                    0.1,
                    12,
                    0.095,
                    14,
                    0.08,
                  ],
                  'icon-allow-overlap': true,
                }}
              />
            </Source>
          </Map>
        )}
        <Drawer
          className='drawer'
          title={
            <>
              <br />
              <h1 className='drawer-header'>
                {selectedPlace ? selectedPlace.name : 'Details'}
              </h1>
              <span className='drawer-subheader'>
                {selectedPlace && selectedPlace.program_name
                  ? selectedPlace.program_name
                  : 'Drop-In Program'}
              </span>
            </>
          }
          placement='left'
          closable={true}
          onClose={handleCloseDrawer}
          open={drawerVisible}
          width={window.innerWidth > '768' ? '458px' : '100%'}
          closeIcon={false}
        >
          {selectedPlace && (
            <aside className='drawer__upper-text-container'>
              <div className='drawer__button-container'>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    selectedPlace.address +
                      ', ' +
                      selectedPlace.city +
                      ', ' +
                      selectedPlace.postal_code
                  )}&travelmode=walking`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn--Directions-anchor'
                  aria-label='Get Directions to Drop-In Location'
                >
                  <button className='drawer__button drawer-button'>
                    <span>
                      <FontAwesomeIcon icon={faRoute} size='lg' />
                    </span>
                    <p className='drawer__button--text drawer-button-text'>
                      {' '}
                      Directions
                    </p>
                  </button>
                </a>
                <a
                  href={selectedPlace.contact.phone.primary.number}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn--Directions-anchor'
                  aria-label='Get Directions to Drop-In Location'
                >
                  <button className='drawer__button drawer-button'>
                    <span>
                      <FontAwesomeIcon icon={faPhone} size='lg' />
                    </span>
                    <p className='drawer__button--text drawer-button-text'>
                      {' '}
                      Call
                    </p>
                  </button>
                </a>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    selectedPlace.address +
                      ', ' +
                      selectedPlace.city +
                      ', ' +
                      selectedPlace.postal_code
                  )}&travelmode=walking`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn--Directions-anchor'
                  aria-label='Get Directions to Drop-In Location'
                >
                  <button className='drawer__button drawer-button'>
                    <span>
                      <FontAwesomeIcon icon={faGlobe} size='lg' />
                    </span>
                    <p className='drawer__button--text drawer-button-text'>
                      {' '}
                      Website
                    </p>
                  </button>
                </a>
              </div>
              <br />
              <h2 className='drawer__details-header'>Details</h2>
              <p className='drawer__upper-text-left'>
                <FontAwesomeIcon
                  className='drawer-icon'
                  icon={faMapMarkerAlt}
                />{' '}
                <span className='drawer__upper-text-right'>
                  {selectedPlace.address.street} <br />
                  {selectedPlace.address.city}, {selectedPlace.address.province}{' '}
                  {selectedPlace.address.postal_code}
                </span>
              </p>
              <p className='drawer__upper-text-left'>
                <FontAwesomeIcon className='drawer-icon' icon={faPhone} />{' '}
                <span className='drawer__upper-text-right'>
                  <a
                    href='tel:{selectedPlace.contact.phone.primary.number}'
                    className='MealsMap-phone-link'
                    aria-label='Phone Number'
                  >
                    {' '}
                    {selectedPlace.contact.phone.primary.number}{' '}
                  </a>
                </span>
              </p>
              <p className='drawer__upper-text-left'>
                <FontAwesomeIcon className='drawer-icon' icon={faGlobe} />{' '}
                <a
                  className='MealsMap-site-link'
                  target='_blank'
                  href={selectedPlace.contact.website}
                  aria-label='Website Link'
                >
                  <span className='drawer__upper-text-right MealsMap-site-link'>
                    {selectedPlace.contact.website}
                  </span>
                </a>
              </p>
              <p className='drawer__upper-text-left'>
                <FontAwesomeIcon className='drawer-icon' icon={faPeopleGroup} />{' '}
                <span className='drawer__upper-text-right'>
                  {selectedPlace.population}
                </span>
              </p>
              <p className='drawer__upper-text-left'>
                <FontAwesomeIcon className='drawer-icon' icon={faDog} />{' '}
                <span className='drawer__upper-text-right'>
                  Service Dog Allowed:{' '}
                  {selectedPlace.service_dog_allowed ? 'Yes' : 'No'}
                </span>
              </p>
              <p className='drawer__upper-text-left'>
                <FontAwesomeIcon className='drawer-icon' icon={faWheelchair} />{' '}
                <span className='drawer__upper-text-right'>
                  Wheelchair Accessible:{' '}
                  {selectedPlace.wheelchair_accessible ? 'Yes' : 'No'}
                </span>
              </p>
              <br />

              <Collapse
                accordion
                ghost
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 180} />
                )}
                className='custom-collapse mealsMap-collapse'
                activeKey={activeKey}
                onChange={(key) => setActiveKey(key)}
                size='small'
              >
                <Collapse.Panel
                  header={
                    <>
                      <span>Meal Schedule</span>
                      {}
                    </>
                  }
                  key='1'
                  size='small'
                  className='mealsMap-collapse-panel'
                >
                  <div className='mealsMap__C1--DropIn-Schedule'>
                    {selectedPlace &&
                      selectedPlace.schedule &&
                      Object.entries(
                        typeof selectedPlace.schedule === 'string'
                          ? JSON.parse(selectedPlace.schedule) // Parse if it's a string
                          : selectedPlace.schedule // Use directly if it's an object
                      ).map(([day, details]) => (
                        <>
                          <div className='mealsMap__C1--Weekday-Div' key={day}>
                            {day && (
                              <div className='mealsMap__C1--Day-Container'>
                                <p className='mealsMap__C1--Day'>{day}</p>
                              </div>
                            )}
                            <div className='mealsMap__C1--Meal-Info-Container'>
                              {details.meals && details.meals.breakfast && (
                                <span className='mealsMap__C1--Meal-Span'>
                                  <p className='mealsMap__C1--Meal-Text'>
                                    Breakfast:
                                  </p>
                                  {details.meals.breakfast.start && (
                                    <p className='mealsMap__C1--Meal-Text'>{`${moment(
                                      details.meals.breakfast.start,
                                      'HH:mm'
                                    ).format('h:mm A')}`}</p>
                                  )}
                                  {details.meals.breakfast.end && (
                                    <p className='mealsMap__C1--Meal-Text'>
                                      -{' '}
                                      {`${moment(
                                        details.meals.breakfast.end,
                                        'HH:mm'
                                      ).format('h:mm A')}`}
                                    </p>
                                  )}
                                </span>
                              )}
                              {details.meals && details.meals.lunch && (
                                <span className='mealsMap__C1--Meal-Span'>
                                  <p className='mealsMap__C1--Meal-Text'>
                                    Lunch:
                                  </p>
                                  {details.meals.lunch.start && (
                                    <p className='mealsMap__C1--Meal-Text'>{`${moment(
                                      details.meals.lunch.start,
                                      'HH:mm'
                                    ).format('h:mm A')}`}</p>
                                  )}
                                  {details.meals.lunch.end && (
                                    <p className='mealsMap__C1--Meal-Text'>
                                      -{' '}
                                      {`${moment(
                                        details.meals.lunch.end,
                                        'HH:mm'
                                      ).format('h:mm A')}`}
                                    </p>
                                  )}
                                </span>
                              )}
                              {details.meals && details.meals.dinner && (
                                <span className='mealsMap__C1--Meal-Span'>
                                  <p className='mealsMap__C1--Meal-Text'>
                                    Dinner:
                                  </p>
                                  {details.meals.dinner.start && (
                                    <p className='mealsMap__C1--Meal-Text'>{`${moment(
                                      details.meals.dinner.start,
                                      'HH:mm'
                                    ).format('h:mm A')}`}</p>
                                  )}
                                  {details.meals.dinner.end && (
                                    <p className='mealsMap__C1--Meal-Text'>
                                      -{' '}
                                      {`${moment(
                                        details.meals.dinner.end,
                                        'HH:mm'
                                      ).format('h:mm A')}`}
                                    </p>
                                  )}
                                </span>
                              )}
                              {details.meals && details.meals.snack && (
                                <span className='mealsMap__C1--Meal-Span'>
                                  <p className='mealsMap__C1--Meal-Text'>
                                    Snack:
                                  </p>
                                  {details.meals.snack.start && (
                                    <p className='mealsMap__C1--Meal-Text'>{`${moment(
                                      details.meals.snack.start,
                                      'HH:mm'
                                    ).format('h:mm A')}`}</p>
                                  )}
                                  {details.meals.snack.end && (
                                    <p className='mealsMap__C1--Meal-Text'>
                                      -{' '}
                                      {`${moment(
                                        details.meals.snack.end,
                                        'HH:mm'
                                      ).format('h:mm A')}`}
                                    </p>
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                          <hr className='weekday-seperator' />
                        </>
                      ))}
                  </div>
                </Collapse.Panel>
                <Collapse.Panel
                  header={
                    <>
                      <span>Hours of Operation</span>
                    </>
                  }
                  key='2'
                  size='small'
                  className='mealsMap-collapse-panel'
                >
                  <div>
                    {selectedPlace &&
                      selectedPlace.schedule &&
                      Object.entries(
                        typeof selectedPlace.schedule === 'string'
                          ? JSON.parse(selectedPlace.schedule) // Parse if it's a string
                          : selectedPlace.schedule // Use directly if it's an object
                      ).map(([day, details]) => (
                        <div className='mealsMap__C2--Weekday-Div' key={day}>
                          <div className='mealsMap__C2--Day-Container'>
                            <p className='mealsMap__C2--Day'>{day}</p>
                          </div>

                          <span className='mealsMap__C2--Hours-Container-Array'>
                            {Array.isArray(details.hours) &&
                              details.hours.map((hour, index) => (
                                <p
                                  className='mealsMap__C2--Hours-Text'
                                  key={index}
                                >
                                  {hour.open === null
                                    ? 'Closed'
                                    : `${moment(hour.open, 'HH:mm').format(
                                        'h:mm A'
                                      )} - ${moment(hour.close, 'HH:mm').format(
                                        'h:mm A'
                                      )}`}
                                </p>
                              ))}

                            {!Array.isArray(details.hours) && (
                              <span className='mealsMap__C2--Hours-Container'>
                                {details.hours.open !== '' &&
                                details.hours.open !== 'closed' ? (
                                  <p className='mealsMap__C2--Hours-Text'>
                                    {moment(details.hours.open, 'HH:mm').format(
                                      'h:mm A'
                                    )}
                                  </p>
                                ) : details.hours.open === 'closed' ? (
                                  <span className='hours-closed'>Closed</span>
                                ) : details.hours.open === '' ? (
                                  ''
                                ) : (
                                  ''
                                )}

                                {details.hours.open !== '' &&
                                details.hours.open !== 'closed' ? (
                                  <span className='hours-dash'>-</span>
                                ) : (
                                  ''
                                )}
                                <p className='mealsMap__C2--Hours-Text'>
                                  {details.hours.close !== '' &&
                                  details.hours.close !== 'closed'
                                    ? `${moment(
                                        details.hours.close,
                                        'HH:mm'
                                      ).format('h:mm A')}`
                                    : details.hours.close === 'closed'
                                    ? ''
                                    : details.hours.close === ''
                                    ? ''
                                    : ''}
                                </p>
                              </span>
                            )}
                          </span>
                        </div>
                      ))}
                  </div>
                </Collapse.Panel>
              </Collapse>
            </aside>
          )}
        </Drawer>
      </section>
    </>
  );
}
