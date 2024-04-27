const express = require("express");
const multer = require('multer');
const controller = require("../controllers/eventController");
const {isLoggedIn, isHost} = require ('../middlewares/auth');
const{validateId, validateEvent, validateResult, validateRSVP} = require('../middlewares/validator');

const router = express.Router();

// multer library used for image file uploading
// source: https://youtu.be/i8yxx6V9UdM?si=LGPHVhcfNNqVLMVe
// docs: https://www.npmjs.com/package/multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/') ;
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + '-' + Date.now());
    }
});
const upload = multer({ storage: storage });

//GET /stories: send all events to the user
router.get('/', controller.index);

//GET /stories/new: send html form for creating a new event
router.get('/new', isLoggedIn, controller.new);

//POST /stories: create a new event
router.post('/',  isLoggedIn, upload.single('image'), validateEvent, validateResult, controller.create);

//GET /stories/:id: send details of event identified by id
router.get('/:id', validateId, controller.show);

//GET /stories/:id/edit: send html form for editing an exising event
router.get('/:id/edit', validateId, isLoggedIn, isHost, controller.edit);

//GET /stories/:id/edit/rsvp: send html form for editing an exising event
router.post('/:id/edit/rsvp', isLoggedIn, validateId, validateRSVP, controller.rsvp);

//PUT /stories/:id: update the event identified by id
router.put('/:id', validateId,  isLoggedIn, isHost, upload.single('image'), validateEvent, validateResult, controller.update);

//DELETE /stories/:id, delete the event identified by id
router.delete('/delete/:id', validateId, isLoggedIn, isHost, controller.delete);

module.exports = router;