// import React, { useState, useEffect, useRef } from 'react';
// import { Chrono } from 'react-chrono';
// import mealList from '../../data/TDIN_MealList.json';
// import './MealsTimeline.scss';
// import moment from 'moment';

// const MealsTimeline = () => {
//   const [timelineItems, setTimelineItems] = useState([]);
//   const [currentEvent, setCurrentEvent] = useState(null);
//   const [previousEvent, setPreviousEvent] = useState(null);
//   const [nextEvent, setNextEvent] = useState(null);
//   const [todaysDate, setTodaysDate] = useState(moment().format('dddd MMMM Do YYYY, h:mm:ss a'));
//   const timelineContainerRef = useRef(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTodaysDate(moment().format('dddd MMMM Do YYYY, h:mm:ss a'));
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   useEffect(() => {
//     const today = moment().format('dddd').toLowerCase();
//     let mealsForToday = [];

//     Object.keys(mealList.regions).forEach((regionKey) => {
//       mealList.regions[regionKey].drop_in_centers.forEach((center) => {
//         const schedule = center.schedule[today] || {};
//         const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

//         mealTypes.forEach((mealType) => {
//           if (schedule[mealType]) {
//             const mealEntries = schedule[mealType]
//               .split('&')
//               .map((timeRange) => timeRange.trim());

//             mealEntries.forEach((timeRange) => {
//               const [startTimeStr, endTimeStr] = timeRange
//                 .split(' - ')
//                 .map((t) => t.trim());
//               const startTime = moment(startTimeStr, 'h:mma').toDate();
//               const endTime = endTimeStr ? moment(endTimeStr, 'h:mma').toDate() : null;

//               mealsForToday.push({
//                 title: timeRange,
//                 cardTitle: mealType.charAt(0).toUpperCase() + mealType.slice(1),
//                 cardSubtitle: center.name,
//                 cardDetailedText: `Address: ${center.address}, ${center.city}`,
//                 startTime,
//                 endTime,
//                 isCurrent: moment().isBetween(startTime, endTime || startTime),
//                 ...center,
//               });
//             });
//           }
//         });
//       });
//     });

//     const sortedMeals = mealsForToday.sort((a, b) => a.startTime - b.startTime);
//     setTimelineItems(sortedMeals);

//     const currentEventIndex = sortedMeals.findIndex((meal) => meal.isCurrent);
//     const previousEventIndex = currentEventIndex > 0 ? currentEventIndex - 1 : null;
//     const nextEventIndex = currentEventIndex < sortedMeals.length - 1 ? currentEventIndex + 1 : null;

//     setCurrentEvent(currentEventIndex !== -1 ? sortedMeals[currentEventIndex] : null);
//     setPreviousEvent(previousEventIndex !== null ? sortedMeals[previousEventIndex] : null);
//     setNextEvent(nextEventIndex !== null ? sortedMeals[nextEventIndex] : null);
//   }, []);

//   useEffect(() => {
//     if (timelineContainerRef.current && currentEvent) {
//       const element = timelineContainerRef.current.querySelector(`[data-index="${timelineItems.indexOf(currentEvent)}"]`);
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//     }
//   }, [currentEvent, timelineItems]);

//   return (
//     <>
//       <h1>{todaysDate}</h1>
//       <div className='mealsTimeline-live-event-cards'>
//         {previousEvent && (
//           <>
//             <div className='previous-event-container'>
//               <h2 className='previous-event-header'>JUST FINISHED</h2>
//               <div className='previous-event-content'>
//                 <h3>{previousEvent.cardTitle}</h3>
//                 <p>{previousEvent.title}</p>
//                 <p>{previousEvent.cardSubtitle}</p>
//                 <p>{previousEvent.cardDetailedText}</p>
//               </div>
//             </div>
//           </>
//         )}
//         {currentEvent && (
//           <>
//             <div className='current-event-container'>
//             <h2 className='current-event-header'>HAPPENING NOW</h2>
//               <div className='current-event-content'>
//                 <h3>{currentEvent.cardTitle}</h3>
//                 <p>{currentEvent.title}</p>
//                 <p>{currentEvent.cardSubtitle}</p>
//                 <p>{currentEvent.cardDetailedText}</p>
//               </div>
//             </div>
//           </>
//         )}
//         {nextEvent && (
//           <>
//             <div className='next-event-container'>
//               <h2 className='next-event-header'>UP NEXT</h2>
//               <div className='next-event-content'>
//                 <h3>{nextEvent.cardTitle}</h3>
//                 <p>{nextEvent.title}</p>
//                 <p>{nextEvent.cardSubtitle}</p>
//                 <p>{nextEvent.cardDetailedText}</p>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//       <div
//         className='mealsTimeline-container'
//         style={{ width: '60vw', height: '60vh' }}
//         ref={timelineContainerRef}
//       >
//         <div className='timeline-wrapper'>
//           <Chrono
//             items={timelineItems}
//             mode='VERTICAL'
//             cardHeight={'100'}
//             disableToolbar={true}
//             highlightCardsOnHover={true}
//             fontSizes
//             slideShow={false}
//             darkMode={true}
//             enableQuickJump={true}
//             activeItemIndex={timelineItems.indexOf(currentEvent)}
//             theme={{
//               primary: '#6232c1',
//               secondary: 'white',
//               cardForeColor: 'white',
//               titleColor: 'white',
//             }}
//             enableDarkToggle={true}
//             allowDynamicUpdate
//             scrollable={{ scrollbar: true }}
//             classNames={{
//               card: ({ index }) =>
//                 index === timelineItems.indexOf(currentEvent) ? 'my-card current-event' : 'my-card',
//               cardMedia: 'my-card-media',
//               cardSubTitle: 'my-card-subtitle',
//               cardText: 'my-card-text',
//               cardTitle: 'my-card-title',
//               controls: 'my-controls',
//               title: ({ index }) =>
//                 index === timelineItems.indexOf(currentEvent)
//                   ? 'my-title current-event-title'
//                   : 'my-title',
//             }}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default MealsTimeline;

import React, { useState, useEffect, useRef } from 'react';
import mealList from '../../data/TDIN_MealList.json';
import './MealsTimeline.scss';
import moment from 'moment';

const MealsTimeline = () => {
  const [timelineItems, setTimelineItems] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [previousEvent, setPreviousEvent] = useState(null);
  const [nextEvent, setNextEvent] = useState(null);
  const [todaysDate, setTodaysDate] = useState(
    moment().format('dddd MMMM Do YYYY, h:mm:ss a')
  );
  const timelineContainerRef = useRef(null);
  const currentEventRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTodaysDate(moment().format('dddd MMMM Do YYYY, h:mm:ss a'));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
                : null;

              mealsForToday.push({
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

    const sortedMeals = mealsForToday.sort((a, b) => a.startTime - b.startTime);
    setTimelineItems(sortedMeals);

    const currentEventIndex = sortedMeals.findIndex((meal) => meal.isCurrent);
    const previousEventIndex =
      currentEventIndex > 0 ? currentEventIndex - 1 : null;
    const nextEventIndex =
      currentEventIndex < sortedMeals.length - 1 ? currentEventIndex + 1 : null;

    setCurrentEvent(
      currentEventIndex !== -1 ? sortedMeals[currentEventIndex] : null
    );
    setPreviousEvent(
      previousEventIndex !== null ? sortedMeals[previousEventIndex] : null
    );
    setNextEvent(nextEventIndex !== null ? sortedMeals[nextEventIndex] : null);
  }, []);

  useEffect(() => {
    if (currentEventRef.current) {
      currentEventRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentEvent]);

  return (
    <>
      <h1>{todaysDate}</h1>
      <div className='mealsTimeline-live-event-cards'>
        {previousEvent && (
          <>
            <div className='previous-event-container'>
              <h2 className='previous-event-header'>JUST FINISHED</h2>
              <div className='previous-event-content'>
                <h3>{previousEvent.cardTitle}</h3>
                <p>{previousEvent.title}</p>
                <p>{previousEvent.cardSubtitle}</p>
                <p>{previousEvent.cardDetailedText}</p>
              </div>
            </div>
          </>
        )}
        {currentEvent && (
          <>
            <div className='current-event-container'>
              <h2 className='current-event-header'>HAPPENING NOW</h2>
              <div className='current-event-content'>
                <h3>{currentEvent.cardTitle}</h3>
                <p>{currentEvent.title}</p>
                <p>{currentEvent.cardSubtitle}</p>
                <p>{currentEvent.cardDetailedText}</p>
              </div>
            </div>
          </>
        )}
        {nextEvent && (
          <>
            <div className='next-event-container'>
              <h2 className='next-event-header'>UP NEXT</h2>
              <div className='next-event-content'>
                <h3>{nextEvent.cardTitle}</h3>
                <p>{nextEvent.title}</p>
                <p>{nextEvent.cardSubtitle}</p>
                <p>{nextEvent.cardDetailedText}</p>
              </div>
            </div>
          </>
        )}
      </div>
      <div
        className='mealsTimeline-container'
        style={{ width: '60vw', height: '60vh', overflowY: 'auto' }}
        ref={timelineContainerRef}
      >
        <div className='timeline-wrapper'>
          {timelineItems.map((item, index) => (
            <div
              key={index}
              className={`timeline-item ${
                index === timelineItems.indexOf(currentEvent)
                  ? 'current-event'
                  : ''
              }`}
              data-index={index}
              ref={
                index === timelineItems.indexOf(currentEvent)
                  ? currentEventRef
                  : null
              }
            >
              <div className='timeline-item-time'>
                {moment(item.startTime).format('h:mma')}
              </div>
              <div className='timeline-divider' />
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
    </>
  );
};

export default MealsTimeline;
