import './ShelterMap.scss';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import SheltersMap from '../SheltersMap/SheltersMap';
import FilterButtons from '../FilterButtons/FilterButtons';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import EmergencyBanner from '../EmergencyBanner/EmergencyBanner';
import SheltersCardDetailedView from '../SheltersCardDetailedView/SheltersCardDetailedView';
import CalculateDaysAgo from '../../helpers/CalculateDaysAgo';

export default function ShelterMap() {
  const [loading, setLoading] = useState(true); // state to show/hide Loading Shelter Data message
  const [records, setRecords] = useState([]);
  const [displayedRecords, setDisplayedRecords] = useState([]);
  const [loadCount, setLoadCount] = useState(5); // Number of records to display initially, and load more each time
  const [filterType, setFilterType] = useState('All'); // new state for filter type
  const [selectedButton, setSelectedButton] = useState('All');
  const [goHere, setGoHere] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1); // state to check if the screen is mobile size
  const calculateDaysAgo = CalculateDaysAgo;

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
      const maxA = Math.max(
        parseInt(a.UNOCCUPIED_BEDS || '0', 10),
        parseInt(a.UNOCCUPIED_ROOMS || '0', 10)
      );
      const maxB = Math.max(
        parseInt(b.UNOCCUPIED_BEDS || '0', 10),
        parseInt(b.UNOCCUPIED_ROOMS || '0', 10)
      );
      return maxB - maxA; // If dates are equal, sort by availability (highest first)
    }
  };

  // function to filter data based on CAPACITY_TYPE, and then sort based on OCCUPANCY_DATE
  const filterAndSortData = (data, type) => {
    const fetchedData = JSON.parse(JSON.stringify(data)); // deep copy data to avoid mutating state
    let filteredData;

    if (type === 'Beds') {
      filteredData = fetchedData
        .filter(
          (record) =>
            record.CAPACITY_TYPE === 'Bed Based Capacity' &&
            parseInt(record.UNOCCUPIED_BEDS, 10) > 0
        )
        .sort(sortByDateAndAvailability);
    } else if (type === 'Rooms') {
      filteredData = fetchedData
        .filter(
          (record) =>
            record.CAPACITY_TYPE === 'Room Based Capacity' &&
            parseInt(record.UNOCCUPIED_ROOMS, 10) > 0
        )
        .sort(sortByDateAndAvailability);
    } else {
      filteredData = fetchedData
        .filter((record) => {
          const maxAvailability = Math.max(
            parseInt(record.UNOCCUPIED_BEDS || '0', 10),
            parseInt(record.UNOCCUPIED_ROOMS || '0', 10)
          );
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
        .filter(
          (record) =>
            record.CAPACITY_TYPE === 'Bed Based Capacity' &&
            parseInt(record.UNOCCUPIED_BEDS, 10) > 0
        )
        .sort(sortByDateAndAvailability)
        .slice(0, newLoadCount);
    } else if (filterType === 'Rooms') {
      newDisplayedRecords = records
        .filter(
          (record) =>
            record.CAPACITY_TYPE === 'Room Based Capacity' &&
            parseInt(record.UNOCCUPIED_ROOMS, 10) > 0
        )
        .sort(sortByDateAndAvailability)
        .slice(0, newLoadCount);
    } else {
      // Default to 'All', applying a sort based on occupancy (if needed) and slicing
      newDisplayedRecords = records
        .filter((record) => {
          const maxAvailability = Math.max(
            parseInt(record.UNOCCUPIED_BEDS || '0', 10),
            parseInt(record.UNOCCUPIED_ROOMS || '0', 10)
          );
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
    if (window.innerWidth < 768) {
      // breakpoint for mobile devices
      document.body.style.overflow = 'hidden';
    }
    document.querySelector('header').classList.replace('visible', 'hidden');
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

  return (
    <>
      <section className='shelter-map-container'>
        <SheltersMap
          locations={displayedRecords}
          records={records}
          filterType={filterType}
          goHere={goHere}
        ></SheltersMap>
      </section>
    </>
  );
}
