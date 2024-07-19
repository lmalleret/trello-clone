const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createDatabaseIfNotExists, pool } = require('./config/db');
const initDb = require('./utilities/initDb');
const routes = require('./routes/index');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

createDatabaseIfNotExists()
  .then(() => {
    console.log('Database created or already exists');
    return initDb();
  })
  .then(() => {
    console.log('Database initialized');
  })
  .catch(error => {
    console.error('Database initialization failed:', error);
  });

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
