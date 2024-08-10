import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import * as turf from '@turf/turf';
import { useGeolocation } from '../../../hooks/useGeolocation';

import './MealsCard.scss';
import MealsTimeline from '../MealsTimeline/MealsTimeline';
import MealsBanner from '../../MealsBanner/MealsBanner';
import { HashLink as Link } from 'react-router-hash-link';
import ComingSoon from '../../ComingSoon/ComingSoon';
import { Collapse, Space, Radio } from 'antd';
import MealsInProgress from '../MealsInProgress/MealsInProgress';
import MealsUpNext from '../MealsUpNext/MealsUpNext';


export default function MealsCard() {
  const [view, setView] = useState('timeline');
  const [liveView, setLiveView] = useState('');
  const [timelineItems, setTimelineItems] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [previousEvent, setPreviousEvent] = useState(null);
  const [nextEvents, setNextEvents] = useState([]);
  const [data, setData] = useState([]);
  const { locationInfo } = useGeolocation();


  useEffect(() => { // Fetch all drop-ins, with only today's schedules from the server
    const today = moment().format('dddd').toLowerCase();
    const fetchDropins = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/toronto/meals?day=${today}`);
        const data = response.data;
        setData(data);
        // console.log('DROP-INS FROM SERVER=====', data);
        processMeals(data, today);

      } catch (error) {
        console.error('Error fetching drop-ins:', error);
      }
    };

    fetchDropins();
  }, []);

  const processMeals = (data, today) => { // Filter to include schedules for today only and sort by start time
    let mealsForToday = [];
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'morning_snack', 'afternoon_snack', 'evening_snack', 'night_snack'];
    const filteredData = data.filter((meal) => meal.schedule[today] && meal.schedule[today].meals);
    console.log('FILTERED DATA=====', filteredData);

    filteredData.forEach((provider) => { // For each provider
      const schedule = provider.schedule[today].meals;

      mealTypes.forEach((mealType) => { // Then, for each meal type, create an entry if it exists,
        if (schedule[mealType]) {
          const mealEntries = schedule[mealType];

          const now = moment();
          const startTime = moment(mealEntries.start, "h:mm a").toDate(); // convert 24-hour clock to 12 hour AM/PM
          const endTime = mealEntries.end ? moment(mealEntries.end, "h:mm a").toDate() : moment(startTime).add(1, 'hours').toDate(); // convert 24-hour clock to 12 hour AM/PM

          const isCurrent = now.isBetween(startTime, endTime);
          const isEnded = now.isAfter(endTime);
          const isComingUp = now.isBefore(startTime) && moment(startTime).diff(now, 'hours') <= 2;

          mealsForToday.push({ // and add the entry to the mealsForToday array
            typeOfMeal: mealType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            timeOfMeal: `${moment(startTime).format('h:mma')} - ${moment(endTime).format('h:mma')}`,
            providerOfMeal: provider.name,
            addressOfMeal: `${provider.address.street}, ${provider.address.city}, ${provider.address.province}, ${provider.address.postal_code}`,
            startTime,
            endTime,
            isCurrent: isCurrent,
            isComingUp: isComingUp,
            isEnded: isEnded,
            wheelchair_accessible: provider.wheelchair_accessible,
            service_dog_allowed: provider.service_dog_allowed,
            latitude: provider.latitude,
            longitude: provider.longitude,
            ...provider
          });
        }
      });
    });

    const sortedMeals = mealsForToday.sort((a, b) => a.startTime - b.startTime);
    setTimelineItems(sortedMeals);

    const currentEvents = sortedMeals.filter((meal) => meal.isCurrent);
    const previousEventIndex = sortedMeals.findIndex((meal) => meal.isEnded) - 1; // Find the index of the last event that ended
    const nextEvents = sortedMeals.filter((meal) => meal.isComingUp);

    console.log('SORTED MEALS=====', sortedMeals);

    setCurrentEvents(currentEvents);
    setPreviousEvent(
      previousEventIndex !== null && previousEventIndex >= 0 ? sortedMeals[previousEventIndex] : null
    );
    setNextEvents(nextEvents);
  };

  useEffect(() => { // Calculate distance between user and events
    if (locationInfo) {
      const userLocation = turf.point([
        locationInfo.longitude,
        locationInfo.latitude,
      ]);
      console.log('UserLocation========', userLocation);

      const addDistanceToEvents = (events) => {
        return events.map((event) => {
          const eventLocation = turf.point([event.longitude, event.latitude]);
          const distance = turf
            .distance(userLocation, eventLocation, { units: 'kilometers' })
            .toFixed(1);
          return { ...event, distance };
        });
      };

      setCurrentEvents((prevEvents) => addDistanceToEvents(prevEvents));
      setNextEvents((prevEvents) => addDistanceToEvents(prevEvents));
    }
  }, [locationInfo]);


  const scrollToTop = (el) => {
    // need to fix this
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleView = (value) => {
    setView(value);
    setView(view === 'live' ? 'timeline' : 'live');

  };

  const toggleLiveView = () => {
    setLiveView(liveView === 'inProgress' ? 'upNext' : 'inProgress');
  };

  const getDirectionsUrl = (providerOfMeal, addressOfMeal) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      `${providerOfMeal} ${addressOfMeal}`
    )}&travelmode=walking`;
  };

  console.log('VIEWSTATE=====', view)

  return (
    <>
      <MealsBanner />
      <section className='meals-section' id='dropInMeals'>
        <div className='meals-section__upper'>
          <h3 className='meals-section__header' id='meals'>
            Toronto Drop-In Meals Daily Tracker
          </h3>

          {/* <DropInMealsToday /> */}
          {/* <MealsTimeline /> */}
          <Space className='mealsTimeline2-toggle-view'>
            <Radio.Group
              className='ant-radio-group'
              value={view}
              onChange={(e) => toggleView(e.target.value)}
            >
              <Radio.Button className='toggle-view-button' value='live' onClick={toggleView}>
                Live Updates
              </Radio.Button>
              <Radio.Button className='toggle-view-button' value='timeline' onClick={toggleView}>
                Daily Timeline
              </Radio.Button>
            </Radio.Group>
          </Space>

          {view === 'live' && (
            <div className='mealsTimeline2-live-toggle-view'>
              <button
                className='toggle-view-secondary-button'
                onClick={toggleLiveView}
              >
                {'In Progress'}
              </button>
              <button
                className='toggle-view-secondary-button'
                onClick={toggleLiveView}
              >
                {'Up Next'}
              </button>
            </div>
          )}
        </div>






        <div className='meals-section__lower'>
          {/* {view === 'live' &&  (
            <DropInMealsToday liveView={liveView} />
          )} */}

          {view === 'timeline' && (
            <MealsTimeline timelineItems={timelineItems} getDirectionsUrl={getDirectionsUrl} />
          )}

          {view === 'live' && liveView === 'upNext' &&  (
            <MealsUpNext nextEvents={nextEvents} getDirectionsUrl={getDirectionsUrl}  />
          )}

          {view === 'live' && liveView === 'inProgress' &&  (

            <MealsInProgress currentEvents={currentEvents} getDirectionsUrl={getDirectionsUrl}  />

          )}






          <Link to='/drop-in-map' scroll={scrollToTop} aria-label='Link to Drop-In Map'>
            <h3 className='meals-section__map-link'>
              EXPLORE DROP-IN MAP ⟩⟩
            </h3>
          </Link>
        </div>
        {/* <ComingSoon
            title="New Drop-In Meals UI Coming Soon!"
            message="A more intuitive solution is on the way -- this upcoming tool will provide essential info on drop-in meals, helping you locate services quickly and efficiently.  Sincerely grateful for the patience and support, stay safe."
            height='100%'
            width='80%'
        /> */}
      </section>
    </>
  );
}
