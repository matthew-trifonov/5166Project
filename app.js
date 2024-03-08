const express = require('express');
const morgan = require('morgan');

const mainRoutes = require('./routes/main');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

const port = 8080;
const host = 'localhost';

app.set('view engine', 'ejs');

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/', mainRoutes);
app.use('/events', eventRoutes);

app.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
});