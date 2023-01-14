const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Db connection
const { mongoose } = require('./database');

// Settings 
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());// To understand json

// Routes
app.use('/api/user', require('./routes/user.routes'));// To use the routes

// Static Files
app.use(express.static(path.join(__dirname, 'public')));;// To use the public folder

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);// To know the port
});
