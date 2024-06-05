import React, { useState, useEffect } from 'react';
import './EmergencyBanner.scss';

export default function EmergencyBanner() {
  return (
    <div
      className='banner-container'
      role='region'
      aria-label='Emergency Banner Contact Information'
    >
      <div className='banner-content'>
        If you are in need of emergency shelter space, please call the City of
        Toronto’s Central Intake line at
        <a href='tel:4163384766' className='phone-link'>
          {' '}
          416-338-4766{' '}
        </a>
        or
        <a href='tel:18773383398' className='phone-link'>
          {' '}
          1-877-338-3398.{' '}
        </a>
        For Street Outreach Services, please call
        <a href='tel:311' className='phone-link'>
          {' '}
          311
        </a>
        .
      </div>
    </div>
  );
}
