import React, { createContext, useState, useEffect, useContext } from 'react';
import moment from 'moment';

const DateTimeContext = createContext();

export function DateTimeProvider({ children }) {
  const [todaysDate, setTodaysDate] = useState(moment().format('dddd MMMM Do YYYY'));
  const [currentTime, setCurrentTime] = useState(moment().format('h:mm:ss a'));

  useEffect(() => {
    const interval = setInterval(() => {
      setTodaysDate(moment().format('dddd MMMM Do YYYY'));
      setCurrentTime(moment().format('h:mm:ss a'));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <DateTimeContext.Provider value={{ todaysDate, currentTime }}>
      {children}
    </DateTimeContext.Provider>
  );
}

export function useDateTime() {
  return useContext(DateTimeContext);
}
