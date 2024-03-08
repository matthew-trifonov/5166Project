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
