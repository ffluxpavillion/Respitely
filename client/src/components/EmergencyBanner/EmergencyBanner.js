import React, { useState, useEffect } from 'react';
import './EmergencyBanner.scss';

export default function EmergencyBanner() {
  return (
    <div
      className='banner-container'
      role='region'
      aria-label='Emergency Banner Contact Information'
    >
      <p className='banner-line-0'>*</p>
      <div className='banner-content'>
        <p className='banner-line-1'>
          Shelter updates are for informational purposes only and does not
          guarantee availability.
        </p>

        <p className='banner-line-2'>
          If you are in need of emergency shelter space, please call the City of
          Toronto’s Central Intake line at <br />
          <a
            href='tel:4163384766'
            className='phone-link'
            aria-label='4163384766'
          >
            {' '}
            416-338-4766{' '}
          </a>
          or
          <a
            href='tel:18773383398'
            className='phone-link'
            aria-label='18773383398'
          >
            {' '}
            1-877-338-3398.{' '}
          </a>
          For Street Outreach Services, please call
          <a href='tel:311' className='phone-link' aria-label='311'>
            {' '}
            311
          </a>
          .
        </p>
      </div>
      <p className='banner-line-0'>*</p>
    </div>
  );
}
