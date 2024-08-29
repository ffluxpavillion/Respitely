import './MealsInProgress.scss';
import { useState } from 'react'
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


export default function MealsInProgress({ currentEvents, getDirectionsUrl }) {
  const { locationInfo } = useGeolocation();


  return (
    <>
      {currentEvents.length > 0 ? (
        <div className='current-event-container'>
          <h2 className='current-event-header'>IN PROGRESS</h2>
          <p className='current-event-subheader'>
            Events happening right now
          </p>
          <br />
          <Collapse
            className='mealsTimeline-ant-collapse'
            accordion
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 180} />
            )}
          >
            {currentEvents.map((event, index) => (
              <Panel
                className='mealsTimeline-ant-collapse-header'
                header={
                  <>
                    <span className='collapse__title'>
                      {event.typeOfMeal}{' '}
                    </span>
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
                  <p className='mealsTimeline__in-progress-time'>
                    {event.timeOfMeal}
                  </p>
                  <p className='mealsTimeline__in-progress-provider'>
                  <FontAwesomeIcon icon={faHandHoldingHeart} size='1x' />
                    <p className='MTL-collapse-live-text'>
                      {event.providerOfMeal}
                    </p>
                  </p>
                  <p className='mealsTimeline__in-progress-address'>
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
        <div className='current-event-container'>
          <h2 className='current-event-header'></h2>
          <p className='current-event-subheader'>
            Sorry, looks like nothing is scheduled right now. <br />
            Please refer to the timeline or check back later.
          </p>
        </div>
      )}
    </>
  )
}
