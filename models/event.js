const { DateTime } = require("luxon");
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const events = [
    {
        id: '93f3bfe3-1341-44a2-a7ed-ba69746e007b',
        title: 'Managing Workplace Stress',
        host: 'Gabriel and Matthew',
        location: 'Room 101',
        details: 'A seminar about stress in the workplace and how everyone can handle it effectively throughout the company',
        category: 'Seminar',
        start: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT), 
        end: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        image: '/images/seminar.png'
    },
    {
        id: '32452047-e1d6-4fe4-9045-b6ae4da58abf',
        title: 'Signs of Stress',
        host: 'Gabriel and Matthew',
        location: 'Room 200',
        details: 'A Seminar about stress',
        category: 'Seminar',
        start: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT), 
        end: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        image: '/images/managing-stress.jpg'
    },
    {
        id: '159cbb74-3e5e-40f8-b089-49a2bb7fe480',
        title: 'Coping with Anxiety Workshop',
        host: 'Dr. Smith',
        location: 'Conference Room A',
        details: 'Workshop focused on coping strategies for anxiety',
        category: 'Workshops',
        start: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        end: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        image: '/images/anxiety.jpg'
    },
    {
        id: '4d4eac6b-7d68-45ae-9ab4-b87ac06702aa',
        title: 'Yoga for Stress Relief',
        host: 'Yoga Studio',
        location: 'Main Hall',
        details: 'Relaxing yoga session aimed at stress relief',
        category: 'Workshops',
        start: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        end: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        image: '/images/relief.jpg'
    },
    {
        id: '3cd75a40-2781-4c1c-b41c-12e1cafa2875',
        title: 'Art Therapy Workshop',
        host: 'Art Therapy Institute',
        location: 'Art Studio',
        details: 'Workshop using art therapy techniques for mental health',
        category: 'Workshops',
        start: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        end: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        image: '/images/art.jpg'
    },
    {
        id: '13c40942-ce3a-4c7e-8a4e-8af3c615f606',
        title: 'Healthy Sleep Habits Seminar',
        host: 'Dr. Johnson',
        location: 'Lecture Hall',
        details: 'Seminar discussing strategies for improving sleep habits',
        category: 'Seminar',
        start: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        end: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        image: '/images/sleep.jpg'
    },
];

exports.find = () => events;

exports.findById = id => events.find(event => event.id == id);

exports.save = function(event){
    event.id = uuidv4();
    event.start = DateTime.fromISO(event.start).toLocaleString(DateTime.DATETIME_SHORT);
    event.end = DateTime.fromISO(event.end).toLocaleString(DateTime.DATETIME_SHORT);
    events.push(event);
}

exports.updateById = function(id, newEvent){
    let event = events.find(event => event.id == id);
    newEvent.start = DateTime.fromISO(newEvent.start).toLocaleString(DateTime.DATETIME_SHORT);
    newEvent.end = DateTime.fromISO(newEvent.end).toLocaleString(DateTime.DATETIME_SHORT);
    if(event){
        Object.assign(event, newEvent);
        return true;
    }
    return false;
}

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
        events.splice(index, 1);
        return true;
    }
    return false;
}