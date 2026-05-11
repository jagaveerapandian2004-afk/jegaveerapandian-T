const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false
}));

app.use('/', authRoutes);
app.use('/', eventRoutes);
app.use('/', bookingRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});