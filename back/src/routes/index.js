const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

router.get('/boards', boardController.getAllBoards);

module.exports = router;
