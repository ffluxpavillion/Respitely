const fs = require('fs');
const path = require('path');
const originalData = require('../../client/src/data/TDIN_MealList.json');

const convertTo24HourFormat = (time) => {
  const [timePart, modifier] = time.split(' ');
  let [hours, minutes] = timePart.split(':');

  if (modifier === 'PM' && hours !== '12') {
    hours = parseInt(hours, 10) + 12;
  } else if (modifier === 'AM' && hours === '12') {
    hours = '00';
  }

  return `${hours}:${minutes}`;
};

const transformData = (data) => {
  const transformedCenters = [];

  for (const region in data.regions) {
    const dropInCenters = data.regions[region].drop_in_centers;
    dropInCenters.forEach(center => {
      const schedule = [];
      Object.keys(center.schedule).forEach(day => {
        const daySchedule = {
          day: day,
          hours: center.schedule[day].hours ? {
            open: convertTo24HourFormat(center.schedule[day].hours.split(' - ')[0]),
            close: convertTo24HourFormat(center.schedule[day].hours.split(' - ')[1])
          } : null,
          meals: []
        };

        if (center.schedule[day].breakfast) {
          daySchedule.meals.push({
            type: 'breakfast',
            start: convertTo24HourFormat(center.schedule[day].breakfast.split(' - ')[0]),
            end: convertTo24HourFormat(center.schedule[day].breakfast.split(' - ')[1])
          });
        }
        if (center.schedule[day].lunch) {
          daySchedule.meals.push({
            type: 'lunch',
            start: convertTo24HourFormat(center.schedule[day].lunch.split(' - ')[0]),
            end: convertTo24HourFormat(center.schedule[day].lunch.split(' - ')[1])
          });
        }
        if (center.schedule[day].dinner) {
          daySchedule.meals.push({
            type: 'dinner',
            start: convertTo24HourFormat(center.schedule[day].dinner.split(' - ')[0]),
            end: convertTo24HourFormat(center.schedule[day].dinner.split(' - ')[1])
          });
        }
        if (center.schedule[day].snack) {
          daySchedule.meals.push({
            type: 'snack',
            start: convertTo24HourFormat(center.schedule[day].snack.split(' - ')[0]),
            end: convertTo24HourFormat(center.schedule[day].snack.split(' - ')[1])
          });
        }

        schedule.push(daySchedule);
      });

      transformedCenters.push({
        name: center.name,
        address: {
          street: center.address,
          city: center.city,
          province: center.province,
          postal_code: center.postal_code
        },
        latitude: center.latitude,
        longitude: center.longitude,
        contact: {
          phone: center.phone,
          website: center.website
        },
        population: center.population,
        service_dog_allowed: center.service_dog_allowed,
        wheelchair_accessible: center.wheelchair_accessible,
        schedule: schedule,
        claimed_by: null
      });
    });
  }

  return transformedCenters;
};

const saveTransformedData = (transformedData, filePath) => {
  fs.writeFile(filePath, JSON.stringify(transformedData, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('Transformed data saved to', filePath);
    }
  });
};

const transformedCenters = transformData(originalData);
const outputFilePath = path.join(__dirname, '../data/transformedMealData2.json');
saveTransformedData(transformedCenters, outputFilePath);
