import './SheltersCard.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SheltersMap from '../SheltersMap/SheltersMap';

export default function SheltersCard() {
  const [records, setRecords] = useState([]);
  const [displayedRecords, setDisplayedRecords] = useState([]);
  const [loadCount, setLoadCount] = useState(5); // Number of records to display initially, and load more each time
  const [filterType, setFilterType] = useState('All'); // new state for filter type

  useEffect(() => {
    const fetchData = async () => {
    axios
      .get('http://localhost:8080/shelters/')
      .then((response) => {
        // console.log(response.data);
        filterAndSortData(response.data, 'All');
      })
      .catch((err) => console.error(err));
    };

    fetchData();
  }, []);

  // function to filter data based on CAPACITY_TYPE, and then sort based on OCCUPANCY_DATE
  const filterAndSortData = (data, type) => {
    const fetchedData = JSON.parse(JSON.stringify(data));
    let filteredData;
    let tableData;
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

  return (
    <>
      <section className="sheltersCard__section">
        <div className="sheltersCard__div">
          <h1 className="sheltersCard__div-h2">Latest Shelter Occupancy in Toronto:</h1>
          <button
            className="sheltersCard__Btn btn--All"
            onClick={() => filterAndSortData(records, 'All')}>
              <h3>All</h3>
          </button>
          <button
            className="sheltersCard__Btn btn--Beds"
            onClick={() => filterAndSortData(records, 'Beds')}>
            <h3>Beds</h3>
          </button>
          <button
            className="sheltersCard__Btn btn--Rooms"
            onClick={() => filterAndSortData(records, 'Rooms')}>
            <h3>Rooms</h3>
          </button>
        </div>
        <div className="shelterInfo__Parent">
          <div className="scrollable-container">
            <div className="shelterInfo__div">
              <ul className="shelterInfo__div-ul">
                {displayedRecords.map((record ) => (
                    //Using _id as key
                    <li className="shelterInfo__div-li" key={record._id}>
                        <div className="shelterInfo__div-left">
                          <ul className="shelterInfo__div-left-inner">
                            <h3 className="shelterInfo__div-h3">Organization Name: </h3>
                              <p>{record.ORGANIZATION_NAME}</p>
                                </ul>
                          <ul className="shelterInfo__div-left-inner">
                            <h3 className="shelterInfo__div-h3">Shelter Group: </h3>
                              <p>{record.SHELTER_GROUP}</p>
                                </ul>
                          <ul className="shelterInfo__div-left-inner">
                            <h3 className="shelterInfo__div-h3">Location Name: </h3>
                              <p>{record.LOCATION_NAME}</p>
                                </ul>
                          <ul className="shelterInfo__div-left-inner">
                            <h3 className="shelterInfo__div-h3">Location Address: </h3>
                              <p>{record.LOCATION_ADDRESS}</p>
                                </ul>
                        </div>
                        <div className="shelterInfo__div-right">
                          <ul className="shelterInfo__div-right-inner">
                            <h3 className="shelterInfo__div-h3">Location Postal Code: </h3>
                              <p>{record.LOCATION_POSTAL_CODE}</p>
                          </ul>
                          <ul className="shelterInfo__div-right-inner">
                            <h3 className="shelterInfo__div-h3">Type: </h3>
                              <p>{record.CAPACITY_TYPE}</p>
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

                          <ul className="shelterInfo__div-right-inner">
                            <br />
                              <h3 className="shelterInfo__div-h3">Last Updated: </h3>
                              <h3>{record.OCCUPANCY_DATE}</h3>
                                </ul>
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
              loadCount < records.length &&
              (
                <button
                  onClick={loadMore}
                  className="loadMoreBtn btn--LoadMore">
                    Load More
                </button>
              )
            }
          </div>
          <SheltersMap />
        </div>
      </section>
    </>
  );
}
