const express = require('express');
const router = express.Router();
const batalhaController = require('../controllers/batalhaController');

// Rota de batalha
router.post('/', batalhaController.batalhar);

module.exports = router;
