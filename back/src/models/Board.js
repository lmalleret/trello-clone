const { pool } = require('../config/db');

class Board {
  static async createTable() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS boards (
        id VARCHAR(255) PRIMARY KEY,
        columnOrder JSON,
        deleteFlag BOOLEAN
      )
    `);
  }
}

module.exports = Board;
