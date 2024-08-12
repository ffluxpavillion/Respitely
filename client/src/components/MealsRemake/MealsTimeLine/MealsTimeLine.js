import './MealsTimeline.scss';
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

const MealsTimeline = ({ timelineItems, getDirectionsUrl }) => {
  const { locationInfo } = useGeolocation();
  const timelineContainerRef = useRef(null);
  const currentEventRef = useRef(null);
  const [allDropinsToday, setAllDropinsToday] = useState([]);
  const [data, setData] = useState([]);
  const [collapsedItems, setCollapsedItems] = useState({});

  const toggleCollapse = (index) => {
    setCollapsedItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };



  return (
    <>
      <br />
      <article className='mealsTimeline-container'>


        <div className='timeline-container' ref={timelineContainerRef}>
          <div className='timeline-wrapper'>
            <h1
              className='timeline-wrapper__header'
            >
            </h1>
            {timelineItems.map((item, index) => (
                <div
                  key={index}
                  className={`timeline-item ${
                    item.isEnded
                      ? `is-ended ${collapsedItems[index] ? '' : 'collapsed'}`
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
                  onClick={() => toggleCollapse(index)}
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
