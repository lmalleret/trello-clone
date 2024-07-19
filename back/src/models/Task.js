const { pool } = require('../config/db');

class Task {
  static async createTable() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id VARCHAR(255) PRIMARY KEY,
        boardId VARCHAR(255),
        columnId VARCHAR(255),
        title VARCHAR(255),
        image VARCHAR(255),
        deleteFlag BOOLEAN,
        FOREIGN KEY (boardId) REFERENCES boards(id),
        FOREIGN KEY (columnId) REFERENCES columns(id)
      )
    `);
  }
}

module.exports = Task;
