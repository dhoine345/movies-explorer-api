const { PORT = 3000, NODE_ENV, MONGOOSE_DB, JWT_SECRET } = process.env;
const DB = 'mongodb://localhost:27017/moviesdb';

module.exports = {
  DB,
  PORT,
  NODE_ENV,
  MONGOOSE_DB,
  JWT_SECRET,
};