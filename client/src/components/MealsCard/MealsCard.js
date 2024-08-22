import { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import axios from 'axios';
import * as turf from '@turf/turf';
import { useGeolocation } from '../../hooks/useGeolocation';
import LiveClock from '../LiveClock/LiveClock';
import './MealsCard.scss';
import MealsBanner from '../MealsBanner/MealsBanner';
import MealsTimeline from '../MealsTimeline/MealsTimeline';
import MealsInProgress from '../MealsInProgress/MealsInProgress';
import MealsUpNext from '../MealsUpNext/MealsUpNext';
import { HashLink as Link } from 'react-router-hash-link';
import ComingSoon from '../ComingSoon/ComingSoon';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
// import { useDateTime } from '../../../contexts/DateTimeContext';


export default function MealsCard() {
  const [view, setView] = useState('timeline');
  const [timelineItems, setTimelineItems] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [previousEvent, setPreviousEvent] = useState(null);
  const [nextEvents, setNextEvents] = useState([]);
  const [data, setData] = useState([]);
  const { locationInfo } = useGeolocation();
  // const { todaysDate, currentTime } = useDateTime();

  useEffect(() => {
    const today = moment.tz('America/Toronto').format('dddd').toLowerCase();
    const fetchDropins = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/toronto/meals?day=${today}`
        );
        const data = response.data;
        setData(data);
        processMeals(data, today);
      } catch (error) {
        console.error('Error fetching drop-ins:', error);
      }
    };

    fetchDropins();
  }, []);

  const processMeals = (data, today) => {
    let mealsForToday = [];
    const mealTypes = [
      'breakfast',
      'lunch',
      'dinner',
      'morning_snack',
      'afternoon_snack',
      'evening_snack',
      'night_snack',
    ];
    const filteredData = data.filter(
      (meal) => meal.schedule[today] && meal.schedule[today].meals
    );

    filteredData.forEach((provider) => {
      const schedule = provider.schedule[today].meals;

      mealTypes.forEach((mealType) => {
        if (schedule[mealType]) {
          const mealEntries = schedule[mealType];

          const now = moment.tz('America/Toronto');
          const startTime = moment(mealEntries.start, 'h:mm a').toDate();
          const endTime = mealEntries.end
            ? moment(mealEntries.end, 'h:mm a').toDate()
            : moment(startTime).add(1, 'hours').toDate();

          const isCurrent = now.isBetween(startTime, endTime);
          const isEnded = now.isAfter(endTime);
          const isComingUp =
            now.isBefore(startTime) &&
            moment(startTime).diff(now, 'hours') <= 2;

          mealsForToday.push({
            typeOfMeal: mealType
              .split('_')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' '),
            timeOfMeal: `${moment(startTime).format('h:mma')} - ${moment(
              endTime
            ).format('h:mma')}`,
            providerOfMeal: provider.name,
            addressOfMeal: `${provider.address.street}, ${provider.address.city}, ${provider.address.province}, ${provider.address.postal_code}`,
            startTime,
            endTime,
            isCurrent,
            isComingUp,
            isEnded,
            wheelchair_accessible: provider.wheelchair_accessible,
            service_dog_allowed: provider.service_dog_allowed,
            latitude: provider.latitude,
            longitude: provider.longitude,
            ...provider,
          });
        }
      });
    });

    const sortedMeals = mealsForToday.sort((a, b) => a.startTime - b.startTime);
    setTimelineItems(sortedMeals);

    const currentEvents = sortedMeals.filter((meal) => meal.isCurrent);
    const previousEventIndex =
      sortedMeals.findIndex((meal) => meal.isEnded) - 1;
    const nextEvents = sortedMeals.filter((meal) => meal.isComingUp);

    setCurrentEvents(currentEvents);
    setPreviousEvent(
      previousEventIndex !== null && previousEventIndex >= 0
        ? sortedMeals[previousEventIndex]
        : null
    );
    setNextEvents(nextEvents);
  };

  useEffect(() => {
    if (locationInfo) {
      const userLocation = turf.point([
        locationInfo.longitude,
        locationInfo.latitude,
      ]);

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
      setTimelineItems((prevEvents) => addDistanceToEvents(prevEvents));
    }
  }, [locationInfo]);

  const scrollToTop = (el) => {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getDirectionsUrl = (providerOfMeal, addressOfMeal) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      `${providerOfMeal} ${addressOfMeal}`
    )}&travelmode=walking`;
  };

  // console.log('TimelineItems======', timelineItems)
  // console.log('CurrentEvents======', currentEvents)
  return (
    <>
      <MealsBanner />
      <section className='meals-section' id='dropInMeals'>
        <div className='meals-section__upper'>
          <h3 className='meals-section__header' id='meals'>
            Toronto Drop-In Meals Daily Tracker
          </h3>

          <br />
          <br />

          <Tabs
            defaultValue='timeline'
            onValueChange={setView}
            className='mc-tabs__container'
          >
            <TabsList className='mc-tabs__list'>
              <TabsTrigger className='mc-tab' value='inProgress'>
                In Progress
                <span className='mc-toggle-number'>
                  {' '}
                  {currentEvents ? `(${currentEvents.length})` : ''}
                </span>
              </TabsTrigger>
              <TabsTrigger className='mc-tab middle-tab' value='upNext'>
                Up Next
                <span className='mc-toggle-number'>
                  {' '}
                  {nextEvents ? `(${nextEvents.length})` : ''}
                </span>
              </TabsTrigger>
              <TabsTrigger className='mc-tab' value='timeline'>
                Daily Timeline
              </TabsTrigger>
            </TabsList>

            <h1 className='mc-live-clock'>
              <LiveClock />
            </h1>

            <TabsContent className='mc-tab-content' value='timeline'>
              <MealsTimeline
                timelineItems={timelineItems}
                getDirectionsUrl={getDirectionsUrl}
              />
            </TabsContent>

            <TabsContent className='mc-tab-content' value='upNext'>
              <MealsUpNext
                nextEvents={nextEvents}
                getDirectionsUrl={getDirectionsUrl}
              />
            </TabsContent>

            <TabsContent className='mc-tab-content' value='inProgress'>
              <MealsInProgress
                currentEvents={currentEvents}
                getDirectionsUrl={getDirectionsUrl}
              />
            </TabsContent>
          </Tabs>

          <br />
        </div>

               {/* <ComingSoon
            title="New Drop-In Meals UI Coming Soon!"
            message="A more intuitive solution is on the way -- this upcoming tool will provide essential info on drop-in meals, helping you locate services quickly and efficiently.  Sincerely grateful for the patience and support, stay safe."
            height='100%'
            width='80%'
        /> */}

        <div className='meals-section__lower'></div>
        <Link
          to='/drop-in-map'
          scroll={scrollToTop}
          aria-label='Link to Drop-In Map'
        >
          <h3 className='meals-section__map-link'>EXPLORE DROP-IN MAP ⟩⟩</h3>
        </Link>
      </section>
    </>
  );
}
