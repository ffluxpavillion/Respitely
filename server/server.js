const express = require ('express')
const axios = require ('axios')

const app = express();
const cors = require("cors");

app.use(cors)

const packageId = '21c83b32-d5a8-4106-a54f-010dbe49f6f2';
const baseURL = 'https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/';

// Function to retrieve package information
const getPackage = () => {
  return axios
    .get(`${baseURL}package_show?id=${packageId}`)
    .then(response => response.data.result)
    // .then(response => console.log(response))
    .catch(error => { throw error; });
};

// Function to retrieve data of a datastore resource, accounting for data pagination
const getDatastoreResource = async (resource) => {
  const pageSize = 100;
  let totalRecords = 0; // Variable to store total records count
  let offset = 0; // Initialize offset to start from 0
  const recentRecords = [];

  try {
    const initialResponse = await axios.get(`${baseURL}datastore_search?id=${resource.id}`);
    totalRecords = initialResponse.data.result.total; // Update the total
    console.log("Total records:", totalRecords); // Log totalValue here when it's available

    offset = Math.max(totalRecords - 1000, 0); // Calculate the offset

    // while loop to retrieve the most recently updated data only (1000 records / ~7 days)
    while (offset < totalRecords) {
      const response = await axios.get(`${baseURL}datastore_search?id=${resource.id}&offset=${offset}`);
      const records = response.data.result.records;
      recentRecords.push(...records);
      offset += pageSize;
    }
  } catch (error) {
    throw error;
  }

  return recentRecords;
};

getPackage().then(pkg => {
  // this is the metadata of the package
  // console.log(pkg);
}).catch(error => {
  console.error(error);
})

// Get the package information, filter for active datastore
getPackage()
  .then(packageInfo => {
    const datastoreResources = packageInfo.resources.filter(r => r.datastore_active);

    // Retrieve the first datastore resource as an example
    getDatastoreResource(datastoreResources[0])
      .then(resourceData => {
        console.log(resourceData) // Log the resource data
      })
      .catch(error => {
        console.error(error);
      });
  })
  .catch(error => {
    console.error(error);
  });


app.listen(3000, () => {
  console.log('Server started on port 3000');
});