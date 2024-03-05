import './SheltersCard.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SheltersMap from '../SheltersMap/SheltersMap';
import RouteIcon from '../../assets/icons/SafeHavenTO_icon-route.svg'
import ShareIcon from '../../assets/icons/SafeHavenTO_icon-share.svg'
import FilterButtons from '../FilterButtons/FilterButtons';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';

export default function SheltersCard() {
  const [loading, setLoading] = useState(true); // state to show/hide Loading Shelter Data message
  const [records, setRecords] = useState([]);
  const [displayedRecords, setDisplayedRecords] = useState([]);
  const [loadCount, setLoadCount] = useState(5); // Number of records to display initially, and load more each time
  const [filterType, setFilterType] = useState('All'); // new state for filter type
  const [selectedButton, setSelectedButton] = useState('All');
  const [goHere, setGoHere] = useState(null);

  // const [uniqueLocations, setUniqueLocations] = useState({}); // alt piece of state to store unique locations

  useEffect(() => {
    const fetchData = async () => {
      axios
        // .get('http://localhost:8080/shelters/') // for local development
        .get(`${process.env.REACT_APP_BACKEND_URL}/shelters/`)
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





  // function to filter data based on CAPACITY_TYPE, and then sort based on OCCUPANCY_DATE
  const filterAndSortData = (data, type) => {
    const fetchedData = JSON.parse(JSON.stringify(data)); // deep copy data to avoid mutating state
    let filteredData;
    if (type === 'Beds') {
      filteredData = fetchedData
        .filter((record) => record.CAPACITY_TYPE === 'Bed Based Capacity')
        .sort((a, b) => parseInt(b.UNOCCUPIED_BEDS, 10) - parseInt(a.UNOCCUPIED_BEDS, 10));
    } else if (type === 'Rooms') {
      filteredData = fetchedData
        .filter((record) => record.CAPACITY_TYPE === 'Room Based Capacity')
        .sort((a, b) =>parseInt(b.UNOCCUPIED_ROOMS, 10) - parseInt(a.UNOCCUPIED_ROOMS, 10));
    } else {
      filteredData = fetchedData.sort((a, b) => {
        const maxA = Math.max(
          parseInt(a.UNOCCUPIED_BEDS || '0', 10),
          parseInt(a.UNOCCUPIED_ROOMS || '0', 10)
        );
        const maxB = Math.max(
          parseInt(b.UNOCCUPIED_BEDS || '0', 10),
          parseInt(b.UNOCCUPIED_ROOMS || '0', 10)
        );
        return maxB - maxA;
      });
    }

    setRecords(fetchedData); // set newly sorted records
    setDisplayedRecords(filteredData.slice(0, loadCount)); // initially load 5 records
    setFilterType(type); // set filter state
  };

  // function to load more records
  const loadMore = () => {
    setLoadCount(loadCount + 5); // load 5 more records
    setDisplayedRecords(records.slice(0, loadCount + 5)); // set displayed records to the first 5 + 5 more
  };

  // function to handle button click
  const handleClick = (button) => {
    setSelectedButton(button);
  };

  const handleCardClick = (record) => {
    setGoHere(record);
    // setViewState({
    //   longitude: place.geometry.coordinates[0],
    //   latitude: place.geometry.coordinates[1],
    //   zoom: 10 // or any appropriate zoom level
    // });
  };

  // Console logs for debugging purposes
  // console.log('displayed records= ', displayedRecords.map(record => record.LOCATION_ADDRESS));
  // console.log('displayedRecords:', displayedRecords);
  // console.log('filtered data:', filteredData);
  // console.log('records = :', records);
  // console.log('goHere= ', goHere)

  return (
    <>
      <section className="shelter-section" id="shelters">
        <div className="shelter-section__upper">
          <h3 className="shelter-section__header">Latest Shelter Occupancy in Toronto</h3>

          <br />
          <br />
          <br />
          <span className="shelter-section__subHeader">FILTER BY ➡
          <FilterButtons
            selectedButton={selectedButton}
            filterAndSortData={filterAndSortData}
            handleClick={handleClick}
            records={records}
          ></FilterButtons>
          </span>

        </div>
        <div className="shelter-section__lower">
          <div className="shelter-scrollable-container">
            <div className="shelter-cards">
              <ul className="shelter-list">
              <div>
                {displayedRecords && displayedRecords.map((record) => ( // first, checks if displayedRecords data exists, then maps through the data
                      // Using _id as key
                      <li className="shelter-item" key={record._id}>
                        <div className='shelter-item__content'>
                          <div className="shelter-item__left">
                            <ul className="shelter-item__left-inner">
                              <div className='shelter-item__title'>
                                <h6 className='shelter-item__text'>{record.SHELTER_GROUP}</h6>
                              </div>

                              <div className="shelter-item__details">
                                <h4 className="shelter-item__availability">
                                  {record.CAPACITY_TYPE === 'Bed Based Capacity'
                                    ? `Available Beds: ${record.UNOCCUPIED_BEDS}`
                                    : `Available Rooms: ${record.UNOCCUPIED_ROOMS}`
                                  }
                                  {/* {record.CAPACITY_TYPE === 'Room Based Capacity' ? `Available Rooms: ${record.UNOCCUPIED_ROOMS}` : ''} */}
                                  <br />
                                  Last Updated: {record.OCCUPANCY_DATE}
                                </h4>
                              </div>
                            </ul>

                            <div className="shelter-item__actions">
                            <a href={`https://www.google.com/maps/place/${encodeURIComponent(record.LOCATION_ADDRESS)},+${encodeURIComponent(record.LOCATION_CITY)},+${encodeURIComponent(record.LOCATION_POSTAL_CODE)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button className="shelter-item__actions-btn">
                                <img className='btn--Directions-Icon' src={RouteIcon} alt="Route Icon" />
                                <h4 className='btn--Directions-Text'>Get Directions</h4>
                              </button>
                            </a>
                              <button className="shelter-item__actions-btn" onClick={() => handleCardClick(record)}>
                                <img className='btn--Share-Icon' src={ShareIcon} alt="Share Icon" />
                                <h4 className='btn--Share-Text'>Go Here</h4>
                              </button>

                            </div>
                          </div>

                          <hr className='shelter-item__divider' />

                          <div className="shelter-item__right">
                            <ul className="shelter-item__right-inner">
                              <h4 className="shelter-item__right-title">LOCATION ADDRESS </h4>
                              <p className='shelter-item__right-text'>
                                {record.LOCATION_ADDRESS}<br />
                                {record.LOCATION_CITY} <br />
                                {record.LOCATION_POSTAL_CODE}
                              </p>
                            </ul>

                            <ul className="shelter-item__right-inner">
                              <h4 className="shelter-item__right-title">SECTOR </h4>
                              <p className='shelter-item__right-text'>{record.SECTOR}</p>
                            </ul>

                            <ul className="shelter-item__right-inner">
                              <h4 className="shelter-item__right-title">CAPACITY TYPE </h4>
                              <p className='shelter-item__right-text'>{record.CAPACITY_TYPE}</p>
                            </ul>

                            <ul className="shelter-item__right-inner">
                              <h4 className="shelter-item__right-title">PROGRAM MODEL </h4>
                              <p className='shelter-item__right-text'>{record.PROGRAM_MODEL}</p>
                              <p className='shelter-item__right-text'>{record.OVERNIGHT_SERVICE_TYPE}</p>

                            </ul>

                          </div>
                        </div>
                      </li>
                    )
                  )

                }
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
      </section>
    </>
  );
}
