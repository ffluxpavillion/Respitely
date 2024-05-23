import './SheltersCard.scss';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import SheltersMap from '../SheltersMap/SheltersMap';
import FilterButtons from '../FilterButtons/FilterButtons';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';

export default function SheltersCard() {
  const [loading, setLoading] = useState(true); // state to show/hide Loading Shelter Data message
  const [records, setRecords] = useState([]);
  const [displayedRecords, setDisplayedRecords] = useState([]);
  const [loadCount, setLoadCount] = useState(5); // Number of records to display initially, and load more each time
  const [filterType, setFilterType] = useState('All'); // new state for filter type
  const [selectedButton, setSelectedButton] = useState('All');
  const [goHere, setGoHere] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1279); // state to check if the screen is mobile size
  // const [uniqueLocations, setUniqueLocations] = useState({}); // alt piece of state to store unique locations

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/shelters`)
        .then((response) => {
          // // Process the data to create unique locations
          // const processedData = processData(response.data);
          // // console.log('processedData is', processedData);
          // setUniqueLocations(processedData); // Update the state

          filterAndSortData(response.data, 'All');
          // setTimeout to display Loading Shelter Data message for 1 second
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    // check if the screen is mobile size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Alternative method to process data to create unique locations
  //   const processData = (data) => {
  //     const uniqueLocations = {};

  //     data.forEach((item, index) => {
  //       const address = item.LOCATION_ADDRESS;
  //       // const shelterGroup = item.SHELTER_GROUP;
  //       if (!uniqueLocations[address]) {
  //         uniqueLocations[index] = {
  //           id: index,
  //           shelterGroup: item.SHELTER_GROUP,
  //           address: item.LOCATION_ADDRESS,
  //           city: item.LOCATION_CITY,
  //           province: item.LOCATION_PROVINCE,
  //           postalCode: item.LOCATION_POSTAL_CODE,
  //           occupancyDate: item.OCCUPANCY_DATE,
  //           sector: item.SECTOR,
  //           capacityType: item.CAPACITY_TYPE,
  //           programModel: item.PROGRAM_MODEL,
  //           overnightServiceType: item.OVERNIGHT_SERVICE_TYPE,
  //           unoccupiedBeds: item.UNOCCUPIED_BEDS,
  //           unoccupiedRooms: item.UNOCCUPIED_ROOMS,
  //         };
  //       }
  //       // console.log('uniqueLocations is: ', uniqueLocations[address]);

  //     });

  //     return uniqueLocations;
  //   };
  // console.log('uniqueLocations =', uniqueLocations);

  // function to sort data by date updated, and then by availability
  const sortByDateAndAvailability = (a, b) => {
    const dateA = new Date(a.OCCUPANCY_DATE);
    const dateB = new Date(b.OCCUPANCY_DATE);

    if (dateA.getTime() !== dateB.getTime()) {
      return dateB.getTime() - dateA.getTime(); // Sort by date (most recent first)
    } else {
      const maxA = Math.max(parseInt(a.UNOCCUPIED_BEDS || '0', 10), parseInt(a.UNOCCUPIED_ROOMS || '0', 10));
      const maxB = Math.max(parseInt(b.UNOCCUPIED_BEDS || '0', 10), parseInt(b.UNOCCUPIED_ROOMS || '0', 10));
      return maxB - maxA; // If dates are equal, sort by availability (highest first)
    }
  };

  // function to filter data based on CAPACITY_TYPE, and then sort based on OCCUPANCY_DATE
  const filterAndSortData = (data, type) => {
  const fetchedData = JSON.parse(JSON.stringify(data)); // deep copy data to avoid mutating state
  let filteredData;

  if (type === 'Beds') {
    filteredData = fetchedData
      .filter((record) => record.CAPACITY_TYPE === 'Bed Based Capacity' && parseInt(record.UNOCCUPIED_BEDS, 10) > 0)
      .sort(sortByDateAndAvailability);
  } else if (type === 'Rooms') {
    filteredData = fetchedData
      .filter((record) => record.CAPACITY_TYPE === 'Room Based Capacity' && parseInt(record.UNOCCUPIED_ROOMS, 10) > 0)
      .sort(sortByDateAndAvailability);
  } else {
    filteredData = fetchedData
      .filter((record) => {
        const maxAvailability = Math.max(parseInt(record.UNOCCUPIED_BEDS || '0', 10), parseInt(record.UNOCCUPIED_ROOMS || '0', 10));
        return maxAvailability > 0;
      })
      .sort(sortByDateAndAvailability);
  }

  setRecords(fetchedData); // set newly sorted records
  setDisplayedRecords(filteredData.slice(0, loadCount)); // initially load 5 records
  setFilterType(type); // set filter state
  setGoHere(null);
};


  // function to load more records
  const loadMore = () => {
    const newLoadCount = loadCount + 5; // Calculate the new load count
    setLoadCount(newLoadCount); // Update the load count state

    // Re-apply the current filter and slicing based on the new load count
    let newDisplayedRecords = [];
    if (filterType === 'Beds') {
      newDisplayedRecords = records
        .filter((record) => record.CAPACITY_TYPE === 'Bed Based Capacity' && parseInt(record.UNOCCUPIED_BEDS, 10) > 0)
        .sort(sortByDateAndAvailability)
        .slice(0, newLoadCount);
    } else if (filterType === 'Rooms') {
      newDisplayedRecords = records
        .filter((record) => record.CAPACITY_TYPE === 'Room Based Capacity' && parseInt(record.UNOCCUPIED_ROOMS, 10) > 0)
        .sort(sortByDateAndAvailability)
        .slice(0, newLoadCount);
    } else { // Default to 'All', applying a sort based on occupancy (if needed) and slicing
      newDisplayedRecords = records
        .filter((record) => {
          const maxAvailability = Math.max(parseInt(record.UNOCCUPIED_BEDS || '0', 10), parseInt(record.UNOCCUPIED_ROOMS || '0', 10));
          return maxAvailability > 0;
        })
        .sort(sortByDateAndAvailability)
        .slice(0, newLoadCount);
    }
    // Update the displayed records based on the newly applied filter and slice
    setDisplayedRecords(newDisplayedRecords);
  };

  // function to handle button click
  const handleClick = (button) => {
    setSelectedButton(button);
  };

  const handleCardClick = (record) => {
    setGoHere(record);
    document.body.style.overflow = 'hidden'; // disable scrolling
    document.querySelector('header').classList.replace('visible', 'hidden'); // Hide header
  };

  const closeDetailedView = () => {
    setGoHere(null);
    document.body.style.overflow = 'auto'; // Enable scrolling
    document.querySelector('header').classList.replace('hidden', 'visible'); // Show header
  };

  // Console logs for debugging purposes
  // console.log('displayed records= ', displayedRecords.map(record => record.LOCATION_ADDRESS));
  // console.log('displayedRecords:', displayedRecords);
  // console.log('filtered data:', filteredData);
  // console.log('records = :', records);
  // console.log('goHere= ', goHere)

  const observer = useRef(null); // Using useRef to persist the observer instance

  useEffect(() => {
    // Observer setup
    observer.current = new IntersectionObserver(
      (entries) => {
        console.log('entries', entries);
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      {
        threshold: 0.5,
      },
      []
    );

    // Attaching observer to elements
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.current.observe(el));

    // Cleanup function to disconnect observer
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const calculateDaysAgo = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const timeDifference = today.getTime() - date.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    if (daysDifference === 0) {
      return '(Today)';
    } else if (daysDifference === 1) {
      return '(1 Day Ago)';
    } else {
      return `(${daysDifference} Days Ago)`;
    }
  };


  return (
    <>
      <section className='shelter-section' id='shelters'>
        <div className='shelter-section__upper'>
          <h3 className='shelter-section__header'>
            Latest Shelter Occupancy in Toronto
          </h3>

          <br />
          <span className='shelter-section__subHeader'>
            <div className='subHeader__upper'>
              <p className='subHeader__title'>FILTER BY →</p>
              <FilterButtons
                selectedButton={selectedButton}
                filterAndSortData={filterAndSortData}
                handleClick={handleClick}
                records={records}
              ></FilterButtons>
            </div>
            <hr className='subheader__divider'></hr>
            <div className='subHeader__lower'>
              <span className='subheader__text'>
                Results are automatically sorted by most recently updated, with
                highest occupancy
              </span>
            </div>
          </span>
        </div>
        {isMobile ? (
          <div className='mobile__shelter-scrollable-container'>
            <span className='mobile__instructions-text'>
              Tap a shelter to learn more ⟩⟩⟩
            </span>
            <ul className='shelter-list'>
              {displayedRecords.map((record) => (
                <li
                  className='shelter-item mobile__shelter-item'
                  key={record._id}
                  onClick={() => handleCardClick(record)}
                >
                  <div className='shelter-item__content'>
                    <h6 className='shelter-item__text'>
                      {record.SHELTER_GROUP} ⟩⟩⟩
                    </h6>
                    <p className='shelter-item__availability mobile__shelter-item__availability'>
                      {record.CAPACITY_TYPE === 'Bed Based Capacity'
                        ? `Available Beds: ${record.UNOCCUPIED_BEDS}`
                        : `Available Rooms: ${record.UNOCCUPIED_ROOMS}`}
                      <br />
                      Last Updated: {record.OCCUPANCY_DATE}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <LoadMoreButton loading={loading} loadMore={loadMore} />
          </div>
        ) : (
          <div className='shelter-section__lower'>
            <div className='shelter-scrollable-container'>
              <div className='shelter-cards'>
                <ul className='shelter-list'>
                  <div>
                    {displayedRecords &&
                      displayedRecords.map(
                        (
                          record // first, checks if displayedRecords data exists, then maps through the data
                        ) => (
                          // Using _id as key
                          <li className='shelter-item' key={record._id}>
                            <div className='shelter-item__content'>
                              <div className='shelter-item__left'>
                                <ul className='shelter-item__left-inner'>
                                  <div className='shelter-item__title'>
                                    <h6 className='shelter-item__text'>
                                      {record.SHELTER_GROUP}
                                    </h6>
                                  </div>

                                  <div className='shelter-item__details'>
                                    <h4 className='shelter-item__availability'>
                                      {record.CAPACITY_TYPE ===
                                      'Bed Based Capacity'
                                        ? `Available Beds: ${record.UNOCCUPIED_BEDS}`
                                        : `Available Rooms: ${record.UNOCCUPIED_ROOMS}`}
                                      <br />
                                      Last Updated: {record.OCCUPANCY_DATE} <br /> {calculateDaysAgo(record.OCCUPANCY_DATE)}
                                    </h4>
                                  </div>
                                </ul>

                                <div className='shelter-item__actions'>
                                  <a
                                    href={`https://www.google.com/maps/place/${encodeURIComponent(
                                      record.LOCATION_ADDRESS
                                    )},+${encodeURIComponent(
                                      record.LOCATION_CITY
                                    )},+${encodeURIComponent(
                                      record.LOCATION_POSTAL_CODE
                                    )}`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                  >
                                    {/* <button className='shelter-item__actions-btn'>
                                      <img
                                        className='btn--Directions-Icon'
                                        src={RouteIcon}
                                        alt='Route Icon'
                                      />
                                      <h4 className='btn--Directions-Text'>
                                        Get Directions
                                      </h4>
                                    </button> */}
                                  </a>
                                  <button
                                    className='shelter-item__actions-btn'
                                    onClick={() => handleCardClick(record)}
                                  >
                                    <span>
                                      <FontAwesomeIcon
                                        icon={faLocationCrosshairs}
                                        size='lg'
                                      />
                                    </span>
                                    <h4 className='btn--Share-Text'>Go Here</h4>
                                  </button>
                                </div>
                              </div>

                              <hr className='shelter-item__divider' />

                              <div className='shelter-item__right'>
                                <ul className='shelter-item__right-inner'>
                                  <h4 className='shelter-item__right-title'>
                                    LOCATION ADDRESS{' '}
                                  </h4>
                                  <p className='shelter-item__right-text'>
                                    {record.LOCATION_ADDRESS}
                                    <br />
                                    {record.LOCATION_CITY} <br />
                                    {record.LOCATION_POSTAL_CODE}
                                  </p>
                                </ul>

                                <ul className='shelter-item__right-inner'>
                                  <h4 className='shelter-item__right-title'>
                                    SECTOR (User Group){' '}
                                  </h4>
                                  <p className='shelter-item__right-text'>
                                    {record.SECTOR}
                                  </p>
                                </ul>

                                <ul className='shelter-item__right-inner'>
                                  <h4 className='shelter-item__right-title'>
                                    ACCOMODATION TYPE{' '}
                                  </h4>
                                  <p className='shelter-item__right-text'>
                                    {record.CAPACITY_TYPE}
                                  </p>
                                </ul>

                                <ul className='shelter-item__right-inner'>
                                  <h4 className='shelter-item__right-title'>
                                    PROGRAM MODEL{' '}
                                  </h4>
                                  <p className='shelter-item__right-text'>
                                    {record.PROGRAM_MODEL}
                                  </p>
                                  {/* <p className='shelter-item__right-text'>
                                    {record.OVERNIGHT_SERVICE_TYPE}
                                  </p> */}
                                </ul>

                                <ul className='shelter-item__right-inner'>
                                  <h4 className='shelter-item__right-title'>
                                    SERVICE TYPE{' '}
                                  </h4>
                                  <p className='shelter-item__right-text'>
                                    {record.OVERNIGHT_SERVICE_TYPE}
                                  </p>
                                </ul>
                              </div>
                            </div>
                          </li>
                        )
                      )}
                  </div>
                </ul>

                <LoadMoreButton
                  loading={loading}
                  loadMore={loadMore}
                ></LoadMoreButton>
              </div>
            </div>
            <SheltersMap
              locations={displayedRecords}
              records={records}
              filterType={filterType}
              goHere={goHere}
            ></SheltersMap>
          </div>
        )}
        {/* <span className='scroll-instructions'>↓ Scroll Down For More ↓</span> */}
        {goHere && (
          <div className='shelter-detailed-view'>
            <button className='back-button' onClick={closeDetailedView}>
              <FontAwesomeIcon icon={faCircleArrowLeft} /> Back To Shelters
            </button>
            <span className='location-text'>LOCATION MAP</span>

            <SheltersMap
              locations={displayedRecords}
              records={records}
              filterType={filterType}
              goHere={goHere}
            ></SheltersMap>
            <div className='detailed-view__container'>
              <ul className='shelter-item__right-inner'></ul>
              <ul className='shelter-item__right-inner'>
                <h4 className='shelter-item__right-title mobile-header'>
                  LOCATION DETAILS
                </h4>
                <div className='detailed-view__text-container'>
                  <p className='shelter-item__right-text mobile-left'>
                    Organization Name
                    <br />
                    Shelter Group
                    <br />
                    Overnight Service Type
                    <br />
                    Sector
                    <br />
                    Capacity Type
                    <br />
                    Program Model
                    <br />
                    Total Capacity
                  </p>
                  <p className='shelter-item__right-text mobile-right'>
                    {goHere.ORGANIZATION_NAME}
                    <br />
                    {goHere.SHELTER_GROUP}
                    <br />
                    {goHere.OVERNIGHT_SERVICE_TYPE}
                    <br />
                    {goHere.SECTOR}
                    <br />
                    {goHere.CAPACITY_TYPE}
                    <br />
                    {goHere.PROGRAM_MODEL}
                    <br />
                    {goHere.CAPACITY_ACTUAL_BED || goHere.CAPACITY_ACTUAL_ROOM}
                  </p>
                </div>
              </ul>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
