const db = require('../config/db');

const Event = {
  getAllEvents: (userId, callback) => {
    db.query('SELECT * FROM events WHERE user_id = ?', [userId], callback);
  },
  createEvent: (eventData, callback) => {
    db.query('INSERT INTO events SET ?', eventData, callback);
  },
  updateEvent: (id, eventData, callback) => {
    db.query('UPDATE events SET ? WHERE id = ?', [eventData, id], callback);
  },
  deleteEvent: (id, callback) => {
    db.query('DELETE FROM events WHERE id = ?', [id], callback);
  },
  getUpcomingReminders: (callback) => {
    const currentTime = new Date();
    db.query('SELECT * FROM events WHERE reminder_time <= ?', [currentTime], callback);
  }
};

module.exports = Event;
