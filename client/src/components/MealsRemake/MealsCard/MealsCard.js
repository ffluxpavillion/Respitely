import { useState } from 'react';
import './MealsCard.scss';
import DropInMealsToday from '../../DropInMealsToday/DropInMealsToday';
import MealsTimeline from '../MealsTimeLine/MealsTimeLine';
import MealsBanner from '../../MealsBanner/MealsBanner';
import { HashLink as Link } from 'react-router-hash-link';
import ComingSoon from '../../ComingSoon/ComingSoon';
import { Collapse, Space, Radio } from 'antd';


export default function MealsCard() {
  const [view, setView] = useState('live');
  const [liveView, setLiveView] = useState('');

  const scrollToTop = (el) => {
    // need to fix this
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleView = (value) => {
    setView(value);
    setView(view === 'live' ? 'timeline' : 'live');

  };
  const toggleLiveView = () => {
    setLiveView(liveView === 'inProgress' ? 'upNext' : 'inProgress');
  };

  console.log('VIEWSTATE=====', view)



  return (
    <>
      <MealsBanner />
      <section className='meals-section' id='dropInMeals'>
        <div className='meals-section__upper'>
          <h3 className='meals-section__header' id='meals'>
            Toronto Drop-In Meals Daily Tracker
          </h3>

          {/* <DropInMealsToday /> */}
          {/* <MealsTimeline /> */}
          <Space className='mealsTimeline2-toggle-view'>
            <Radio.Group
              className='ant-radio-group'
              value={view}
              onChange={(e) => toggleView(e.target.value)}
            >
              <Radio.Button className='toggle-view-button' value='live' onClick={toggleView}>
                Live Updates
              </Radio.Button>
              <Radio.Button className='toggle-view-button' value='timeline' onClick={toggleView}>
                Daily Timeline
              </Radio.Button>
            </Radio.Group>
          </Space>

          {view === 'live' && (
            <div className='mealsTimeline2-live-toggle-view'>
              <button
                className='toggle-view-secondary-button'
                onClick={toggleLiveView}
              >
                {'In Progress'}
              </button>
              <button
                className='toggle-view-secondary-button'
                onClick={toggleLiveView}
              >
                {'Up Next'}
              </button>
            </div>
          )}
        </div>






        <div className='meals-section__lower'>
          {/* {view === 'live' &&  (
            <DropInMealsToday liveView={liveView} />
          )} */}

          {view === 'timeline' && (
            <MealsTimeline />
          )}

          {view === 'live' && liveView === 'upNext' &&  (
            <span> UPNEXTTTT</span>
          )}

          {view === 'live' && liveView === 'inProgress' &&  (
            <span> INPROGRESSSS</span>
          )}






          <Link to='/drop-in-map' scroll={scrollToTop} aria-label='Link to Drop-In Map'>
            <h3 className='meals-section__map-link'>
              EXPLORE DROP-IN MAP ⟩⟩
            </h3>
          </Link>
        </div>
        {/* <ComingSoon
            title="New Drop-In Meals UI Coming Soon!"
            message="A more intuitive solution is on the way -- this upcoming tool will provide essential info on drop-in meals, helping you locate services quickly and efficiently.  Sincerely grateful for the patience and support, stay safe."
            height='100%'
            width='80%'
        /> */}
      </section>
    </>
  );
}
