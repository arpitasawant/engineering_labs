import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Typography, Button, List, ListItem, ListItemText, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import moment from 'moment';

const Events = () => {
  const { getAccessTokenSilently } = useAuth0(); 
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null); 
  const [open, setOpen] = useState(false); 

  const tokenOptions = {
    method: 'POST',
    url: process.env.REACT_APP_DOMAIN_URL,
    headers: { 'Content-Type': 'application/json' },
    data: {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      audience: process.env.REACT_APP_AUDIENCE_URL,
      grant_type: 'client_credentials',
    },
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const tokenResponse = await axios.post(tokenOptions.url, tokenOptions.data, { headers: tokenOptions.headers });
        const token = tokenResponse.data.id_token;

       
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/events`, {
          headers: { Authorization: `Bearer ${token}` },
        });

       
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const deleteEvent = async (id) => {
    try {
      const tokenResponse = await axios.post(tokenOptions.url, tokenOptions.data, { headers: tokenOptions.headers });
      const token = tokenResponse.data.access_token;

      await axios.delete(`${process.env.REACT_APP_API_URL}/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEditClick = (event) => {
    setEditEvent(event);
    setOpen(true);
  };

  const handleEditChange = (e) => {
    setEditEvent({ ...editEvent, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const tokenResponse = await axios.post(tokenOptions.url, tokenOptions.data, { headers: tokenOptions.headers });
      const token = tokenResponse.data.access_token;

      await axios.put(`${process.env.REACT_APP_API_URL}/events/${editEvent.id}`, editEvent, {
        headers: { Authorization: `Bearer ${token}` },
      });

      
      setEvents(events.map((event) => (event.id === editEvent.id ? editEvent : event)));
      setOpen(false); 
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Events
      </Typography>
      <List>
        {events.map((event) => (
          <ListItem key={event.id}>
            <ListItemText
              primary={event.title}
              secondary={`${moment(event.date_time).format('MMMM Do YYYY, h:mm a')} - ${event.description}`}
            />
            <Button color="primary" onClick={() => handleEditClick(event)}>
              Edit
            </Button>
            <Button color="secondary" onClick={() => deleteEvent(event.id)}>
              Delete
            </Button>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            value={editEvent?.title || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={editEvent?.description || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Date & Time"
            name="date_time"
            type="datetime-local"
            value={moment(editEvent?.date_time).format('YYYY-MM-DDTHH:mm') || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Reminder & Time"
            name="reminder_time"
            type="datetime-local"
            value={moment(editEvent?.reminder_time).format('YYYY-MM-DDTHH:mm') || ''}
            onChange={handleEditChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};


export default Events;
