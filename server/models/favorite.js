const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  series_type: { type: String, required: true },
  url: { type: String, required: true },
  rating: { type: Number, required: true },
  episodes_watched: { type: Number, required: false },
  chapters_read: { type: Number, required: false },
  status: { type: String, require: true },
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

  userId: { type: String, ref: 'User', required: true }
});

favoriteSchema.set('timestamps', true);

favoriteSchema.set('toObject', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
