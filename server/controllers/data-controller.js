const axios = require('axios');
const baseURL = 'https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/';
const pageSize = 100; // define number of records per page
const packageId = '21c83b32-d5a8-4106-a54f-010dbe49f6f2';

// Function to retrieve package information
const getPackage = () => {
  return (
    axios
      .get(`${baseURL}package_show?id=${packageId}`)
      .then((response) => response.data.result)
      // .then(response => console.log(response))
      .catch((error) => {
        throw error;
      })
  );
};

const getDatastoreResource = async (resourceId) => {
  const recentRecords = [];
  try {
    // Get the total number of records first
    const initialResponse = await axios.get(
      `${baseURL}datastore_search?id=${resourceId}`
    );
    const totalRecords = initialResponse.data.result.total;

    // Calculate starting offset for last 1000 records
    let offset = Math.max(totalRecords - 1000, 0);

    // Fetch data starting from calculated offset
    while (recentRecords.length < 1000 && offset < totalRecords) {
      const response = await axios.get(
        `${baseURL}datastore_search?id=${resourceId}&offset=${offset}`
      );
      recentRecords.unshift(...response.data.result.records); // Add records at the beginning
      offset += pageSize; // Increment the offset for the next page
    }
  } catch (error) {
    throw error;
  }

  return recentRecords.slice(0, 1000); // Return only the last 1000 records if more were fetched
};

// Function to apply occupancy rate filters for both beds and rooms
const applyOccupancyRateFilter = (record, rate) => {
  const bedCondition =
    (rate === 'Full' && record.OCCUPANCY_RATE_BEDS === '100') ||
    (rate === 'Available' &&
      record.OCCUPANCY_RATE_BEDS !== '100' &&
      record.OCCUPANCY_RATE_BEDS != null);

  const roomCondition =
    (rate === 'Full' && record.OCCUPANCY_RATE_ROOMS === '100') ||
    (rate === 'Available' &&
      record.OCCUPANCY_RATE_ROOMS !== '100' &&
      record.OCCUPANCY_RATE_ROOMS != null);

  return bedCondition || roomCondition; // Return true if either condition is met
};

exports.getShelters = (req, res) => {
  const {
    capacityType,
    sector,
    overnightServiceType,
    programModel,
    postalCode,
    locationCity,
    occupancyRate,
  } = req.query;

  // Get the package information, filter for active datastore
  getPackage()
    .then((packageInfo) => {
      const datastoreResources = packageInfo.resources.filter(
        (r) => r.datastore_active
      );

      // Check if any datastore resources are available
      if (datastoreResources.length === 0) {
        res.status(404).send('No active datastore resources found.');
        return;
      }

      // Retrieve the first datastore resource
      getDatastoreResource(datastoreResources[0].id)
        .then((resourceData) => {
          let filteredData = resourceData;

          if (capacityType && capacityType !== 'All') {
            filteredData = filteredData.filter(
              (record) => record.CAPACITY_TYPE === capacityType
            );
          }

          if (sector && sector !== 'All') {
            filteredData = filteredData.filter(
              (record) => record.SECTOR === sector
            );
          }

          if (overnightServiceType && overnightServiceType !== 'All') {
            filteredData = filteredData.filter(
              (record) => record.OVERNIGHT_SERVICE_TYPE === overnightServiceType
            );
          }

          if (programModel && programModel !== 'All') {
            filteredData = filteredData.filter(
              (record) => record.PROGRAM_MODEL === programModel
            );
          }

          if (postalCode && postalCode !== 'All') {
            filteredData = filteredData.filter(
              (record) => record.POSTAL_CODE === postalCode
            );
          }

          if (locationCity && locationCity !== 'All') {
            filteredData = filteredData.filter(
              (record) => record.LOCATION_CITY === locationCity
            );
          }

          if (occupancyRate && occupancyRate !== 'All') {
            filteredData = filteredData.filter((record) =>
              applyOccupancyRateFilter(record, occupancyRate)
            );
          }

          res.status(200).json(filteredData);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send(error.message);
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error.message);
    });
};
