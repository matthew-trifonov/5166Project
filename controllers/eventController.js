const fs = require('fs');
const model = require('../models/event');
const RSVP = require('../models/rsvp');

exports.index = (req, res, next)=>{
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
    event.host = req.session.user;
    if(req.file){
        const filename = req.file.filename;
        event.image = filename ? `/images/${filename}` : '';
    }

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
    .populate('host', 'firstName lastName')
    .then(event => {
        if(event){  
            RSVP.find({ event: id })
                .then(rsvps => {
                    userRsvpStatus = "Not Selected"
                    if(req.session.user) {
                        userRsvp = rsvps.filter(obj => obj.user.valueOf() === req.session.user._id);
                          if(userRsvp.length > 0){
                             userRsvpStatus = userRsvp[0].status;
                        }
                    }
                    res.render('events/show', { event, rsvps, userRsvpStatus });
                })
                .catch(err => {
                    next(err);
                });
        } else{
            let error = new Error('Cannot find event with id ' + id);
            error.status = 404;
            next(error);
        }
    })
    .catch(err => {
        console.error("Error while finding event:", err);
        next(err);
    });
};

exports.edit = (req, res, next) => {
    let id = req.params.id;

    model.findById(id)
    .then(event => {
        res.render('events/edit', {event});
    })
    .catch(err=>next(err));
};

exports.update = (req, res, next) => {
    let event = req.body;
    let id = req.params.id;
    
    if(req.file){
        const filename = req.file.filename;
        event.image = filename ? `/images/${filename}` : '';
    }
    
    model.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true})
    .then(event=> {
        if (event){
            res.redirect('/events/'+ event._id);
        } else{
            let error = new Error('Cannot find event with id ' + id);
            error.status = 404;
            next(error);
        }
    })
    .catch(err=> {
        if(err.name === 'ValidationError' ) {
            err.status = 400;
        }
        next(err);
    });
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    RSVP.deleteMany({event: id})
    .then(()=>{
        model.findByIdAndDelete(id, {useFindAndModify: false})
         .then(event =>{
            fs.unlink('public/' + event.image, (err) => {
                if (err) {
                    return; 
                }
            });
            res.redirect('/events');
        })
        .catch(err=>next(err));
    })
    .catch(err=>next(err));
};
exports.rsvp = (req, res, next) => {
    let id = req.params.id;

    model.findById(id)
        .then(event => {
            if (event) {
                RSVP.findOne({ event: id, user: req.session.user._id })
                    .then(rsvp => {
                        if (rsvp) {
                            rsvp.status = req.body.status;
                        } else {
                            rsvp = new RSVP(req.body);
                            rsvp.user = req.session.user;
                            rsvp.event = event;
                        }
                        rsvp.save();
                    })
                    .then(res.redirect('/events/' + event._id))
                    .catch(err => {
                        next(err);
                    });
            } else {
                let error = new Error('Cannot find event with id ' + id);
                error.status = 404;
                next(error);
            }
        })
        .catch(err => {
            console.error('Error finding event:', err);
            next(err);
        });
};

