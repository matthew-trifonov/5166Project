const { DateTime } = require("luxon");

const events = [
    {
        id: 1,
        title: 'Managing Workplace Stress',
        host: 'Gabriel and Matthew',
        location: 'Room 101',
        details: 'A seminar about stress in the workplace and how everyone can handle it effectively throughout the company',
        category: 'Seminar',
        date: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: 2,
        title: 'Managing Workplace Stress',
        host: 'Gabriel and Matthew',
        location: 'Room 101',
        details: 'A seminar about stress in the workplace and how everyone can handle it effectively throughout the company',
        category: 'Seminar',
        date: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: 3,
        title: 'Managing Workplace Stress',
        host: 'Gabriel and Matthew',
        location: 'Room 101',
        details: 'A seminar about stress in the workplace and how everyone can handle it effectively throughout the company',
        category: 'Meditation',
        date: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
];

exports.find = () => events;

exports.findById = id => events.find(event => event.id == id);

exports.insert = function(id, updateObj){
    if (id) {
        let event = this.findById(id);
        if(event){
            Object.assign(event, updateObj);
            return event;
        }
        return null;
    } else {
        const newEvent = {
            id: events.length + 1,
            ...updateObj,
            createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
        };
        events.push(newEvent);
        return newEvent;
    }
};

exports.delete = function(id) {
    const index = events.findIndex(event => event.id == id);
    if (index !== -1) {
        events.splice(index, 1);
        return true;
    }
    return false;
};