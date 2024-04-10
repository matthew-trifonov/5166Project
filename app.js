const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const flash = require('connect-flash');
const mainRoutes = require('./routes/mainRoutes');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

const port = 8080;
const host = 'localhost';
let url = 'mongodb+srv://Mindful:Mindful123@cluster0.9fv09g9.mongodb.net/nbda-project3?retryWrites=true&w=majority';
app.set('view engine', 'ejs');

mongoose.connect(url)
.then(()=>{
    //start the server
    app.listen(port, host, () => {
        console.log(`Server is running at http://${host}:${port}`);
    });
})
.catch(err=>console.log(err.message));

app.use(
    session({
            secret: "ajfeirf90aeu9eroejfoefj",
            resave: false,
            saveUninitialized: false,
            store: new MongoStore({mongoUrl: url}),
            cookie: {maxAge: 60*60*1000}
        })
);
app.use(flash());

app.use((req, res, next) => {
    //console.log(req.session);
    res.locals.user = req.session.user || null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/', mainRoutes);
app.use('/events', eventRoutes);
app.use('/users', userRoutes);

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