const express = require("express");
const eventRoutes = require('./eventRoutes');

const router = express.Router();

app.use('/events', eventRoutes)

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});


module.exports = router;