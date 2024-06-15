import './MealsTimeline.scss';
import React, { useState, useEffect, useRef } from 'react';
import mealList from '../../data/TDIN_MealList.json';
import moment from 'moment';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

import LiveClock from '../LiveClock/LiveClock';

const { Panel } = Collapse;

const MealsTimeline = () => {
  const [timelineItems, setTimelineItems] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [previousEvent, setPreviousEvent] = useState(null);
  const [nextEvent, setNextEvent] = useState(null);
  const timelineContainerRef = useRef(null);
  const currentEventRef = useRef(null);

  useEffect(() => {
    const today = moment().format('dddd').toLowerCase();
    let mealsForToday = [];

    Object.keys(mealList.regions).forEach((regionKey) => {
      mealList.regions[regionKey].drop_in_centers.forEach((center) => {
        const schedule = center.schedule[today] || {};
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
                moment(startTime).diff(now, 'hours') <= 1;

              mealsForToday.push({
                title: timeRange,
                cardTitle: mealType.charAt(0).toUpperCase() + mealType.slice(1),
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
    });

    const sortedMeals = mealsForToday.sort((a, b) => a.startTime - b.startTime);
    setTimelineItems(sortedMeals);

    const currentEvents = sortedMeals.filter((meal) => meal.isCurrent);
    const previousEventIndex =
      sortedMeals.findIndex((meal) => meal.isEnded) - 1;
    const nextEventIndex = sortedMeals.findIndex((meal) => meal.isComingUp);

    setCurrentEvents(currentEvents);
    setPreviousEvent(
      previousEventIndex !== null && previousEventIndex >= 0
        ? sortedMeals[previousEventIndex]
        : null
    );
    setNextEvent(
      nextEventIndex !== null && nextEventIndex < sortedMeals.length
        ? sortedMeals[nextEventIndex]
        : null
    );
  }, []);

  // useEffect(() => {
  //   if (timelineContainerRef.current && currentEvents.length > 0) {
  //     const element = timelineContainerRef.current.querySelector(`[data-index="${timelineItems.indexOf(currentEvents[0])}"]`);
  //     if (element) {
  //       element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  //     }
  //   }
  // }, [currentEvents, timelineItems]);

  return (
    <>
      <article className='mealsTimeline-container'>
        <div className='mealsTimeline-live-event-container'>
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
          {currentEvents.length > 0 && (
            <div className='current-event-container'>
              <h2 className='current-event-header'>HAPPENING NOW</h2>
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
                    header={event.cardTitle}
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
          )}
          {nextEvent && (
            <div className='next-event-container'>
              <h2 className='next-event-header'>COMING UP</h2>
              <div className='next-event-content'>
                <h3>{nextEvent.cardTitle}</h3>
                <p>{nextEvent.title}</p>
                <p>{nextEvent.cardSubtitle}</p>
                <p>{nextEvent.cardDetailedText}</p>
              </div>
            </div>
          )}
        </div>
        <br />
        <h1 className='mealsTimeline-live-clock'>
          <LiveClock />
        </h1>
        <div className='timeline-container' ref={timelineContainerRef}>
          <div className='timeline-wrapper'>
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
                  <h3>{item.cardTitle}</h3>
                  <p>{item.title}</p>
                  <p>{item.cardSubtitle}</p>
                  <p>{item.cardDetailedText}</p>
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
