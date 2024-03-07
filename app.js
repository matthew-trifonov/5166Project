const express = require('express');
const morgan = require('morgan');

const mainRoutes = require('./routes/main')
const eventRoutes = require('./eventRoutes');

const app = express()

let port = 8080;
let host = 'localhost';
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));

app.use('/', mainRoutes);
app.use('/events', eventRoutes);

app.listen(port, host, () => {
    console.log("Server is running.");
});