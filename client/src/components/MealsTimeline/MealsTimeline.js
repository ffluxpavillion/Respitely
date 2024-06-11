import React, { useState, useEffect } from 'react';
import { Chrono } from 'react-chrono';
import mealList from '../../data/TDIN_MealList.json';
import './MealsTimeline.scss';
import moment from 'moment';

const MealsTimeline = () => {
  const [timelineItems, setTimelineItems] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    const today = moment().format('dddd').toLowerCase();
    let mealsForToday = [];

    Object.keys(mealList.regions).forEach((regionKey) => {
      // for each region
      mealList.regions[regionKey].drop_in_centers.forEach((center) => {
        // for each center
        const schedule = center.schedule[today] || {};
        const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

        mealTypes.forEach((mealType) => {
          // for each meal type
          if (schedule[mealType]) {
            const mealEntries = schedule[mealType]
              .split('&')
              .map((timeRange) => timeRange.trim()); // split by '&' and trim each entry

            mealEntries.forEach((timeRange) => {
              // for each time range
              const [startTimeStr, endTimeStr] = timeRange
                .split(' - ')
                .map((t) => t.trim()); // split by ' - ' and trim each entry
              const startTime = moment(startTimeStr, 'h:mma').toDate(); // setting start of timeline (current time marker --todo)
              const endTime = endTimeStr
                ? moment(endTimeStr, 'h:mma').toDate()
                : null; // setting end of timeline (current time marker --todo)

              mealsForToday.push({
                // add to mealsForToday array
                title: timeRange,
                cardTitle: mealType.charAt(0).toUpperCase() + mealType.slice(1),
                cardSubtitle: center.name,
                cardDetailedText: `Address: ${center.address}, ${center.city}`,
                startTime,
                endTime,
                isCurrent: moment().isBetween(startTime, endTime || startTime),
                ...center,
              });
            });
          }
        });
      });
    });

    const sortedMeals = mealsForToday.sort((a, b) => a.startTime - b.startTime); // sort by start time
    setTimelineItems(sortedMeals);

    const currentEventIndex = sortedMeals.findIndex((meal) => meal.isCurrent); // find current event index for happening now
    setCurrentEventIndex(currentEventIndex !== -1 ? currentEventIndex : 0);
  }, []);

  return (
    <div
      className='mealsTimeline-container'
      style={{ width: '60vw', height: '60vh' }}
    >
      <div className='timeline-wrapper'>
        <Chrono
          items={timelineItems}
          mode='VERTICAL'
          cardHeight={'100'}
          disableToolbar={true}
          highlightCardsOnHover={true}
          fontSizes
          slideShow={false}
          darkMode={true}
          enableQuickJump={true}
          activeItemIndex={currentEventIndex}
          theme={{
            primary: '#6232c1',
            secondary: 'white',
            cardForeColor: 'white',
            titleColor: 'white',
          }}
          enableDarkToggle={true}
          allowDynamicUpdate
          scrollable={{ scrollbar: true }}
          classNames={{
            card: ({ index }) =>
              index === currentEventIndex ? 'my-card current-event' : 'my-card',
            cardMedia: 'my-card-media',
            cardSubTitle: 'my-card-subtitle',
            cardText: 'my-card-text',
            cardTitle: 'my-card-title',
            controls: 'my-controls',
            title: ({ index }) =>
              index === currentEventIndex
                ? 'my-title current-event-title'
                : 'my-title',
          }}
        />
      </div>
    </div>
  );
};

export default MealsTimeline;
