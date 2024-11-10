const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 5001;

app.use(express.json());

// uAgent URL (replace with your uAgent's endpoint)
const AGENT_URL = "http://localhost:8000/message";

app.post('/api/fetch-travel', async (req, res) => {
  const { source, destination, date } = req.body;
  try {
    const response = await axios.post(AGENT_URL, {
      message: JSON.stringify({ source, destination, date })
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to communicate with uAgent' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
