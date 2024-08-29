import './MealsUpNext.scss';
import { useState } from 'react';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useGeolocation } from '../../hooks/useGeolocation';
import * as turf from '@turf/turf';
import HoverPopover from '../AntDesign/HoverPopover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleExclamation,
  faHandHoldingHeart,
  faLocationDot,
  faWheelchair,
  faDog,
} from '@fortawesome/free-solid-svg-icons';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
export default function MealsUpNext({ nextEvents, getDirectionsUrl }) {
  console.log('nextEvents', nextEvents);

  return (
    <>
      {nextEvents.length > 0 ? (
        <div className='next-event-container'>
          <h2 className='next-event-header'>UP NEXT</h2>
          <p className='next-event-subheader'>
            Events starting in the next 2 hours.
          </p>
          <br />
          <Collapse
            className='mealsTimeline-ant-collapse'
            accordion
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 180} />
            )}
          >
            {nextEvents.map((event, index) => (
              <Panel
                className='mealsTimeline-ant-collapse-header'
                header={
                  <>
                    <span className='collapse__title'>{event.typeOfMeal} </span>
                    <span className='collapse__distance'>
                      {event.distance ? (
                        `(${event.distance} km)`
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
                      )}
                    </span>
                  </>
                }
                key={index}
              >
                <div className='current-ant-collapse-inner'>
                  <p className='mealsTimeline__up-next-time'>
                    {event.timeOfMeal}
                  </p>
                  <p className='mealsTimeline__up-next-provider'>
                    <FontAwesomeIcon icon={faHandHoldingHeart} size='1x' />
                    <p className='MTL-collapse-live-text'>
                      {event.providerOfMeal}
                    </p>
                  </p>
                  <p className='mealsTimeline__up-next-address'>
                    <FontAwesomeIcon icon={faLocationDot} size='lg' />
                    <p className='MTL-collapse-live-text'>
                      {event.addressOfMeal}
                    </p>
                  </p>
                  <button
                    className='directions-button'
                    onClick={() =>
                      window.open(
                        getDirectionsUrl(
                          event.providerOfMeal,
                          event.addressOfMeal
                        )
                      )
                    }
                  >
                    Get Directions
                  </button>
                </div>
              </Panel>
            ))}
          </Collapse>
        </div>
      ) : (
        <div className='next-event-container'>
          <h2 className='next-event-header'></h2>
          <p className='next-event-subheader'>
            No upcoming events in the next 2 hours.
          </p>
        </div>
      )}
      <br />
    </>
  );
}
