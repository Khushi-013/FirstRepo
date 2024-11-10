const axios = require('axios');
const Booking = require('../models/Booking');

exports.bookService = async (req, res) => {
  const { serviceType, query } = req.body;

  try {
    // Fetch data from a public API (e.g., Skyscanner)
    const response = await axios.get(`https://api.example.com/${serviceType}`, {
      params: query,
      headers: { 'API-Key': process.env.API_KEY }
    });

    const booking = new Booking({
      user: req.body.user,
      serviceType,
      serviceDetails: response.data
    });

    await booking.save();
    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.userId });
  res.json(bookings);
};
