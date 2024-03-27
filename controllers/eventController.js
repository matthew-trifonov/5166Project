const fs = require('fs');
const model = require('../models/event');
const { DateTime } = require("luxon");

exports.index = (req, res, next)=>{
    console.log("test");
    model.find()
    .then(events => {    
        let eventsByCategory = {};
        events.forEach(event => {
            if (!eventsByCategory[event.category]) {
                eventsByCategory[event.category] = [];
            }
            eventsByCategory[event.category].push(event);
        });
        res.render('events/index', { eventsByCategory });
    })
    .catch(err => next(err));
};

exports.new = (req, res) => {
    res.render('events/new', {event: null});
};

exports.create = (req, res, next) => {
    let event = new model(req.body);
    event.save()
    .then(() => res.redirect('/events'))
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            err.status = 400;
        }
        next(err);
    });
};

exports.show = (req, res, next) => {
    let id = req.params.id;

    model.findById(id)
    .then(event => {
        if(event){
            return res.render('events/show', {event});
        } else{
            let error = new Error('Cannot find story with id ' + id);
            error.status = 404;
            next(error);
        }
    })
    .catch(err=>next(err));
};

exports.edit = (req, res, next) => {
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error ('Invalid event id');
        err.status = 400;
        return next(err);
    }

    model.findById(id)
    .then(event => {
        if(event){
            res.render('events/edit', {event, DateTime: DateTime});
        } else {
            let error = new Error('Cannot find story with id ' + id);
            error.status = 404;
            next(error);
        }
    })
    .catch(err=>next(err));
};

exports.update = (req, res, next) => {
    let event = req.body;
    let id = req.params.id;

    model.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true})
    .then(event=> {
        if (event){
            res.redirect('/events/'+ event._id);
        } else{
            let error = new Error('Cannot find story with id ' + id);
            error.status = 404;
            next(error);
        }
    })
    .catch(err=>next(err));
};

exports.delete = (req, res, next) => {
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error ('Invalid event id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(event =>{
        if(event) {
            fs.unlink('public/' + event.image, (err) => {
                if (err) {
                    return; 
                }
            });
            res.redirect('/events');
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
};