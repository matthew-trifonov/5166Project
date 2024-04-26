const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'user is required'] },
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: [true, 'event is required'] },
    status: {
        type: String,
        enum: ['YES', 'NO', 'MAYBE'],
        required: [true, 'status is required']
    },
    yesCounter: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Rsvp', rsvpSchema);