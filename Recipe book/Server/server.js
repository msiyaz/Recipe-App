const express = require('express');
const bodyParser = require('body-parser');
const recipeRouter = require('../Server/Routes/routes');
const morgan = require('morgan');
const db = require('./models/model');

// Initialize the router
const app = express();

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HTTP request logger
app.use(morgan('tiny'));
app.use('/recipes', recipeRouter);

// connect to db
db;

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Server started on port ${PORT}`);
});