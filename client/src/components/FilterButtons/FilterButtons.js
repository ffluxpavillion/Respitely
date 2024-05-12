import './FilterButtons.scss';
import { useEffect, useState } from 'react';
import BedIcon from '../../assets/icons/SafeHavenTO_icon-bed.svg';
import RoomIcon from '../../assets/icons/SafeHavenTO_icon-room.svg';
import { Select } from 'antd';

const FilterButtons = ({
  selectedButton,
  filterAndSortData,
  handleClick,
  records,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    // check if the screen is mobile size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (value) => {
    setSelectedFilter(value);
    filterAndSortData(records, value);
  };

  return (
    <>
      {isMobile ? ( // if mobile, show dropdown menu
        <Select
          defaultValue={selectedFilter}
          style={{ width: 200 }}
          onChange={handleChange}
          options={[
            { label: <span>ALL </span>, value: 'All' },
            { label: <span>ROOMS</span>, value: 'Rooms' },
            { label: <span>BEDS</span>, value: 'Beds' },
          ]}
        />
      ) : (
        <div className='button-container'>
          <button
            className={`filter-button btn--Beds btn ${
              selectedButton === 'Beds' ? 'selected' : ''
            }`}
            onClick={() => {
              filterAndSortData(records, 'Beds');
              handleClick('Beds');
            }}
          >
            <h3 className='button-text'>
              <img className='button--icon' src={BedIcon} alt='Bed Icon' />
              Beds
            </h3>
          </button>

          <button
            className={`filter-button btn--Rooms btn ${
              selectedButton === 'Rooms' ? 'selected' : ''
            }`}
            onClick={() => {
              filterAndSortData(records, 'Rooms');
              handleClick('Rooms');
            }}
          >
            <h3 className='button-text'>
              <img className='button--icon' src={RoomIcon} alt='Room Icon' />
              Rooms
            </h3>
          </button>

          <button
            className={`filter-button btn--All btn ${
              selectedButton === 'All' ? 'selected' : ''
            }`}
            onClick={() => {
              filterAndSortData(records, 'All');
              handleClick('All');
            }}
          >
            <h3 className='button-text'>
              <img
                className='button--icon btn--Filter-All'
                src={BedIcon}
                alt='Bed Icon'
              />
              <img
                className='button--icon btn--Filter-All'
                src={RoomIcon}
                alt='Room Icon'
              />
              All
            </h3>
          </button>
        </div>
      )}
    </>
  );
};

export default FilterButtons;
