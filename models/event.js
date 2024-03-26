const fs = require('fs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {type: String, required: [true, 'title is required']},
    hosts: {type: String, required: [true, 'author is required']},
    location: {type: String, required: [true, 'location is required']},
    details: {type: String, required: [true, 'content is required'], 
                minLength: [10, 'the content should have at least 10 characters']},
    category: {type: Date, required: [true, 'start date is required']},
    start: {type: Date, required: [true, 'end date is required']},
    image: {type: String}
},
{timestamps: true}
);

module.exports = mongoose.model('Event', eventSchema);

exports.deleteById = function(id) {
    let index = events.findIndex(event => event.id == id);
    if(index !== -1){
        // delete event image from images
        fs.unlink('public/' + events[index].image, (err) => {
            if (err) {
                console.error(err);
                return; 
            }
        });
        return true;
    }
    return false;
}