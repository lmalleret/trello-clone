const { pool } = require('../config/db');

class Column {
  static async createTable() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS columns (
        id VARCHAR(255) PRIMARY KEY,
        boardId VARCHAR(255),
        title VARCHAR(255),
        taskOrder JSON,
        deleteFlag BOOLEAN,
        FOREIGN KEY (boardId) REFERENCES boards(id)
      )
    `);
  }
}

module.exports = Column;
