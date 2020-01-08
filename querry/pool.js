const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();

let config = {};

config = {
  host: 'localhost', // Server hosting the postgres database
  password: process.env.DATABASE_SECRET,
  port: 5432, // env var: PGPORT
  database: 'acronym', // You will need a database named `pizza_parlor` in order for this to work locally
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

// this creates the pool that will be shared by all other modules
const pool = new pg.Pool(config);

// the pool will log when it connects to the database
pool.on('connect', () => {
  console.log('Postgesql connected');
});

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
