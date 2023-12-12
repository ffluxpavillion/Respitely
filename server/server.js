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


// Function to retrieve data of a datastore resource
const getDatastoreResource = resource => {
  return axios
    .get(`${baseURL}datastore_search?id=${resource.id}`)
    .then(response => response.data.result.records)
    .catch(error => {throw error;});
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