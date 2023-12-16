const axios = require('axios');
const baseURL = 'https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/';
const pageSize = 100; // define number of records per page
const packageId = '21c83b32-d5a8-4106-a54f-010dbe49f6f2';

// Function to retrieve package information
const getPackage = () => {
  return axios
    .get(`${baseURL}package_show?id=${packageId}`)
    .then(response => response.data.result)
    // .then(response => console.log(response))
    .catch(error => { throw error; });
};

const getDatastoreResource = async (resourceId) => {
  const recentRecords = [];
  try {
    // Get the total number of records first
    const initialResponse = await axios.get(`${baseURL}datastore_search?id=${resourceId}`);
    const totalRecords = initialResponse.data.result.total;

    // Calculate starting offset for last 1000 records
    let offset = Math.max(totalRecords - 1000, 0);

    // Fetch data starting from calculated offset
    while (recentRecords.length < 1000 && offset < totalRecords) {
      const response = await axios.get(`${baseURL}datastore_search?id=${resourceId}&offset=${offset}`);
      recentRecords.unshift(...response.data.result.records); // Add records at the beginning
      offset += pageSize; // Increment the offset for the next page
    }
  } catch (error) {
    throw error;
  }

  return recentRecords.slice(0, 1000);   // Return only the last 1000 records if more were fetched
};

exports.getShelters = (req, res) => {
  // Get the package information, filter for active datastore
  getPackage().then(packageInfo => {
    const datastoreResources = packageInfo.resources.filter(r => r.datastore_active);

    // Check if any datastore resources are available
    if (datastoreResources.length === 0) {
      res.status(404).send('No active datastore resources found.');
      return;
    }

    // Retrieve the first datastore resource
    getDatastoreResource(datastoreResources[0].id)
      .then(resourceData => {
        res.status(200).json(resourceData); // Send resource data as JSON response
      })
      .catch(error => {
        console.error(error);
        res.status(500).send(error.message);
      });
  }).catch(error => {
    console.error(error);
    res.status(500).send(error.message);
  });
};





// ------------------------------------------------- OLD CODE  ------------------------------------------------
// --------------------- (REQUIRED REFACTORING DUE TO MUTATIONS IN DATA & SORTING ISSUES) ---------------------

// const axios = require('axios');
// const baseURL = 'https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/';
// const packageId = '21c83b32-d5a8-4106-a54f-010dbe49f6f2';

// // Function to retrieve package information
// const getPackage = () => {
//   return axios
//     .get(`${baseURL}package_show?id=${packageId}`)
//     .then(response => response.data.result)
//     // .then(response => console.log(response))
//     .catch(error => { throw error; });
// };

// // Function to retrieve data of a datastore resource, accounting for data pagination
// const getDatastoreResource = async (resource) => {
//   // const pageSize = 100;
//   // let totalRecords = 0; // Variable to store total records count
//   // let offset = 0; // Initialize offset to start from 0
//   const recentRecords = [];

//   try {
//     const initialResponse = await axios.get(`${baseURL}datastore_search?id=${resource.id}`);
//     // totalRecords = initialResponse.data.result.total; // Update the total
//     // console.log("Total records:", totalRecords); // Log totalValue here when it's available
//           const response = await axios.get(`${baseURL}datastore_search?id=${resource.id}`);

//     const records = response.data.result.records;

//     recentRecords.push(...records);

//     // offset = Math.max(totalRecords - 1000, 0); // Calculate the offset

//     // while loop to retrieve the most recently updated data only (1000 records / ~7 days)
//     // while (offset < totalRecords) {
//     //   const response = await axios.get(`${baseURL}datastore_search?id=${resource.id}&offset=${offset}`);
//     //   const records = response.data.result.records;
//     //   recentRecords.push(...records);
//     //   offset += pageSize;
//     // }
//   } catch (error) {
//     throw error;
//   }

//   return recentRecords;
// };

// exports.getShelters = (req, res) => {
//   // Get the package information, filter for active datastore
//   getPackage().then(packageInfo => {
//     const datastoreResources = packageInfo.resources.filter(r => r.datastore_active);
//     // Retrieve the first datastore resource
//     getDatastoreResource(datastoreResources[0])
//       .then(resourceData => {
//         // console.log(resourceData) // Log the resource data

//         res.status(200).json(resourceData); // Send the resource data as JSON response
//       })
//       .catch(error => {
//         console.error(error);
//         res.status(500).send(error.message);
//       });
//   }).catch(error => {
//     console.error(error);
//     res.status(500).send(error.message);
//   });
// };
