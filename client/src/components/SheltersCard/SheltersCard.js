import './SheltersCard.scss'; // Assuming this is the correct path to your CSS file
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SheltersCard() {
    const [records, setRecords] = useState([]);
    const [displayedRecords, setDisplayedRecords] = useState([]);
    const [loadCount, setLoadCount] = useState(5); // Number of records to display initially, and load more each time

    useEffect(() => {
      axios.get('http://localhost:8080/shelters/')
      .then(response => {
        // console.log(response.data);
        const sortedRecords = response.data.sort((a, b) => new Date(b.OCCUPANCY_DATE) - new Date(a.OCCUPANCY_DATE)); // Sorting based on OCCUPANCY_DATE
        setRecords(sortedRecords); // set newly sorted records
        setDisplayedRecords(sortedRecords.slice(0, loadCount)); // initially load 10 records
       })
        .catch(err => console.error(err));
      }, []);

      const loadMore = () => {
        setLoadCount(loadCount + 5); // load 10 more records
        setDisplayedRecords(records.slice(0, loadCount + 5)); // set displayed records to the first 5 + 5 more
      }

  return (
    <>
      <section className="sheltersCard__section">
        <ul>
          {displayedRecords.map(record => ( // Mapping over records
            //Using _id as a key
            <li key={record._id}>
              <br />
              <ul>Organization Name: {record.ORGANIZATION_NAME}</ul>
              <ul>Shelter Group: {record.SHELTER_GROUP}</ul>
              <ul>Location Name: {record.LOCATION_NAME}</ul>
              <ul>Location Address: {record.LOCATION_ADDRESS}</ul>
              <ul>Capacity Type: {record.CAPACITY_TYPE}</ul>
              <ul>Unoccupied Beds: {record.UNOCCUPIED_BEDS}</ul>
              <ul>Occupancy Date: {record.OCCUPANCY_DATE}</ul>
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
