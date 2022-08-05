const Movie = require('../models/movie');
const { handleErrors } = require('../utils/utils');
const { resCodes, messages } = require('../utils/constants');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const NotFoundError = require('../utils/errors/NotFoundError');

const createMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.create({ ...req.body, owner })
    .then((movie) => res.status(resCodes.CREATED_CODE).send({ data: movie }))
    .catch((err) => handleErrors(err, next));
};

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(messages.movieError);
      } else if (req.user._id.toString() !== movie.owner.toString()) {
        throw new ForbiddenError(messages.forbidden);
      }
      return movie.remove();
    })
    .then((movie) => res.status(resCodes.OK_CODE).send({ data: movie }))
    .catch((err) => handleErrors(err, next));
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
