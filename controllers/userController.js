const model = require('../models/user');
const Event = require('../models/event');
const RSVP = require('../models/rsvp')
const { validationResult } = require('express-validator');

exports.new = (req, res)=>{
    return res.render('./user/new');
};

exports.create = (req, res, next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        errors.array().forEach(error=>{
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    }
    let user = new model(req.body);
    user.save()
    .then(user=> res.redirect('/users/login'))
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);  
            return res.redirect('/users/new');
        }

        if(err.code === 11000) {
            req.flash('error', 'This email is already in use');  
            return res.redirect('/users/new');
        }
        next(err);
    }); 
};

exports.getUserLogin = (req, res, next) => {
    res.render('user/login');
}

exports.login = (req, res, next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        error.array().forEach(error=>{
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    }
    let email = req.body.email;
    let password = req.body.password;
    model.findOne({ email: email })
    .then(user => {
        if (!user) {
            req.flash('error', 'Wrong email address');  
            res.redirect('/users/login');
            } else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = user;
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/');
            } else {
                req.flash('error', 'Wrong Password');      
                res.redirect('/users/login');
            }
            });     
        }     
    })
    .catch(err => next(err));
};

exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([
        model.findById(id),
        Event.find({ host: id }),
        RSVP.find({ user: id }).populate('event user')
    ])
    .then(results=> {
        const[user, events, rsvps] = results;
        console.log(rsvps)
        res.render('./user/profile', {user, events, rsvps})
    })
    .catch(err=>next(err));
};


exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err) 
           return next(err);
       else
            res.redirect('/');  
    });
   
 };



