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
        {isOpen ? '❌ Close' : `IMPORTANT - PLEASE READ!`} <br />{' '}
        {isOpen ? (
          ''
        ) : (
          <i className='meals-banner-subheader'>(tap to expand) ⤵️ </i>
        )}
      </div>
      {isOpen && (
        <div className='meals-banner-content'>
          <i>
            Meals Timeline & MealsMap is still very much under development & may
            contain inaccuracies/bugs. I am not directly associated with any of
            these services and therefore cannot guarantee the accuracy of any
            info below, or elsewhere on this site as they may have made changes
            to their services. I am working hard towards improving this app for
            you all, and I am truly grateful for your patience.
          </i>
          <br />
          <br />
          Please contact the location/service provider directly to confirm any
          information. You can check the MealsMap below as a head start, or
          check the provider's official website. These updates are for
          informational purposes only.
        </div>
      )}
    </div>
  );
}
