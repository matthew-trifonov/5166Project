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
    res.render('events/new-event');
};

exports.create = (req, res) => {
    let body = req.body;
    console.log(body);
    let event = {
        title: body.title,
        host: 'Gabriel and Matthew',
        category: body.category,
        details: body.details,
        location: body.where,
        start: DateTime.fromISO(body.start).toLocaleString(DateTime.DATETIME_MED),
        end: DateTime.fromISO(body.end).toLocaleString(DateTime.DATETIME_MED),
        image: body.image
    };
    let newEvent = model.insert(event);
    if(newEvent) {
        res.redirect('/events/' + newEvent.id);
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
        res.render('events/new-event', {event, DateTime: DateTime});
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