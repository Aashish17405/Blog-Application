const express = require('express');
const actionRoutes = require('./routes/actionRoutes');
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/actions',actionRoutes);

module.exports = app;