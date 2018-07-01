const express = require('express');

const exchangeRoutes = require("./routes/exchangeRoutes");
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./db')(app);

app.use('/', exchangeRoutes);
module.exports = app;
