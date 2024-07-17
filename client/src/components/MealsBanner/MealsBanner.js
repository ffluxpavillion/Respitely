import React, { useState } from 'react';
import './MealsBanner.scss';

export default function MealsBanner() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBanner = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className='meals-banner-container'
      role='region'
      aria-label='Meals Banner Contact Information'
    >
      <div className='meals-banner-header' onClick={toggleBanner}>
        {isOpen ? '[ ⛌ ] Close' : `IMPORTANT - PLEASE READ!`} <br />{' '}
        {isOpen ? (
          ''
        ) : (
          <i className='meals-banner-subheader'>(tap to expand) ⤵️ </i>
        )}
      </div>
      {isOpen && (
        <>
          <div className='meals-banner-content'>
            <p className='banner-line-0'>*</p>
            <div className='meals-banner-text'>
              <p className='meals-banner-line-1'>
                Updates are for informational purposes only.
              </p>
              <p className='meals-banner-line-2'>
                Meals Timeline & MealsMap is still under development & may
                contain inaccuracies & bugs. Please contact the location/service
                provider directly to confirm any information. You can check the
                MealsMap below as a head start, or check the provider's official
                website.
              </p>
            </div>
            <p className='banner-line-0'>*</p>
          </div>
        </>
      )}
    </div>
  );
}
