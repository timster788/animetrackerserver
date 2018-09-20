const mongoose = require('mongoose');
const { DATABASE_URL } = require('../config');

const Favorite = require('../models/favorite');
let updateFavorite = {
  episodes_watched: 7,
  chapters_read: undefined,
  status: 'Complete',
  rating: 7,
  userId: '5ba296dab2e84f6f33f9a676'
};
// FIND ALL

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    return Favorite.findByIdAndUpdate(
      { _id: '5ba2b8afa17988745e0683de' },
      updateFavorite,
      { new: true }
    );
  })
  .then(results => {
    console.log(results);
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });
// Anime.find(filter)

//   .sort({ updatedAt: 'desc' })
//   .then(results => {
//     console.log(results);
//     res.json(results);
//   })
//   .catch(err => {
//     next(err);
//   });
// TEST IF THE CURRENT SUBMISSION IS OLDER THAN THE LATEST
// mongoose.connect(TEST_DATABASE_URL)
//   .then(() => {
//     return Purchase.find();
//   })
//   .then(results => {
//     const times = results.map(result => result.createdAt);
//     console.log(times);
//     console.log(times[times.length-1]);
//     let isAfter = false;
//     console.log('current time: ', moment());
//     if (moment().isAfter(times[times.length-1])) {
//       isAfter = true;
//     }
//     console.log(isAfter);
//   })
//   .then(() => {
//     return mongoose.disconnect();
//   })
//   .catch(err => {
//     console.error(`ERROR: ${err.message}`);
//     console.error(err);
//   });

// TEST IF THE CURRENT MILES IS OLDER THAN THE LATEST MILES
// mongoose
//   .connect(TEST_DATABASE_URL)
//   .then(() => {
//     return Purchase.find();
//   })
//   .then(results => {
//     const currentMiles = 60000;
//     const miles = results.map(result => result.miles);
//     let isAfter = false;
//     if (currentMiles > miles[miles.length - 1]) {
//       isAfter = true;
//     }
//     console.log(miles[miles.length - 1]);
//     console.log(isAfter);
//   })
//   .then(() => {
//     return mongoose.disconnect();
//   })
//   .catch(err => {
//     console.error(`ERROR: ${err.message}`);
//     console.error(err);
//   });
