const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const Favorite = require('../models/favorite');

const router = express.Router();

// Protect endpoints using JWT Strategy
router.use(
  passport.authenticate('jwt', { session: false, failWithError: true })
);

// /* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {
  const { searchTerm } = req.query;
  const userId = req.user.id;

  let filter = { userId };
  // console.log('filter', filter);
  if (searchTerm) {
    // console.log('searchTerm', searchTerm);
    const re = new RegExp(searchTerm, 'i');
    filter.$or = [
      { title: re },
      { series_type: re },
      { url: re },
      { rating: re },
      { episodes_watched: re },
      { chapters_read: re },
      { status: re }
    ];
  }
  console.log('filter 2', filter);

  Favorite.find(filter)

    .sort({ updatedAt: 'desc' })
    .then(results => {
      console.log(results);
      res.json({
        data: results
      });
    })
    .catch(err => {
      next(err);
    });
});

/* ========== GET/READ A SINGLE ITEM ========== */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  /***** Never trust users - validate input *****/
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Favorite.findOne({ _id: id, userId })
    .then(result => {
      if (result) {
        res.json({
          data: result
        });
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', (req, res, next) => {
  const {
    title,
    series_type,
    url,
    rating,
    episodes_watched,
    chapters_read,
    status
  } = req.body;
  const userId = req.user.id;
  const newFavorite = {
    title,
    series_type,
    url,
    rating,
    episodes_watched,
    chapters_read,
    status,
    userId
  };

  console.log('body', req.body);
  console.log('newfav', newFavorite);
  /***** Never trust users - validate input *****/
  if (!title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  console.log('title', title);

  //   Promise.all([
  //     validateFolderId(folderId, userId),
  //     validateTagIds(tags, userId)
  //   ])
  //     .then(() => Note.create(newNote))
  //     .then(result => {
  //       res
  //         .location(`${req.originalUrl}/${result.id}`)
  //         .status(201)
  //         .json(result);
  //     })
  //     .catch(err => {
  //       next(err);
  //     });
  Favorite.create(newFavorite)
    .then(result => {
      console.log('result', result);

      res
        .location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json({
          data: result
        });
    })
    .catch(err => {
      next(err);
      // console.log('err', err);
    });
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/:id', (req, res, next) => {
  const idOfItemToRemove = req.params.id;
  const { episodes_watched, chapters_read, status, rating } = req.body;
  const userId = req.user.id;
  const updateFavorite = {
    episodes_watched,
    chapters_read,
    status,
    rating,
    userId
  };
  console.log('id', idOfItemToRemove);
  console.log('eps', episodes_watched);
  console.log('chap', chapters_read);
  console.log('stat', status);
  console.log('rating', rating);
  console.log('up', updateFavorite);

  // /***** Never trust users - validate input *****/
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   const err = new Error('The `id` is not valid');
  //   err.status = 400;
  //   return next(err);
  // }

  // if (title === '') {
  //   const err = new Error('Missing `title` in request body');
  //   err.status = 400;
  //   return next(err);
  // }
  console.log('we made it');
  Favorite.findByIdAndUpdate({ _id: idOfItemToRemove }, updateFavorite, {
    new: true
  })
    .then(result => {
      console.log('result', result);
      if (result) {
        res.json({
          data: result
        });
      } else {
        next();
      }
    })
    .catch(err => {
      console.log('err', err);
      next(err);
    });
});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/:id', (req, res, next) => {
  const idOfItemToRemove = req.params.id;
  // const userId = req.user.id;

  /***** Never trust users - validate input *****/
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   const err = new Error('The `id` is not valid');
  //   err.status = 400;
  //   return next(err);
  // }

  Favorite.findOneAndRemove({ _id: idOfItemToRemove })
    .then(() => {
      res.status(204).end();
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
