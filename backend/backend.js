const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
const USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME || 'YWRtaW4gLW4K'
const PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD || 'cGFzc3dvcmQgLW4K'
const MONGO_SERVICE = process.env.MONGO_URL || 'mongo'
const MONGODB_URL = process.env.MONGODB_URL || `mongodb://${USERNAME}:${PASSWORD}@${MONGO_SERVICE}:27017/data?directConnection=true&authSource=admin`;

// MongoDB connection
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
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


