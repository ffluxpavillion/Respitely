import React, { useState, useEffect } from 'react';
import './LiveClock.scss';
import moment from 'moment-timezone';

export default function LiveClock() {
  const [todaysDate, setTodaysDate] = useState(
    moment.tz('America/Toronto').format('dddd MMMM Do YYYY, h:mm:ss a')
  );
  const [currentTime, setCurrentTime] = useState(
    moment.tz('America/Toronto').format('h:mm:ss a')
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTodaysDate(moment.tz('America/Toronto').format('dddd MMMM Do YYYY'));
      setCurrentTime(moment.tz('America/Toronto').format('hh:mm:ss a'));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className='liveClock-container'>
        <div className='liveClock-date'>{todaysDate}</div>
        <span className='liveClock-time'>{currentTime}</span>
      </div>
    </>
  );
}
