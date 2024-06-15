import React, { useState, useEffect } from 'react'
import moment from 'moment';

export default function LiveClock() {

  const [todaysDate, setTodaysDate] = useState(
    moment().format('dddd MMMM Do YYYY, h:mm:ss a')
  );


  useEffect(() => {
    const interval = setInterval(() => {
      setTodaysDate(moment().format('dddd MMMM Do YYYY, hh:mm:ss a'));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [])

  return (
    <>
      {todaysDate}
    </>
  )
}