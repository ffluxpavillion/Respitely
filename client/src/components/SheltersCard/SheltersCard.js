import './SheltersCard.scss';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Spin, Pagination } from 'antd';
import SheltersMap from '../SheltersMap/SheltersMap';
import FilterButtons from '../FilterButtons/FilterButtons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleArrowLeft,
  faLocationCrosshairs,
} from '@fortawesome/free-solid-svg-icons';
import EmergencyBanner from '../EmergencyBanner/EmergencyBanner';
import SheltersCardDetailedView from '../SheltersCardDetailedView/SheltersCardDetailedView';
import CalculateDaysAgo from '../../helpers/CalculateDaysAgo';
import { useGeolocation } from '../../hooks/useGeolocation';
import * as turf from '@turf/turf';
import GeocodedLocationsContext from '../../contexts/GeocodedDataContext';

export default function SheltersCard() {
  const { locationInfo } = useGeolocation();
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [displayedRecords, setDisplayedRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filterType, setFilterType] = useState('All');
  const [goHere, setGoHere] = useState(null);
  const [filters, setFilters] = useState({
    sector: 'All',
    serviceType: 'All',
    location: 'All',
    occupancyRate: 'All',
  });
  const calculateDaysAgo = CalculateDaysAgo;
  const shelterListRef = useRef(null);

  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true);
      const queryParams = new URLSearchParams(filters).toString();
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/shelters?${queryParams}`
      );
      applyFiltersAndSort(response.data);
      setLoading(false);
    };

    fetchFilteredData();
  }, [filters]);

  const updateFilters = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

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

  const applyFiltersAndSort = (data) => {
    let filteredData = data.filter((record) => {
      const maxAvailability = Math.max(
        parseInt(record.UNOCCUPIED_BEDS || '0', 10),
        parseInt(record.UNOCCUPIED_ROOMS || '0', 10)
      );
      return maxAvailability > 0;
    });

    if (filters.capacityType && filters.capacityType !== 'All') {
      filteredData = filteredData.filter(
        (record) => record.CAPACITY_TYPE === filters.capacityType
      );
    }

    if (filters.sector && filters.sector !== 'All') {
      filteredData = filteredData.filter(
        (record) => record.SECTOR === filters.sector
      );
    }

    // if (
    //   filters.overnightServiceType &&
    //   filters.overnightServiceType !== 'All'
    // ) {
    //   filteredData = filteredData.filter(
    //     (record) =>
    //       record.OVERNIGHT_SERVICE_TYPE === filters.overnightServiceType
    //   );
    // }

    if (filters.programModel && filters.programModel !== 'All') {
      filteredData = filteredData.filter(
        (record) => record.PROGRAM_MODEL === filters.programModel
      );
    }

    if (filters.locationCity && filters.locationCity !== 'All') {
      filteredData = filteredData.filter(
        (record) => record.LOCATION_CITY === filters.locationCity
      );
    }

    // if (filters.occupancyRate && filters.occupancyRate !== 'All') {
    //   filteredData = filteredData.filter((record) => {
    //     const bedCondition =
    //       filters.occupancyRate === '100'
    //         ? record.OCCUPANCY_RATE_BEDS === '100'
    //         : record.OCCUPANCY_RATE_BEDS !== '100';
    //     const roomCondition =
    //       filters.occupancyRate === '100'
    //         ? record.OCCUPANCY_RATE_ROOMS === '100'
    //         : record.OCCUPANCY_RATE_ROOMS !== '100';
    //     return bedCondition || roomCondition;
    //   });
    // }

    filteredData = filteredData.sort(sortByDateAndAvailability);

    // TODO - Implement distance calculation -- BIG NEED TO FIX --TURF.JS + GEOCODEDDATACONTEXT -- implement geocoding on server side

    // Calculate distance if location info is available
    //   if (locationInfo) {
    //     const userLocation = turf.point([
    //       locationInfo.longitude,
    //       locationInfo.latitude,
    //     ]);
    //     console.log('userLocation=======', userLocation);
    //     console.log('locationInfoLAT==========', locationInfo.latitude);
    //     console.log('locationInfoLONG==========', locationInfo.longitude);

    //   filteredData = filteredData.map((record) => {
    //     const latitude = parseFloat(record.LATITUDE);
    //     const longitude = parseFloat(record.LONGITUDE);

    //     if (!isNaN(latitude) && !isNaN(longitude)) {
    //       const shelterLocation = turf.point([longitude, latitude]);
    //       const distance = turf
    //         .distance(userLocation, shelterLocation, { units: 'kilometers' })
    //         .toFixed(1);
    //       return { ...record, distance };
    //     } else {
    //       console.warn(
    //         `Invalid coordinates for record ${record._id}: LATITUDE=${record.LATITUDE}, LONGITUDE=${record.LONGITUDE}`
    //       );
    //       console.log('Record details:', record);
    //       return record; // Return the original record if coordinates are invalid
    //     }
    //   });

    //   // Filter out records with invalid distances
    //   filteredData = filteredData.filter(record => record.distance !== undefined);
    // }

    setRecords(filteredData); // Set all records
    setDisplayedRecords(filteredData.slice(0, itemsPerPage)); // Display initially loaded records
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setItemsPerPage(pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayedRecords(records.slice(startIndex, endIndex));
    shelterListRef.current.scrollIntoView({ behavior: 'smooth' }); // upon page change --> scroll to the top of results list
  };

  const handleCardClick = (record) => {
    setGoHere(record);
    document.body.style.overflow = 'hidden';
    document.querySelector('header').classList.replace('visible', 'hidden');
  };

  const closeDetailedView = () => {
    setGoHere(null);
    document.body.style.overflow = 'auto';
    document.querySelector('header').classList.replace('hidden', 'visible');
  };

  return (
    <>
      <section className='shelter-section' id='shelters'>
        <div className='shelter-section__upper'>
          <h3 className='shelter-section__header'>
            Latest Shelter Occupancy in Toronto
            <span ref={shelterListRef}></span>
          </h3>

          <span className='shelter-section__subHeader'>
            <div className='subHeader__upper'>
              <FilterButtons
                selectedFilters={filters}
                updateFilters={updateFilters}
              />
            </div>
            <hr className='subheader__divider'></hr>
            <div className='subHeader__lower'>
              <span className='subheader__text'>
                Results are auto-sorted by recently updated, and highest daily snapshot of unoccupied spaces.
              </span>
            </div>
          </span>
        </div>
        <EmergencyBanner />

        <div className='mobile__shelter-scrollable-container'>
          <span className='mobile__instructions-text'>
            Select a shelter to learn more ⟩⟩⟩
          </span>
          {loading ? (
            <Spin className='shelter-loading-spin' size='large' />
          ) : (
            <>
              <ul className='shelter-list'>
                {displayedRecords.map((record) => (
                  <li
                    className='shelter-item mobile__shelter-item'
                    key={record._id}
                    onClick={() => handleCardClick(record)}
                  >
                    <div className='shelter-item__content mobile__shelter-item__content'>
                      <h6 className='shelter-item__text'>
                        {record.SHELTER_GROUP} ⟩⟩⟩
                        <br />
                        <p className='shelter-item__location-glance'>
                          📍 {record.LOCATION_CITY}
                          {/* <br /> */}
                          {/* {record.distance
                            ? `Distance: ${record.distance} km`
                            : 'Calculating distance..'} */}
                        </p>
                      </h6>
                      <p className='shelter-item__availability mobile__shelter-item__availability'>
                        {record.CAPACITY_TYPE === 'Bed Based Capacity'
                          ? `Unoccupied Beds: ${record.UNOCCUPIED_BEDS}`
                          : `Unoccupied Rooms: ${record.UNOCCUPIED_ROOMS}`}
                        <br />
                        Last Updated: {calculateDaysAgo(
                          record.OCCUPANCY_DATE
                        )}{' '}
                        <br /> ({record.OCCUPANCY_DATE})
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <br />
              <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={records.length}
                onChange={handlePageChange}
                showSizeChanger
                pageSizeOptions={['5', '10', '20']}
              />
            </>
          )}
        </div>
        {goHere && (
          <div className='shelter-detailed-view'>
            <button className='back-button' onClick={closeDetailedView}>
              <FontAwesomeIcon icon={faCircleArrowLeft} /> Back To Shelters
            </button>
            <SheltersMap
              locations={displayedRecords}
              records={records}
              filterType={filterType}
              goHere={goHere}
            />
            <h4 className='detailed-view__header'>LOCATION DETAILS</h4>
            <SheltersCardDetailedView goHere={goHere} />
          </div>
        )}
      </section>
    </>
  );
}
