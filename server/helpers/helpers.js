const fs = require('fs')

// identifies the last id in the array, and adds 1 to return a new id.
const getNewId = (array) => {
  if (array.length > 0) {
      return array[array.length - 1].id + 1
  } else {
      return 1
  }
}

// returns date in string format
const newDate = () => new Date().toString()

// returns a promise.  Checks if a row exists using id.  Used: Read One, Update, Delete.
function mustBeInArray(array, id) {
  return new Promise((resolve, reject) => {
      const row = array.find(r => r.id == id)
      if (!row) {
          reject({
              message: 'ID is not good',
              status: 404
          })
      }
      resolve(row)
  })
}

// writes new array in JSON file data
function writeJSONFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
      if (err) {
          console.log(err)
      }
  })
}


