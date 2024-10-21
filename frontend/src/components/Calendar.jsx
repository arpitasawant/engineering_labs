import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';  // Import calendar styling

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
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

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/events`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        
        const formattedEvents = response.data.map(event => ({
          title: event.title,
          start: new Date(event.date_time), 
          end: new Date(moment(event.date_time).add(1, 'hour')), 
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Calendar View
      </Typography>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, margin: '50px 0' }}
      />
    </Container>
  );
};

export default CalendarView;
