// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update import for Routes
// import { useAuth0 } from '@auth0/auth0-react';
// import NavBar from './components/Navbar';
// import Home from './components/Home';
// import Events from './components/Events';
// import EventForm from './components/EventForm';

// const App = () => {
//   const { isLoading, error } = useAuth0();

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Oops... {error.message}</div>;

//   return (
//     <Router>
//       <NavBar />
//       <Routes> {/* Use Routes instead of Switch */}
//         <Route path="/" element={<Home />} /> {/* Use element prop and pass component as JSX */}
//         <Route path="/events" element={<Events />} />
//         <Route path="/create-event" element={<EventForm />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import NavBar from './components/Navbar';
import Home from './components/Home';
import Events from './components/Events';
import EventForm from './components/EventForm';
import CalendarView from './components/Calendar';

const App = () => {
  const { isLoading, error } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Oops... {error.message}</div>;

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/create-event" element={<EventForm />} />
        <Route path="/calendar" element={<CalendarView />} />
      </Routes>
    </Router>
  );
};

export default App;
