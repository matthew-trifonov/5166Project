const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {type: String, required: [true, 'title is required']},
    host: {type: Schema.Types.ObjectId, ref:'User', required: [true, 'host is required']},
    location: {type: String, required: [true, 'location is required']},
    details: {type: String, required: [true, 'content is required'], 
                minLength: [10, 'the content should have at least 10 characters']},
    category: {type: String, required: [true, 'location is required']},           
    start: {type: Date, required: [true, 'start date is required']},
    end: {type: Date, required: [true, 'end date is required']},
    image: {type: String}
},
{timestamps: true}
);

module.exports = mongoose.model('Event', eventSchema);