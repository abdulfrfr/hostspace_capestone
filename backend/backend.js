const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://2212101011:v1sEhBIQjjAVoIWQ@cluster0.1b2jtji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// MongoDB connection
mongoose.connect(MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err.message));

// Define MongoDB schema
const dataSchema = new mongoose.Schema({
  message: String
});

// Define MongoDB model
const Data = mongoose.model('Data', dataSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/data', async (req, res) => {
  try {
    const newData = new Data(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


