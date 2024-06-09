import React, { useState, useEffect } from 'react';
import { Chrono } from 'react-chrono';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRoute,
  faMapMarkerAlt,
  faPhone,
  faGlobe,
  faPeopleGroup,
  faDog,
  faWheelchair,
} from '@fortawesome/free-solid-svg-icons';
import mealList from '../../data/TDIN_MealList.json';
import './MealsTimeline.scss';
import moment from 'moment';

const MealsTimeline = () => {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [timelineItems, setTimelineItems] = useState([]);
  const [currentTimePosition, setCurrentTimePosition] = useState(0);

  useEffect(() => {
    const today = moment().format('dddd').toLowerCase();
    const mealsForToday = Object.keys(mealList.regions).reduce(
      (acc, regionKey) => {
        const region = mealList.regions[regionKey];
        const meals = region.drop_in_centers.flatMap((center) => {
          const schedule = center.schedule[today] || {};
          const mealTimes = [];

          if (schedule.breakfast)
            mealTimes.push({ type: 'Breakfast', time: schedule.breakfast });
          if (schedule.lunch)
            mealTimes.push({ type: 'Lunch', time: schedule.lunch });
          if (schedule.dinner)
            mealTimes.push({ type: 'Dinner', time: schedule.dinner });
          if (schedule.snack)
            mealTimes.push({ type: 'Snack', time: schedule.snack });

          return mealTimes.map((meal) => ({
            title: meal.time,
            cardTitle: meal.type,
            cardSubtitle: `${center.name}`,
            cardDetailedText: `Address: ${center.address}, ${center.city}`,
            startTime: moment(meal.time, 'h:mm a').toDate(),
            ...center,
            ...meal,
          }));
        });
        return acc.concat(meals);
      },
      []
    );

    // Sort meals by start time
    const sortedMeals = mealsForToday.sort((a, b) => a.startTime - b.startTime);
    setTimelineItems(sortedMeals);

    // Calculate the position of the current time marker
    const now = moment();
    const startOfDay = moment().startOf('day');
    const totalMinutesInDay = 1440; // 24 * 60

    const minutesSinceStartOfDay = now.diff(startOfDay, 'minutes');
    const currentTimePercentage =
      (minutesSinceStartOfDay / totalMinutesInDay) * 100;
    setCurrentTimePosition(currentTimePercentage);
  }, []);

  return (
    <div
      className='mealsTimeline-container'
      style={{ width: '60vw', height: '60vh' }}
    >
      <div className='timeline-wrapper'>
        <Chrono
          items={timelineItems}
          // mode='HORIZONTAL'
          mode='VERTICAL'
          cardHeight={'100'}
          disableToolbar={true}
          highlightCardsOnHover={true}
          fontSizes
          slideShow={false}
          darkMode={true}
          enableQuickJump={true}
          theme={{
            primary: '#6232c1',
            secondary: 'white',
            // cardBgColor: '#202020',
            cardForeColor: 'white',
            titleColor: 'white',
          }}
          enableDarkToggle={true}
          allowDynamicUpdate
          scrollable={{ scrollbar: true }}
          classNames={{
            card: 'my-card',
            cardMedia: 'my-card-media',
            cardSubTitle: 'my-card-subtitle',
            cardText: 'my-card-text',
            cardTitle: 'my-card-title',
            controls: 'my-controls',
            title: 'my-title',
          }}

          // onItemSelected={(item) => handleShowDrawer(item)}
        />
        <div
          className='current-time-indicator'
          style={{ left: `${currentTimePosition}%` }}
        ></div>
      </div>
    </div>
  );
};

export default MealsTimeline;
