const router = require('express').Router();
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');
const { validateCreateMovie, validateDeleteMovie } = require('../utils/validations');

router.post('', validateCreateMovie, createMovie);
router.get('', getMovies);
router.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = router;
