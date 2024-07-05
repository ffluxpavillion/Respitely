import React from 'react';
import './SheltersCardDetailedView.scss';

export default function SheltersCardDetailedView({ goHere }) {
  if (!goHere) {
    return <p>Loading...</p>;
  }

  const details = [
    { label: 'Organization Name', value: goHere.ORGANIZATION_NAME },
    { label: 'Shelter Group', value: goHere.SHELTER_GROUP },
    { label: 'Overnight Service', value: goHere.OVERNIGHT_SERVICE_TYPE },
    { label: 'Sector', value: goHere.SECTOR },
    { label: 'Capacity Type', value: goHere.CAPACITY_TYPE },
    { label: 'Program Model', value: goHere.PROGRAM_MODEL },
    {
      label: 'Total Capacity',
      value: goHere.CAPACITY_ACTUAL_BED || goHere.CAPACITY_ACTUAL_ROOM,
    },
  ];

  return (
    <>
      <div className='detailed-view__container'>
        {details.map((item, index) => (
          <div className='detail-row' key={index}>
            <div className='detail-row__label'>{item.label}</div>
            <div className='detail-row__value'>{item.value}</div>
          </div>
        ))}
        <div className='vertical-divider'></div>
      </div>
    </>
  );
}
