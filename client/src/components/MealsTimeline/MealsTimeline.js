import './MealsTimeline.scss';
import React, { useState, useEffect, useRef, useContext } from 'react';
import mealList from '../../data/TDIN_MealList.json';
import moment from 'moment';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import LiveClock from '../LiveClock/LiveClock';
import { useGeolocation } from '../../hooks/useGeolocation';
import * as turf from '@turf/turf';

const { Panel } = Collapse;

const MealsTimeline = () => {
  const { locationInfo } = useGeolocation();
  const [timelineItems, setTimelineItems] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [previousEvent, setPreviousEvent] = useState(null);
  const [nextEvents, setNextEvents] = useState([]);
  const timelineContainerRef = useRef(null);
  const currentEventRef = useRef(null);

  useEffect(() => {
    const today = moment().format('dddd').toLowerCase();
    let mealsForToday = [];

    if (mealList && mealList.regions) {
      Object.keys(mealList.regions).forEach((regionKey) => {
        const region = mealList.regions[regionKey];
        if (region.drop_in_centers && Array.isArray(region.drop_in_centers)) {
          region.drop_in_centers.forEach((center) => {
            const schedule = center.schedule
              ? center.schedule[today] || {}
              : {};
            const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

            mealTypes.forEach((mealType) => {
              if (schedule[mealType]) {
                const mealEntries = schedule[mealType]
                  .split('&')
                  .map((timeRange) => timeRange.trim());

                mealEntries.forEach((timeRange) => {
                  const [startTimeStr, endTimeStr] = timeRange
                    .split(' - ')
                    .map((t) => t.trim());
                  const startTime = moment(startTimeStr, 'h:mma').toDate();
                  const endTime = endTimeStr
                    ? moment(endTimeStr, 'h:mma').toDate()
                    : moment(startTimeStr, 'h:mma').add(1, 'hour').toDate();

                  const now = moment();
                  const isCurrent = now.isBetween(startTime, endTime);
                  const isEnded = now.isAfter(endTime);
                  const isComingUp =
                    now.isBefore(startTime) &&
                    moment(startTime).diff(now, 'hours') <= 2;

                  mealsForToday.push({
                    timeOfMeal: timeRange,
                    typeOfMeal:
                      mealType.charAt(0).toUpperCase() + mealType.slice(1),
                    providerOfMeal: center.name,
                    addressOfMeal: `${center.address}, ${center.city}`,
                    startTime,
                    endTime,
                    isCurrent,
                    isEnded,
                    isComingUp,
                    ...center,
                  });
                });
              }
            });
          });
        }
      });
    }

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
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    if (timelineContainerRef.current && currentEvents.length > 0) {
      const element = timelineContainerRef.current.querySelector(
        `[data-index="${timelineItems.indexOf(currentEvents[0])}"]`
      );
      if (element) {
        timelineContainerRef.current.scrollTo({
          top: element.offsetTop - timelineContainerRef.current.offsetTop,
          behavior: 'smooth',
        });
      }
    }
  }, [currentEvents, timelineItems]);

  const getDirectionsUrl = (providerOfMeal, addressOfMeal) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      `${providerOfMeal} ${addressOfMeal}`
    )}&travelmode=walking`;
  };

  return (
    <>
      <br />
      <article className='mealsTimeline-container'>
        <div className='mealsTimeline-upper'>
          <h1 className='mealsTimeline-live-clock'>
            <LiveClock />
          </h1>
          <br />
          <div className='mealsTimeline-live-event-container'>
            {previousEvent && (
              <div className='previous-event-container'>
                <h2 className='previous-event-header'>JUST ENDED</h2>
                <div className='previous-event-content'>
                  <h3>{previousEvent.typeOfMeal}</h3>
                  <p>{previousEvent.timeOfMeal}</p>
                  <p>{previousEvent.providerOfMeal}</p>
                  <p>{previousEvent.addressOfMeal}</p>
                </div>
              </div>
            )}
            {currentEvents.length > 0 ? (
              <div className='current-event-container'>
                <h2 className='current-event-header'>IN PROGRESS</h2>
                <p>Events happening right now</p>
                <br />
                <Collapse
                  className='mealsTimeline-ant-collapse'
                  accordion
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 180} />
                  )}
                >
                  {currentEvents.map((event, index) => (
                    <Panel
                      className='mealsTimeline-ant-collapse-header'
                      header={
                        <>
                          <span className='collapse__title'>
                            {event.typeOfMeal}{' '}
                          </span>
                          <span className='collapse__distance'>
                            {event.distance
                              ? `${event.distance} km`
                              : 'calculating..'}
                          </span>
                        </>
                      }
                      key={index}
                    >
                      <div className='current-ant-collapse-inner'>
                        <p>{event.timeOfMeal}</p>
                        <p> {event.providerOfMeal}</p>
                        <p>📍{event.addressOfMeal}</p>
                        <button
                          className='directions-button'
                          onClick={() =>
                            window.open(
                              getDirectionsUrl(
                                event.providerOfMeal,
                                event.addressOfMeal
                              )
                            )
                          }
                        >
                          Get Directions
                        </button>
                      </div>
                    </Panel>
                  ))}
                </Collapse>
              </div>
            ) : (
              <div className='current-event-container'>
                <h2 className='current-event-header'></h2>
                <p>
                  Sorry, looks like nothing is scheduled right now. <br />
                  Please refer to the timeline or check back later.
                </p>
              </div>
            )}
            {nextEvents.length > 0 ? (
              <div className='next-event-container'>
                <h2 className='next-event-header'>UP NEXT</h2>
                <p>Events starting in the next 2 hours.</p>
                <br />
                <Collapse
                  className='mealsTimeline-ant-collapse'
                  accordion
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 180} />
                  )}
                >
                  {nextEvents.map((event, index) => (
                    <Panel
                      className='mealsTimeline-ant-collapse-header'
                      header={
                        <>
                          <span className='collapse__title'>
                            {event.typeOfMeal}{' '}
                          </span>
                          <span className='collapse__distance'>
                            {event.distance
                              ? `(${event.distance} km)`
                              : 'calculating..'}
                          </span>
                        </>
                      }
                      key={index}
                    >
                      <div className='current-ant-collapse-inner'>
                        <p>{event.timeOfMeal}</p>
                        <p>{event.providerOfMeal}</p>
                        <p>📍{event.addressOfMeal}</p>
                      </div>
                    </Panel>
                  ))}
                </Collapse>
              </div>
            ) : (
              <div className='next-event-container'>
                <h2 className='next-event-header'></h2>
                <p>No upcoming events in the next 2 hours.</p>
              </div>
            )}
          </div>
        </div>
        <br />

        <div className='timeline-container' ref={timelineContainerRef}>
          <div className='timeline-wrapper'>
            <h1 className='timeline-wrapper__header'>
              Timeline of Today's Events
            </h1>
            {timelineItems.map((item, index) => (
              <div
                key={index}
                className={`timeline-item ${
                  item.isEnded
                    ? 'is-ended'
                    : item.isCurrent
                    ? 'happening-now'
                    : item.isComingUp
                    ? 'is-coming-up'
                    : ''
                }`}
                data-index={index}
                ref={
                  item.isCurrent
                    ? currentEventRef
                    : item.isComingUp
                    ? currentEventRef
                    : null
                }
              >
                <div className='timeline-item-time'>
                  {moment(item.startTime).format('h:mma')}
                </div>
                <hr className='timeline-divider' />
                <div className='timeline-item-content'>
                  <h3>{item.typeOfMeal}</h3>
                  <p>{item.timeOfMeal}</p>
                  <p>{item.providerOfMeal}</p>
                  <p>📍 {item.addressOfMeal}</p>
                  <button
                    className='directions-button'
                    onClick={() =>
                      window.open(
                        getDirectionsUrl(
                          item.providerOfMeal,
                          item.addressOfMeal
                        )
                      )
                    }
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </>
  );
};

export default MealsTimeline;
