const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https?:\/\/)?(www\.)?([\w\d-]+[.$])+([a-z]{2,10})\/?([^:\s]([a-z\d\W_-]{2,})*([#]$)?)*/.test(v);
      },
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https?:\/\/)?(www\.)?([\w\d-]+[.$])+([a-z]{2,10})\/?([^:\s]([a-z\d\W_-]{2,})*([#]$)?)*/.test(v);
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https?:\/\/)?(www\.)?([\w\d-]+[.$])+([a-z]{2,10})\/?([^:\s]([a-z\d\W_-]{2,})*([#]$)?)*/.test(v);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true, // id из ответа стороннего api
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);