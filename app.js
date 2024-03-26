const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const mainRoutes = require('./routes/mainRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

const port = 8080;
const host = 'localhost';
let url = 'mongodb://127.0.0.1:27017/MindfulMeet';
app.set('view engine', 'ejs');

mongoose.connect(url)
.then(()=>{
    //start the server
    app.listen(port, host, () => {
        console.log(`Server is running at http://${host}:${port}`);
    });
})

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/', mainRoutes);
app.use('/events', eventRoutes);

app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal server error.");
    }
    res.status(err.status);
    res.render('error', {error: err});
});