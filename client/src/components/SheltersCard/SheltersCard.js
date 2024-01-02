import './SheltersCard.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SheltersMap from '../SheltersMap/SheltersMap';

export default function SheltersCard(record) {
  const [loading, setLoading] = useState(true); // state to show/hide Loading Shelter Data message
  const [records, setRecords] = useState([]);
  const [displayedRecords, setDisplayedRecords] = useState([]);
  const [loadCount, setLoadCount] = useState(5); // Number of records to display initially, and load more each time
  const [filterType, setFilterType] = useState('All'); // new state for filter type
  const [selectedButton, setSelectedButton] = useState(null);
  const [showLoadMore, setShowLoadMore] = useState(false); // state to show/hide Load More button

  // fetch data from server
  useEffect(() => {
    const fetchData = async () => {
    await axios
      .get('http://localhost:8080/shelters/')
      .then((response) => {
        // console.log(response.data[0].CAPACITY_ACTUAL_BED);
        filterAndSortData(response.data, 'All');
        setTimeout(() => { // display Loading Shelter Data message for 1 second
          setLoading(false);
        }, 1000);
      })
      .catch((err) => console.error(err));
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Set a timeout to show the Load More button after 2 seconds
    const timer = setTimeout(() => {
      setShowLoadMore(true);
    }, 2000);

    return () => clearTimeout(timer);    // Clean up function to clear the timeout
  }, []);

  // function to filter data based on CAPACITY_TYPE, and then sort based on OCCUPANCY_DATE
  const filterAndSortData = (data, type) => {
    const fetchedData = JSON.parse(JSON.stringify(data)); // deep copy data to avoid mutating state
    let filteredData;
    if (type === 'Beds') {
      // console.log(`Before filtering for ${type}:`, data); // troubleshooting data mutation
      filteredData = fetchedData
        .filter((record) => record.CAPACITY_TYPE === 'Bed Based Capacity')
        .sort((a, b) => parseInt(b.UNOCCUPIED_BEDS, 10) - parseInt(a.UNOCCUPIED_BEDS, 10));
      // console.log(`After filtering for ${type}:`, filteredData); // troubleshooting data mutation
    } else if (type === 'Rooms') {
      // console.log(`Before filtering for ${type}:`, data); // troubleshooting data mutation
      filteredData = fetchedData
        .filter((record) => record.CAPACITY_TYPE === 'Room Based Capacity')
        .sort((a, b) => parseInt(b.UNOCCUPIED_ROOMS, 10) - parseInt(a.UNOCCUPIED_ROOMS, 10));
      // console.log(`After filtering for ${type}:`, filteredData); // troubleshooting data mutation
    } else {
      // console.log(`Before filtering for ${type}:`, data); // troubleshooting data mutation
      filteredData = fetchedData.sort((a, b) => {
        const maxA = Math.max(parseInt(a.UNOCCUPIED_BEDS || '0', 10), parseInt(a.UNOCCUPIED_ROOMS || '0', 10));
        const maxB = Math.max(parseInt(b.UNOCCUPIED_BEDS || '0', 10), parseInt(b.UNOCCUPIED_ROOMS || '0', 10));
        return maxB - maxA;
      });
      // console.log(`After filtering for ${type}:`, filteredData); // troubleshooting data mutation
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


  return (
    <>
      <section className="sheltersCard__section" id="shelters">
        <div className="sheltersCard__div">
          <h1 className="sheltersCard__div-h2">Latest Shelter Occupancy in Toronto</h1>
          <h2>Filter By:</h2>
          <button className={`sheltersCard__Btn btn--All ${selectedButton === 'All' ? 'selected' : ''}`}
            onClick={() => { // onClick, filter and sort data, and set selected button
              filterAndSortData(records, 'All');
              handleClick('All');
            }}
          >
            <h3>All</h3>
          </button>
          <button className={`sheltersCard__Btn btn--Beds ${selectedButton === 'Beds' ? 'selected' : ''}`}
            onClick={() => { // onClick, filter and sort data, and set selected button
              filterAndSortData(records, 'Beds');
              handleClick('Beds');
            }}
          >
            <h3>Beds</h3>
          </button>
          <button className={`sheltersCard__Btn btn--Rooms ${selectedButton === 'Rooms' ? 'selected' : ''}`}
            onClick={() => { // onClick, filter and sort data, and set selected button
              filterAndSortData(records, 'Rooms');
              handleClick('Rooms');
            }}
          >
            <h3>Rooms</h3>
          </button>
        </div>
        <div className="shelterInfo__Parent">
          <div className="scrollable-container">
            <div className="shelterInfo__div">
              <ul className="shelterInfo__div-ul">
                {loading ? <h1 className="loading-message">Loading Shelter Data...</h1> :
                  displayedRecords && displayedRecords.map((record ) => ( // first, checks if displayedRecords data exists, then maps through the data
                    //Using _id as key
                    <li className="shelterInfo__div-li" key={record._id}>
                        <div className="shelterInfo__div-left">
                          <ul className="shelterInfo__div-left-inner">
                            <h3 className="shelterInfo__div-h3">Shelter Group: </h3>
                              <p>{record.SHELTER_GROUP}</p>
                                </ul>
                          <ul className="shelterInfo__div-left-inner">
                            <h3 className="shelterInfo__div-h3">Address: </h3>
                              <p id='locationAddress'>{record.LOCATION_ADDRESS}</p>
                                </ul>
                          <ul className="shelterInfo__div-left-inner">
                            <h3 className="shelterInfo__div-h3">City: </h3>
                              <p>{record.LOCATION_CITY}</p>
                                </ul>
                          <ul className="shelterInfo__div-left-inner">
                            <h3 className="shelterInfo__div-h3">Postal Code: </h3>
                            <br />
                              <p>{record.LOCATION_POSTAL_CODE}</p>
                                </ul>
                          <ul className="shelterInfo__div-right-inner">
                            <br />
                              <h3 className="shelterInfo__div-h3">Last Updated: </h3>
                              <br />
                              <h3>{record.OCCUPANCY_DATE}</h3>
                                </ul>
                        </div>
                        <div className="shelterInfo__div-right">
                          <ul className="shelterInfo__div-left-inner">
                              <h3 className="shelterInfo__div-h3">Sector: </h3>
                                <p>{record.SECTOR}</p>
                                  </ul>
                          <ul className="shelterInfo__div-right-inner">
                            <h3 className="shelterInfo__div-h3">Type: </h3>
                              <p>{record.CAPACITY_TYPE}</p>
                                </ul>
                          <ul className="shelterInfo__div-right-inner">
                            <h3 className="shelterInfo__div-h3">Program Model: </h3>
                              <p>{record.PROGRAM_MODEL}</p>
                              <p>{record.OVERNIGHT_SERVICE_TYPE}</p>
                                </ul>

                          { // if CAPACITY_TYPE is Bed Based Capacity, display UNOCCUPIED_BEDS
                            record.CAPACITY_TYPE === 'Bed Based Capacity'
                              ?
                                (<ul className="shelterInfo__div-right-inner">
                                  <h3 className="shelterInfo__div-h3">Available Beds: </h3>
                                    <p>{record.UNOCCUPIED_BEDS}</p></ul>)
                              : ('')
                          }
                          { // if CAPACITY_TYPE is Room Based Capacity, display UNOCCUPIED_ROOMS
                            record.CAPACITY_TYPE === 'Room Based Capacity'
                            ?
                            (<ul className="shelterInfo__div-right-inner">
                              <h3 className="shelterInfo__div-h3">Available Rooms: </h3>
                                <p>{record.UNOCCUPIED_ROOMS}</p></ul>)
                            : ('')
                          }

                        </div>

                      <div className="actions__div">
                        <button className="btn--Directions">
                          <h3>Directions</h3>
                        </button>
                        <button className="btn--Share">
                          <h3>Share</h3>
                        </button>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>
            { // if loadCount is less than records.length, display load more button
              loadCount < records.length && showLoadMore &&
              (
                <button
                  onClick={loadMore}
                  className="loadMoreBtn btn--LoadMore">
                    Load More
                </button>
              )
            }
          </div>
          <SheltersMap  />
        </div>
      </section>
    </>
  );
}
