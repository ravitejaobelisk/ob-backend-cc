const express = require('express');

const app = express();

/* GET home page. */
app.use('/users', require('./users'));
app.use('/posts', require('./posts'));

module.exports = app;
