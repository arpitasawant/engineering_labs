const express = require('express');
const router = express.Router();
const { getEvents, createEvent, updateEvent, deleteEvent ,getReminders} = require('../controllers/eventController');
const checkJwt = require('../utils/checkJWT')

router.get('/events', checkJwt, getEvents);
router.post('/events', checkJwt, createEvent);
router.put('/events/:id', checkJwt, updateEvent);
router.delete('/events/:id', checkJwt, deleteEvent);
router.get('/reminders', checkJwt, getReminders);

module.exports = router;
