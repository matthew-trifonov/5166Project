const { DateTime } = require("luxon");

const events = [
    {
        id: 1,
        title: 'Managing Workplace Stress',
        host: 'Gabriel and Matthew',
        location: 'Room 101',
        details: 'A seminar about stress in the workplace and how everyone can handle it effectively throughout the company',
        category: 'Seminar',
        start: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT), 
        end: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        image: ''
    },
    {
        id: 2,
        title: 'Managing Workplace Stress',
        host: 'Gabriel and Matthew',
        location: 'Room 101',
        details: 'A seminar about stress in the workplace and how everyone can handle it effectively throughout the company',
        category: 'Seminar',
        start: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT), 
        end: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        image: ''
    },
    {
        id: 3,
        title: 'Managing Workplace Stress',
        host: 'Gabriel and Matthew',
        location: 'Room 101',
        details: 'A seminar about stress in the workplace and how everyone can handle it effectively throughout the company',
        category: 'Seminar',
        start: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT), 
        end: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        image: ''
    },
];

exports.find = () => events;

exports.findById = id => events.find(event => event.id == id);

exports.insert = function(updateObj, id){
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
            ...updateObj
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