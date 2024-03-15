const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL

app.use(cors());
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect(`mongodb://${MONGODB_URL}/data_base`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Define Mongoose Schema
const messageSchema = new mongoose.Schema({
  message: String
});

const Message = mongoose.model('Message', messageSchema);

// GET endpoint to retrieve data from MongoDB
app.get('/data', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST endpoint to add data to MongoDB
app.post('/data', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const newMessage = new Message({ message });
    await newMessage.save();
    res.json({ message: 'Data added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
