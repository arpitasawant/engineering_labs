const Event = require('../models/eventModel');

exports.getEvents = (req, res) => {
  const userId = req.auth.sub;
  Event.getAllEvents(userId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server Error' });
    res.json(results);
  });
};


exports.updateEvent = (req, res) => {
  const id = req.params.id;
  Event.updateEvent(id, req.body, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server Error' });
    res.json({ message: 'Event updated successfully' });
  });
};

exports.deleteEvent = (req, res) => {
  const id = req.params.id;
  Event.deleteEvent(id, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server Error' });
    res.json({ message: 'Event deleted successfully' });
  });
};


exports.createEvent = (req, res) => {
  const userId = req.auth.sub;
  const newEvent = { ...req.body, user_id: userId, reminder_time: req.body.reminder_time };
  Event.createEvent(newEvent, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server Error' });
    res.json({ message: 'Event created successfully' });
  });
};

exports.getReminders = (req, res) => {
  Event.getUpcomingReminders((err, results) => {
    if (err) return res.status(500).json({ message: 'Server Error' });
    res.json(results);
  });
};
