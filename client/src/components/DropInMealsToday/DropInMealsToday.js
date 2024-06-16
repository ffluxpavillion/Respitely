// ------------ V1 - MULTICARDS LAYOUT ------------


import './DropInMealsToday.scss';
import { useEffect, useState } from 'react';
import dropInSchedule from '../../data/TDIN_MealList.json';
import { List, Card, Typography } from 'antd';
const { Title, Text } = Typography;

export default function DropInMealsToday() {
  const [todayMealInfo, setTodayMealInfo] = useState([]);
  const todayDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

  useEffect(() => {
    const allCenters = Object
      .values(dropInSchedule.regions)
      .flatMap(region => region.drop_in_centers);
    const todayMeals = allCenters.filter(center =>
      center.schedule[todayDay] && center.schedule[todayDay].hours !== 'Closed'
    );
    setTodayMealInfo(todayMeals);
  }, [todayDay]);

  return (
    <div>
      <Title level={2}>Meals for Today ({todayDay.charAt(0).toUpperCase() + todayDay.slice(1)})</Title>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={todayMealInfo}
        renderItem={item => (
          <List.Item>
            <Card title={item.name} bordered={false}>
              <Text strong>Address:</Text> {item.address}<br />
              <Text strong>Time:</Text> {item.schedule[todayDay].hours}<br />
              <Text strong>Breakfast:</Text> {item.schedule[todayDay].breakfast || 'Not Available'}<br />
              <Text strong>Lunch:</Text> {item.schedule[todayDay].lunch || 'Not Available'}<br />
              <Text strong>Dinner:</Text> {item.schedule[todayDay].dinner || 'Not Available'}<br />
              <Text strong>Snack:</Text> {item.schedule[todayDay].snack || 'Not Available'}
            </Card>
          </List.Item>
        )}
        locale={{ emptyText: "No meals scheduled for today." }}
      />
    </div>
  );
}


// ------------ V2 - TABULAR LAYOUT (SORTED BY DAYS OF THE WEEK) ------------


// import './DropInMealsToday.scss';
// import React, { useState, useEffect, useRef } from 'react';
// import { Tabs, Card, Button } from 'antd';
// import dropInSchedule from '../../data/TDIN_MealList.json';

// const { TabPane } = Tabs;

// export default function DropInMealsWeek() {
//   const [mealData, setMealData] = useState({});
//   const mealListRef = useRef(null);

//   useEffect(() => {
//     const daysOfWeek = [
//       'Monday',
//       'Tuesday',
//       'Wednesday',
//       'Thursday',
//       'Friday',
//       'Saturday',
//       'Sunday',
//     ];
//     const allCenters = Object.values(dropInSchedule.regions).flatMap(
//       (region) => region.drop_in_centers
//     );
//     let weeklyMeals = {};

//     daysOfWeek.forEach((day) => {
//       weeklyMeals[day] = allCenters.filter((center) => {
//         const schedule = center.schedule[day.toLowerCase()];
//         return (
//           schedule &&
//           (schedule.breakfast ||
//             schedule.lunch ||
//             schedule.dinner ||
//             schedule.snack)
//         );
//       });
//     });

//     setMealData(weeklyMeals);
//   }, []);

//   const todayDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

//   const scroll = (direction) => {
//     if (mealListRef.current) {
//       const { scrollTop, clientHeight, scrollHeight } = mealListRef.current;
//       if (direction === 'up' && scrollTop > 0) {
//         mealListRef.current.scrollTop = scrollTop - clientHeight;
//       } else if (
//         direction === 'down' &&
//         scrollTop + clientHeight < scrollHeight
//       ) {
//         mealListRef.current.scrollTop = scrollTop + clientHeight;
//       }
//     }
//   };

//   return (
//     <Tabs defaultActiveKey={todayDay} type='card'>
//       {Object.entries(mealData).map(([day, centers]) => (
//         <TabPane tab={day} key={day}>
//           <div
//             style={{ overflow: 'auto', height: '400px', position: 'relative', width: '50vw' }}
//             ref={mealListRef}
//           >
//             {centers.length > 0 ? (
//               centers.map((center, index) => (
//                 <Card
//                   key={index}
//                   title={center.name}
//                   bordered={false}
//                   style={{ marginBottom: 16 }}
//                 >
//                   <p>
//                     <strong>Address:</strong> {center.address}
//                   </p>
//                   {center.schedule[day.toLowerCase()].breakfast && (
//                     <p>
//                       <strong>Breakfast:</strong>{' '}
//                       {center.schedule[day.toLowerCase()].breakfast ||
//                         'Not Available'}
//                     </p>
//                   )}
//                   {center.schedule[day.toLowerCase()].lunch && (
//                     <p>
//                       <strong>Lunch:</strong>{' '}
//                       {center.schedule[day.toLowerCase()].lunch ||
//                         'Not Available'}
//                     </p>
//                   )}
//                   {center.schedule[day.toLowerCase()].dinner && (
//                     <p>
//                       <strong>Dinner:</strong>{' '}
//                       {center.schedule[day.toLowerCase()].dinner ||
//                         'Not Available'}
//                     </p>
//                   )}
//                   {center.schedule[day.toLowerCase()].snack && (
//                     <p>
//                       <strong>Snack:</strong>{' '}
//                       {center.schedule[day.toLowerCase()].snack ||
//                         'Not Available'}
//                     </p>
//                   )}
//                 </Card>
//               ))
//             ) : (
//               <p>No meals scheduled for {day}.</p>
//             )}
//           </div>
//           <Button
//             className='dropIn-scroll-button'
//             onClick={() => scroll('up')}
//             style={{ position: 'absolute', top: '10px', right: '1rem', height: '3rem', fontSize: '1rem' }}
//           >
//             ↑
//           </Button>
//           <Button
//             className='dropIn-scroll-button'
//             onClick={() => scroll('down')}
//             style={{ position: 'absolute', bottom: '10px', right: '1rem', height: '3rem', fontSize: '1rem' }}
//           >
//             ↓
//           </Button>
//         </TabPane>
//       ))}
//     </Tabs>
//   );
// }
