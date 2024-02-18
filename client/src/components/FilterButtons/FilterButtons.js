import './FilterButtons.scss';
import BedIcon from '../../assets/icons/SafeHavenTO_icon-bed.svg'
import RoomIcon from '../../assets/icons/SafeHavenTO_icon-room.svg'

const FilterButtons = ({ selectedButton, filterAndSortData, handleClick, records }) => {
  return (
    <>
      <div className='button-container'>
        <button className={`sheltersCard__Btn btn--Beds ${selectedButton === 'Beds' ? 'selected' : ''}`}
          onClick={() => {
            filterAndSortData(records, 'Beds');
            handleClick('Beds');
          }}
        >
          <h3 className='btn--Text'> <img className='btn--Icon' src={BedIcon} alt="Bed Icon" />Beds</h3>
        </button>
      </div>
      <div className='button-container'>
      <button
        className={`sheltersCard__Btn btn--Rooms ${selectedButton === 'Rooms' ? 'selected' : ''}`}
        onClick={() => {
          filterAndSortData(records, 'Rooms');
          handleClick('Rooms');
        }}
      >
        <h3 className='btn--Text'><img className='btn--Icon' src={RoomIcon} alt="Room Icon" />Rooms</h3>
      </button>
      </div>
      <div className='button-container'>
      <button className={`sheltersCard__Btn btn--All ${selectedButton === 'All' ? 'selected' : ''}`}
        onClick={() => {
          filterAndSortData(records, 'All');
          handleClick('All');
        }}
      >
        <h3 className='btn--Text'>
          <img className='btn--Icon btn--Filter-All' src={BedIcon} alt="Bed Icon" />
          <img className='btn--Icon btn--Filter-All' src={RoomIcon} alt="Room Icon" />
          All</h3>
      </button>
      </div>
    </>
  );
};

export default FilterButtons;