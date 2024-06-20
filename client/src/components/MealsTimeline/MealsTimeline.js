import './MealsTimeline.scss';
import React, { useState, useEffect, useRef } from 'react';
import mealList from '../../data/TDIN_MealList.json';
import moment from 'moment';
import { Collapse, Space, Switch, Radio } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import LiveClock from '../LiveClock/LiveClock';
import { useGeolocation } from '../../hooks/useGeolocation';
import * as turf from '@turf/turf';
import HoverPopover from '../AntDesign/HoverPopover';

const { Panel } = Collapse;

const MealsTimeline = () => {
  const { locationInfo } = useGeolocation();
  const [view, setView] = useState('live');
  const [liveView, setLiveView] = useState('inProgress');
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
                    title: timeRange,
                    cardTitle:
                      mealType.charAt(0).toUpperCase() + mealType.slice(1),
                    cardSubtitle: center.name,
                    cardDetailedText: `Address: ${center.address}, ${center.city}`,
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

  const toggleView = (value) => {
    setView(value);
  };

  const toggleLiveView = () => {
    setLiveView(liveView === 'inProgress' ? 'upNext' : 'inProgress');
  };

  return (
    <>
      <aside className='mealsTimeline-live-clock-container'>
        <h1 className='mealsTimeline-live-clock'>
          <LiveClock />
        </h1>
      </aside>
      <br />

      <Space className='mealsTimeline-toggle-view'>
        <Radio.Group
          className='ant-radio-group'
          value={view}
          onChange={(e) => toggleView(e.target.value)}
        >
          <Radio.Button className='toggle-view-button' value='live'>
            Live Updates
          </Radio.Button>
          <Radio.Button className='toggle-view-button' value='timeline'>
            Today's Schedule
          </Radio.Button>
        </Radio.Group>
      </Space>

      {view === 'live' && (
        <div className='mealsTimeline-live-toggle-view'>
          <button
            className='toggle-view-secondary-button'
            onClick={toggleLiveView}
          >
            {liveView === 'inProgress' ? 'Starting Soon' : 'In Progress'}
          </button>
        </div>
      )}

      <article className='mealsTimeline-container'>
        {view === 'timeline' ? (
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
                    <h3 className='timeline-item-content-h3'>
                      {item.cardTitle}
                    </h3>
                    <p className='timeline-item-content-title'>{item.title}</p>
                    <p className='timeline-item-content-subtitle'>
                      {item.cardSubtitle}
                    </p>
                    <p className='timeline-item-content-text'>
                      📍 {item.cardDetailedText}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className='mealsTimeline-live-event-container'>
            <div
              className={`event-card ${
                liveView === 'inProgress' ? 'active' : 'inactive'
              }`}
            >
              {previousEvent && (
                <div className='previous-event-container'>
                  <h2 className='previous-event-header'>JUST ENDED</h2>
                  <div className='previous-event-content'>
                    <h3>{previousEvent.cardTitle}</h3>
                    <p>{previousEvent.title}</p>
                    <p>{previousEvent.cardSubtitle}</p>
                    <p>{previousEvent.cardDetailedText}</p>
                  </div>
                </div>
              )}
              {currentEvents.length > 0 ? (
                <div className='current-event-container'>
                  <h2 className='current-event-header'>IN PROGRESS</h2>
                  <p className='current-event-subtext'>
                    Events happening right now.
                  </p>
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
                              {event.cardTitle}{' '}
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
                          <p>{event.title}</p>
                          <p>{event.cardSubtitle}</p>
                          <p>{event.cardDetailedText}</p>
                        </div>
                      </Panel>
                    ))}
                  </Collapse>
                </div>
              ) : (
                <div className='current-event-container'>
                  <h2 className='current-event-header'></h2>
                  <p className='current-event-subtext'>
                    Sorry, looks like we don't have anything scheduled right
                    now. Please refer to the timetable or check back later 🤍{' '}
                  </p>
                </div>
              )}
            </div>
            <div
              className={`event-card ${
                liveView === 'upNext' ? 'active' : 'inactive'
              }`}
            >
              {nextEvents.length > 0 ? (
                <div className='next-event-container'>
                  <h2 className='next-event-header'>UP NEXT</h2>
                  <p className='next-event-subtext'>
                    Events starting in the next 2 hours.
                  </p>
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
                              {event.cardTitle}{' '}
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
                          <p>{event.title}</p>
                          <p>{event.cardSubtitle}</p>
                          <p>{event.cardDetailedText}</p>
                        </div>
                      </Panel>
                    ))}
                  </Collapse>
                </div>
              ) : (
                <div className='next-event-container'>
                  <h2 className='next-event-header'></h2>
                  <p className='next-event-subtext'>
                    No upcoming events in the next 2 hours.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </article>
    </>
  );
};

export default MealsTimeline;
