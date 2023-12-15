import './SheltersCard.scss'; // Assuming this is the correct path to your CSS file
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function FetchData() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:8080/shelters/')
      .then(response => {
        // console.log(response.data);
        setRecords(response.data);
       }) // Extracting records from the response
        .catch(err => console.error(err));
      }, []);

  return (
    <>
      <section className="sheltersCard__section">
        <ul>
          {records.map(record => ( // Mapping over records
            //Using _id as a key
            <li key={record._id}>
              <br />
              <ul>Organization Name: {record.ORGANIZATION_NAME}</ul>
              <ul>Shelter Group: {record.SHELTER_GROUP}</ul>
              <ul>Location Name: {record.LOCATION_NAME}</ul>
              <ul>Location Address: {record.LOCATION_ADDRESS}</ul>
              <ul>Unoccupied Beds: {record.UNOCCUPIED_BEDS}</ul>
              <ul>Occupancy Date: {record.OCCUPANCY_DATE}</ul>
              <br />

              {/* {record.LOCATION_NAME} | {record.LOCATION_ADDRESS} | {record.UNOCCUPIED_BEDS} */}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
