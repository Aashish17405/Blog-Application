const app = require('./app');
const connectDB = require('./config/db');
require('dotenv').config();

const port = process.env.PORT;

connectDB();


app.listen(port, () => {
    console.log(`Server running on port ${port} http://localhost:${port}`);
})