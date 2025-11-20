
const express = require('express');
const router = express.Router();
const { getFoods, seedFoods } = require('../controllers/foodController');

router.get('/', getFoods);
router.post('/seed', seedFoods);

module.exports = router;
