import './MealsTimeline.scss';
import React, { useState, useEffect, useRef, useContext } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleExclamation,
  faHandHoldingHeart,
  faLocationDot,
  faWheelchair,
  faDog,
} from '@fortawesome/free-solid-svg-icons';
import HoverPopover from '../AntDesign/HoverPopover';

const MealsTimeline = ({ timelineItems, getDirectionsUrl }) => {
  const timelineContainerRef = useRef(null);
  const currentEventRef = useRef(null);
  const [collapsedItems, setCollapsedItems] = useState({});

  useEffect(() => {
    if (timelineItems.length > 0) {
      const initialCollapsedState = timelineItems.reduce((acc, _, index) => {
        acc[index] = true;
        return acc;
      }, {});
      setCollapsedItems(initialCollapsedState);
    }
  }, [timelineItems]);

  const toggleCollapse = (index) => {
    setCollapsedItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <>
      <article className='mealsTimeline-container'>
        <div className='timeline-container' ref={timelineContainerRef}>
          <div className='timeline-wrapper'>
            {timelineItems.map((item, index) => {
              const isCollapsed = collapsedItems[index];
              const isEnded = item.isEnded;

              return (
                <div
                  key={index}
                  className={`timeline-item ${
                    isEnded
                      ? ` ${isCollapsed ? 'collapsed' : 'not-collapsed'}`
                      : item.isCurrent
                      ? 'happening-now'
                      : item.isComingUp
                      ? 'is-coming-up'
                      : ''
                  }`}
                  data-index={index}
                  ref={
                    item.isCurrent || item.isComingUp ? currentEventRef : null
                  }
                  onClick={() => toggleCollapse(index)}
                >
                  <div className='timeline-item-time'>
                    {isEnded ? (
                      <span className='is-ended'>Ended</span>
                    ) : item.isCurrent ? (
                      <span className='happening-now-text'>Now</span>
                    ) : (
                      moment(item.startTime).format('h:mma')
                    )}
                    {/* {!isEnded && moment(item.startTime).format('h:mma')} */}
                  </div>
                  <hr className='timeline-divider' />
                  <div className='timeline-item-content'>
                    <div className='mealsTimeline-upper'>
                      {isCollapsed ? (
                        // Display only the meal provider when collapsed
                        <div className='mealsTimeline__meal-provider'>
                          <FontAwesomeIcon
                            className='timeline-item-icon'
                            icon={faHandHoldingHeart}
                            size='1x'
                          />
                          <p className='daily-timeline-text'>
                            {item.providerOfMeal}
                            <br />
                            {/* {item.distance ? (
                              `(${item.distance} km)`
                            ) : (
                              <HoverPopover
                                content='To calculate distance, please enable Location Services and refresh the page.'
                                title='Location Services Disabled'
                                buttonText={
                                  <FontAwesomeIcon
                                    icon={faCircleExclamation}
                                    size='lg'
                                  />
                                }
                                contentClassName='popover-alert-content'
                                buttonClassName='popover-alert-button'
                              ></HoverPopover>
                            )} */}
                          </p>
                        </div>
                      ) : (
                        // Display full content when not collapsed
                        <>
                          <div className='mealsTimeline__meal-type'>
                            {item.typeOfMeal}
                          </div>
                          <div className='mealsTimeline__meal-time'>
                            {item.timeOfMeal}
                          </div>
                          {item.distance ? `(${item.distance} km)` : ''}
                          <aside className='mealsTimeline-accessibility-div'>
                            <div className='mealsTimeline-accessibility-icon'>
                              {item.wheelchair_accessible && (
                                <FontAwesomeIcon
                                  icon={faWheelchair}
                                  size='1x'
                                />
                              )}
                            </div>
                            <div className='mealsTimeline-accessibility-icon'>
                              {item.service_dog_allowed && (
                                <FontAwesomeIcon
                                  className='timeline-item-icon'
                                  icon={faDog}
                                  size='1x'
                                />
                              )}
                            </div>
                          </aside>
                          <br />
                          <div className='mealsTimeline__meal-provider'>
                            <FontAwesomeIcon
                              className='timeline-item-icon'
                              icon={faHandHoldingHeart}
                              size='1x'
                            />
                            <p className='daily-timeline-text'>
                              {item.providerOfMeal}
                            </p>
                          </div>
                          <div className='mealsTimeline__meal-address'>
                            <FontAwesomeIcon icon={faLocationDot} size='lg' />
                            <p className='daily-timeline-text'>
                              {item.address.street}
                              <br />
                              {item.address.city}, {item.address.province}
                              <br />
                              {item.address.postal_code}
                            </p>
                          </div>
                          <button
                            className='directions-button'
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent collapse toggle when clicking button
                              window.open(
                                getDirectionsUrl(
                                  item.providerOfMeal,
                                  item.addressOfMeal
                                )
                              );
                            }}
                          >
                            Get Directions
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </article>
    </>
  );
};

export default MealsTimeline;
