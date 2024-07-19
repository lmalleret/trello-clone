const pool = require('../config/db');

const getAllBoards = async (req, res) => {
  try {
    const rows = await pool.query('SELECT * FROM boards');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllBoards,
};
