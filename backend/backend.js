const express = require('express');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

// Sample JSON data
let jsonData = {
  messages: []
};

// GET endpoint to retrieve JSON data
app.get('/data', (req, res) => {
  res.json(jsonData);
});

// POST endpoint to add data to JSON
app.post('/data', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  jsonData.messages.push(message);
  res.json({ message: 'Data added successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
