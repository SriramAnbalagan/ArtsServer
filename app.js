const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { connect, disconnect } = require('./connection');

// Middleware
app.use(bodyParser.json());

app.use(cors())

// Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const artsRoutes = require('./routes/arts');

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/arts', artsRoutes);

// Connect to MongoDB
connect();


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
