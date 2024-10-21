import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button } from '@mui/material';

const EventForm = () => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date_time: '',
    reminder_time: '',  
  });

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const [eventCreated, setEventCreated] = useState(false);  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
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
  
    try {
      const tokenResponse = await axios(tokenOptions);
      const token = tokenResponse.data.access_token;
  
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/events`, eventData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Response:', response.data);
  
      
      setEventData({
        title: '',
        description: '',
        date_time: '',
        reminder_time: '',
      });
  
      setEventCreated(true);
    } catch (error) {
      console.error('Error fetching token or creating event:', error.response ? error.response.data : error);
    }
  };
  
  
return (
  <Container>
    <Typography variant="h4" gutterBottom>
      Create New Event
    </Typography>
    {eventCreated && (
      <Typography variant="h6" color="primary">
        Event created successfully!
      </Typography>
    )}
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        name="title"
        value={eventData.title}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={eventData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Date & Time"
        name="date_time"
        type="datetime-local"
        value={eventData.date_time}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <TextField
        label="Reminder Time"
        name="reminder_time"
        type="datetime-local"
        value={eventData.reminder_time}
        onChange={handleChange}
        fullWidth
        margin="normal"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <Button type="submit" variant="contained" color="primary">
        Create Event
      </Button>
    </form>
  </Container>
);

};

export default EventForm;
