const express = require("express");
const multer = require('multer');
const controller = require("../controllers/eventController");

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

router.get('/', controller.index);

router.get('/new', controller.new);

router.post('/',  upload.single('image'), controller.create);

router.get('/:id', controller.show);

router.get('/:id/edit', controller.edit);

router.put('/:id', upload.single('image'), controller.update);

router.delete('/delete/:id', controller.delete);

module.exports = router;