import React from 'react';
import './MealsCard.scss';
import DropInMealsToday from '../DropInMealsToday/DropInMealsToday';
import MealsTimeline from '../MealsTimeline/MealsTimeline';
import MealsBanner from '../MealsBanner/MealsBanner';
import { HashLink as Link } from 'react-router-hash-link';

import ComingSoon from '../ComingSoon/ComingSoon';

export default function MealsCard() {
  const scrollToTop = (el) => {
    // need to fix this
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <MealsBanner />
      <section className='meals-section' id='dropInMeals'>
        <div className='meals-section__upper'>
          <h3 className='meals-section__header' id='meals'>
            Toronto Drop-In Meals Daily Tracker
          </h3>

          {/* <DropInMealsToday /> */}
          <MealsTimeline />
        </div>
        <div className='meals-section__lower'>
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
