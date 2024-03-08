const { DateTime } = require("luxon");

const events = [
    {
        id: 1,
        title: 'My life at Charlotte',
        content: 'My name is Matthew Trifonov. I am a senior Computer Science student at UNCC. I am currently taking Network Based App Development.',
        author: 'Matthew Trifonov',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: 2,
        title: 'Learning NBAD',
        content: 'We are currently on Module 5 in NBAD. The class has been very interesting so far.',
        author: 'Matthew Trifonov',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: 3,
        title: 'My Spring Break',
        content: 'My spring break is next week. I plan on taking the week to relax and catch up on any school material.',
        author: 'Matthew Trifonov',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
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