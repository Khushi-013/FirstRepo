const express = require('express');
const { bookService } = require('../controllers/travelController');
const router = express.Router();

router.post('/book', bookService);
module.exports = router;

router.get('/bookings', authMiddleware, getBookings);
