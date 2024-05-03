const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const env = require("dotenv").config();
const passport = require('passport');
const app = express()
const db = require('./db/database')
require('./middleware/passport');

app.use(express.json());
app.use(bodyParser.json());
app.use(passport.initialize())

app.use('/', require('./routes/indexRoute'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server Listening On ${PORT} : http://localhost:${PORT}`);
});