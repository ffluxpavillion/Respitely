const express = require ('express')
const app = express();
const cors = require("cors");
const axios = require ('axios');

// setting up env
require('dotenv').config();
let { PORT, BACKEND_URL, CORS_ORIGIN } = process.env;

PORT = process.env.PORT || 8081;

// CORS
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());



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

// app.get("/shelters", (req, res) => {

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
          res.status(200).json(resourceData); // Send the resource data as JSON response

        })
        .catch(error => {
          console.error(error);

        });
    })
    .catch(error => {
      console.error(error);
    });
  // });

app.get('/', (req, res) => {
  res.send('Welcome to the SafeHavenTO Server!');
});

app.use((req, res) => {
  res.send('This is not a valid route.  Try <b>/shelters</b> instead.');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});