const express = require('express');
const router = express.Router();
const { getTours, getTour, createTour } = require('../controllers/tourController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getTours).post(protect, admin, createTour);
router.route('/:id').get(getTour);

module.exports = router;
