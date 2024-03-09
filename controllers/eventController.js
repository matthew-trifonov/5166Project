const model = require('../models/event');
const { DateTime } = require("luxon");

exports.index = (req, res) => {
    let events = model.find();
    res.render('events/index', {events});
};

exports.new = (req, res) => {
    res.render('events/new-event');
};

exports.create = (req, res) => {
    const { title, content, author } = req.body;
    let event = {
        title: title,
        content: content,
        author: author,
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    };
    let newEvent = model.insert(event);

    if(newEvent) {
        res.redirect('/events/' + id);
    }
    else {
        res.status(500).send('Could not create new event');
    }
};

exports.show = (req, res) => {
    let id = req.params.id;
    let event = model.findById(id);
    if(event){
        res.render('events/event-details', {event});
    }
    res.status(404).send('Cannot find event with id ' + id);
};

exports.edit = (req, res) => {
    let id = req.params.id;
    let event = model.findById(id);
    if(event){
        res.render('events/new-event', {event});
    }
    res.status(404).send('Cannot find event with id ' + id);
};

exports.update = (req, res) => {
    const id = req.params.id;
    const { title, content, author } = req.body;
    let event = {
        title: title,
        content: content,
        author: author,
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    };
    let updatedEvent = model.insert(id, event);

    if(updatedEvent) {
        res.redirect('/events/' + id);
    }
    else {
        res.status(500).send('Could not update event with id ' + req.params.id);
    }
};

exports.delete = (req, res) => {
    const id = req.params.id;
    let deletedEvent = model.delete(id);
    if(deletedEvent){
        res.redirect('/events');
    }
    else {
        res.status(500).send('Could not delete event with id ' + req.params.id);
    }
};