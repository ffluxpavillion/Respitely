import React from 'react';
import './ExploreMaps.scss';
import SheltersMapScreenshot from '../../assets/images/SafehavenTO_sheltersMap-screenshot.png';
import MealsMapScreenshot from '../../assets/images/SafehavenTO_mealsMap-screenshot.png';

import SheltersMap from '../SheltersMap/SheltersMap';
import MealsMap from '../MealsMap/MealsMap';

export default function ExploreMaps() {
  return (
    <>
      <section className='exploreMaps-section'>
        <div className='exploreMaps-map-1-container'>
          {/* <a href='/shelterscard'>
            <img
              className='exploreMaps-shelters-screenshot'
              src={SheltersMapScreenshot}
            ></img>
            <span className='exploreMaps-title'>Explore Shelters Map</span>
          </a>
        </div>
        <div className='exploreMaps-map-2-container'> */}
          <a href='/drop-in-map'>
            <img
              className='exploreMaps-drop-in-screenshot'
              src={MealsMapScreenshot}
            ></img>
            <span className='exploreMaps-title'>Explore Drop-In Meals Map</span>
          </a>
        </div>
      </section>
    </>
  );
}
