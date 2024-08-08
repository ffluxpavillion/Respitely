// import './MealsTimeline.scss';
import React, { useState, useEffect, useRef, useContext } from 'react';
import moment from 'moment';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import LiveClock from '../../LiveClock/LiveClock';
import { useGeolocation } from '../../../hooks/useGeolocation';
import * as turf from '@turf/turf';
import HoverPopover from '../../AntDesign/HoverPopover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleExclamation,
  faHandHoldingHeart,
  faLocationDot,
  faWheelchair,
  faDog,
} from '@fortawesome/free-solid-svg-icons';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Panel } = Collapse;

const MealsTimeline = () => {
  const { locationInfo } = useGeolocation();
  const [timelineItems, setTimelineItems] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [previousEvent, setPreviousEvent] = useState(null);
  const [nextEvents, setNextEvents] = useState([]);
  const [isTimelineVisible, setIsTimelineVisible] = useState(true); // State to control timeline visibility
  const timelineContainerRef = useRef(null);
  const currentEventRef = useRef(null);
  const [allDropinsToday, setAllDropinsToday] = useState([]);
  const [data, setData] = useState([]);


  useEffect(() => { // Fetch all drop-ins, with only today's schedules from the server
    const today = moment().format('dddd').toLowerCase();
    const fetchDropins = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/toronto/meals?day=${today}`);
        const data = response.data;
        setData(data);
        console.log('DROP-INS FROM SERVER=====', data);

        processMeals(data, today);

      } catch (error) {
        console.error('Error fetching drop-ins:', error);
      }
    };

    fetchDropins();
  }, []);



  const processMeals = (data, today) => {
    let mealsForToday = [];
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
    const filteredData = data.filter((meal) => meal.schedule[today] && meal.schedule[today].meals);
    console.log('FILTERED DATA=====', filteredData);

    filteredData.forEach((provider) => {
      const schedule = provider.schedule[today].meals;
      // console.log('SCHEDULE=====', schedule);

      mealTypes.forEach((mealType) => {
        if (schedule[mealType]) {
          const mealEntries = schedule[mealType];
          // console.log('MEAL ENTRIES=====', mealEntries);

            const entry = mealEntries;
            const now = moment();
            // const startTime = moment(mealEntries.start, ["HH.mm"]).format("h:mm a");
            // const endTime = mealEntries.end ? moment(mealEntries.end, ["HH.mm"]).format("h:mm a") : moment(mealEntries.start, ["HH.mm"]).add(1, 'hour').format("h:mm a");
            const startTime = moment(mealEntries.start, "h:mm a").toDate();
            const endTime = moment(mealEntries.end, "h:mm a").toDate();
            const isCurrent = now.isBetween(startTime, endTime);
            const isEnded = now.isAfter(endTime);
            const isComingUp = now.isBefore(startTime) && moment(startTime).diff(now, 'hours') <= 2;
            // console.log('ENTRY=====', provider.name, mealType, entry);

            mealsForToday.push({
              typeOfMeal: mealType.charAt(0).toUpperCase() + mealType.slice(1),
              timeOfMeal: `${moment(startTime).format('h:mma')} - ${moment(endTime).format('h:mma')}`,
              providerOfMeal: provider.name,
              addressOfMeal: `${provider.address.street}, ${provider.address.city}, ${provider.address.province}, ${provider.address.postal_code}`,
              startTime,
              endTime,
              isCurrent: isCurrent,
              isComingUp: isComingUp,
              isEnded: isEnded,
              wheelchair_accessible: provider.wheelchair_accessible,
              service_dog_allowed: provider.service_dog_allowed,
              latitude: provider.latitude,
              longitude: provider.longitude,
              ...provider
            });
        }
      });
    });

    // console.log('MEALS FOR TODAY=====', mealsForToday);

    const sortedMeals = mealsForToday.sort((a, b) => a.startTime - b.startTime);
    setTimelineItems(sortedMeals);

    const currentEvents = sortedMeals.filter((meal) => meal.isCurrent);
    const previousEventIndex = sortedMeals.findIndex((meal) => meal.isEnded) - 1;
    const nextEvents = sortedMeals.filter((meal) => meal.isComingUp);

    console.log('SORTED MEALS=====', sortedMeals);

    setCurrentEvents(currentEvents);
    setPreviousEvent(
      previousEventIndex !== null && previousEventIndex >= 0 ? sortedMeals[previousEventIndex] : null
    );
    setNextEvents(nextEvents);
  };



// data.forEach((item) => {
  //   const startTime = moment(item.startTime, 'h:mm A');
  //   const endTime = moment(item.endTime, 'h:mm A');
  //   const currentTime = moment();

  //   item.isCurrent = currentTime.isBetween(startTime, endTime);
  //   item.isComingUp = currentTime.isBefore(startTime);
  //   item.isEnded = currentTime.isAfter(endTime);
  // });

  const getDirectionsUrl = (providerOfMeal, addressOfMeal) => { // Get directions URL
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      `${providerOfMeal} ${addressOfMeal}`
    )}&travelmode=walking`;
  };






  return (
    <>
      <br />
      <article className='mealsTimeline-container'>


        <div className='timeline-container' ref={timelineContainerRef}>
          <div className='timeline-wrapper'>
            <h1
              className='timeline-wrapper__header'
              onClick={() => setIsTimelineVisible(!isTimelineVisible)}
            >
              Timeline of Today's Events
              {isTimelineVisible ? (
                <CaretUpOutlined className='timeline-toggle-icon' />
              ) : (
                <CaretDownOutlined className='timeline-toggle-icon' />
              )}
            </h1>
            {isTimelineVisible &&
              timelineItems.map((item, index) => (
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
                    { item.isEnded ? '' : moment(item.startTime).format('h:mma')}
                  </div>
                  <hr className='timeline-divider' />
                  <div className='timeline-item-content'>
                    <div className='mealsTimeline-upper'>
                      <div className='mealsTimeline__meal-type'>
                        {item.typeOfMeal}
                      </div>
                      <div className='mealsTimeline__meal-time'>
                        {item.timeOfMeal}
                      </div>
                      <aside className='mealsTimeline-accessibility-div'>
                        <div className='mealsTimeline-accessibility-icon'>
                          {item.wheelchair_accessible && (
                            <FontAwesomeIcon icon={faWheelchair} size='1x' />
                          )}
                        </div>
                        <div className='mealsTimeline-accessibility-icon'>
                          {item.service_dog_allowed && (
                            <FontAwesomeIcon icon={faDog} size='1x' />
                          )}
                        </div>
                      </aside>
                      <br />

                      <div className='mealsTimeline-lower'>
                        <div className='mealsTimeline__meal-provider'>
                          <FontAwesomeIcon icon={faHandHoldingHeart} size='1x' />
                          <p className='daily-timeline-text'>
                            {item.providerOfMeal}
                          </p>
                        </div>
                        <div className='mealsTimeline__meal-address'>
                          <FontAwesomeIcon icon={faLocationDot} size='lg' />
                          <p className='daily-timeline-text'>
                            {item.addressOfMeal}
                          </p>
                        </div>
                      </div>
                    </div>
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
