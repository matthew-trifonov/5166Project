const model = require('../models/event');

exports.index = (req, res) => {
    let events = model.find();
    res.render('events/index', {events});
};

exports.new = (req, res) => {
    res.render('events/new-event');
};

exports.create = (req, res) => {
    res.send('created a new story');
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
    res.send('send the edit form');
};

exports.update = (req, res) => {
    res.send('update story with id ' + req.params.id);
};

exports.delete = (req, res) => {
    res.send('delete story with id ' + req.params.id);
};