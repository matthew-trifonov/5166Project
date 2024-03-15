const model = require('../models/event');
const { DateTime } = require("luxon");

exports.index = (req, res) => {
    let events = model.find();

    let eventsByCategory = {};
    events.forEach(event => {
        if (!eventsByCategory[event.category]) {
            eventsByCategory[event.category] = [];
        }
        eventsByCategory[event.category].push(event);
    });

    res.render('events/index', { eventsByCategory });
};

exports.new = (req, res) => {
    res.render('events/new', {event: null});
};

exports.create = (req, res) => {
    let event = req.body;
    
    if(req.file){
        const filename = req.file.filename;
        event.image = filename ? `/images/${filename}` : '';
    }

    model.save(event);
    res.redirect('/events');
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    let event = model.findById(id);
    if(event){
        res.render('events/show', {event});
    } else {
        let error = new Error('Cannot find story with id ' + id);
        error.status = 404;
        next(error);
    }
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    let event = model.findById(id);
    if(event){
        res.render('events/edit', {event, DateTime: DateTime});
    } else {
        let error = new Error('Cannot find story with id ' + id);
        error.status = 404;
        next(error);
    }
};

exports.update = (req, res, next) => {
    let event = req.body;
    let id = req.params.id;

    if(req.file){
        const filename = req.file.filename;
        event.image = `/images/${filename}`;
    }
    else {
        delete event.image;
    }

    if (model.updateById(id, event)){
        res.redirect('/events/'+ id);
    } else{
        let error = new Error('Cannot find story with id ' + id);
        error.status = 404;
        next(error);
    }
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    if(model.deleteById(id)){
        res.redirect('/events');
    }
    else{
        let error = new Error('Cannot find story with id ' + id);
        error.status = 404;
        next(error);
    }
};