// app.js
const express = require('express');
const app = express();


const connectDB = require('./config/db');
var cors = require('cors');
// body parser to access req.body
// const bodyParser = require('body-parser');
// app.use(bodyParser);
// routes
const marines = require('./routes/api/marines');
const squads = require('./routes/api/squads')



// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/marines', marines);
app.use('/api/squads', squads);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
