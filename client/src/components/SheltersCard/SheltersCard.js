import './SheltersCard.scss'; // Assuming this is the correct path to your CSS file
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SheltersCard() {
    const [records, setRecords] = useState([]);
    const [displayedRecords, setDisplayedRecords] = useState([]);
    const [loadCount, setLoadCount] = useState(5); // Number of records to display initially, and load more each time
    const [filterType, setFilterType] = useState('All'); // new state for filter type

    useEffect(() => {
      axios.get('http://localhost:8080/shelters/')
      .then(response => {
        // console.log(response.data);
        filterAndSortData(response.data, 'All');
       })
        .catch(err => console.error(err));
      }, []);

      // function to filter data based on CAPACITY_TYPE, and then sort based on OCCUPANCY_DATE
      const filterAndSortData = (data, type) => {
        let filteredData;
        if (type === 'Beds') {
          filteredData = data.filter(record => record.CAPACITY_TYPE === 'Bed Based Capacity');
          filteredData.sort((a, b) => b.UNOCCUPIED_BEDS - a.UNOCCUPIED_BEDS); // sorting based on UNOCCUPIED_BEDS
        } else if (type === 'Rooms') {
          filteredData = data.filter(record => record.CAPACITY_TYPE === 'Room Based Capacity');
          filteredData.sort((a, b) => b.UNOCCUPIED_ROOMS - a.UNOCCUPIED_ROOMS); // sorting based on UNOCCUPIED_ROOMS
        } else {
          filteredData = [...data];
        }
        // const sortedData = filteredData.sort((a, b) => new Date(b.OCCUPANCY_DATE) - new Date(a.OCCUPANCY_DATE)); // Sorting based on OCCUPANCY_DATE

        setRecords(filteredData); // set newly sorted records
        setDisplayedRecords(filteredData.slice(0, loadCount)); // initially load 10 records
        setFilterType(type); // set filter state
      }

      // function to load more records
      const loadMore = () => {
        setLoadCount(loadCount + 5); // load 10 more records
        setDisplayedRecords(records.slice(0, loadCount + 5)); // set displayed records to the first 5 + 5 more
      }

  return (
    <>
      <section className="sheltersCard__section">
        <div>
          <h2 className="sheltersCard__div-h2">SORT BY:</h2>
          <button onClick={() => filterAndSortData(records, 'All')}>All</button>
          <button onClick={() => filterAndSortData(records, 'Beds')}>Beds</button>
          <button onClick={() => filterAndSortData(records, 'Rooms')}>Rooms</button>

        </div>
          <ul>
            {displayedRecords.map(record => ( // Mapping over records
              //Using _id as a key
              <li key={record._id}>
                <br />
                <ul>Organization Name: {record.ORGANIZATION_NAME}</ul>
                <ul>Shelter Group: {record.SHELTER_GROUP}</ul>
                <ul>Location Name: {record.LOCATION_NAME}</ul>
                <ul>Location Address: {record.LOCATION_ADDRESS}</ul>
                <ul>Type: {record.CAPACITY_TYPE}</ul>
                {record.CAPACITY_TYPE === 'Bed Based Capacity' ? <ul>Available Beds: {record.UNOCCUPIED_BEDS}</ul> : ''}
                {record.CAPACITY_TYPE === 'Room Based Capacity' ? <ul>Available Rooms: {record.UNOCCUPIED_ROOMS}</ul> : ''}
                <ul>Last Updated: {record.OCCUPANCY_DATE}</ul>
                <br />
                {/* {record.LOCATION_NAME} | {record.LOCATION_ADDRESS} | {record.UNOCCUPIED_BEDS} */}
              </li>
            ))}
          </ul>
        {loadCount < records.length && (
          <button onClick={loadMore} className="loadMoreButton">Load More</button>
        )}
      </section>
    </>
  );
}
