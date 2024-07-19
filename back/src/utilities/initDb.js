const Board = require('../models/Board');
const Column = require('../models/Column');
const Task = require('../models/Task');

const initDb = async () => {
  await Board.createTable();
  await Column.createTable();
  await Task.createTable();
};

module.exports = initDb;
