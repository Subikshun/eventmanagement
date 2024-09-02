import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';  // Custom CSS if needed

// Event component for listing individual events
const Event = ({ event, onDelete, onEdit }) => (
  <div className="card mb-3 animated fadeIn">
    <div className="card-body">
      <h5 className="card-title">{event.title}</h5>
      <p className="card-text"><strong>Description:</strong> {event.description}</p>
      <p className="card-text"><strong>Category:</strong> {event.category}</p>
      <p className="card-text"><strong>Time Slot:</strong> {event.startTime} - {event.endTime}</p>
      <p className="card-text"><strong>Duration:</strong> {event.duration} hours</p>
      <p className="card-text"><strong>Priority:</strong> {event.priority}</p>
      <p className="card-text"><strong>Contact Email:</strong> {event.email}</p>
      <p className="card-text"><strong>Contact Phone:</strong> {event.phone}</p>
      <button className="btn btn-info mr-2" onClick={() => onEdit(event)}>Edit</button>
      <button className="btn btn-danger" onClick={() => onDelete(event.id)}>Delete</button>
    </div>
  </div>
);

// Home component
const Home = () => (
  <div className="container mt-5">
    <h1>Welcome to Event Management</h1>
    <p>Use the navigation bar to manage and view events.</p>
  </div>
);

// EventManagement component with CRUD operations
const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState('');
  const [priority, setPriority] = useState('Low');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [search, setSearch] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);

  const handleAddOrUpdateEvent = () => {
    if (title && description && startTime && endTime && email && phone) {
      const newEvent = {
        id: editingEvent ? editingEvent.id : Date.now(),
        title,
        description,
        category,
        startTime,
        endTime,
        duration,
        priority,
        email,
        phone
      };
      setEvents(events.map(event => event.id === newEvent.id ? newEvent : event));
      if (!editingEvent) {
        setEvents([...events, newEvent]);
      }
      setTitle('');
      setDescription('');
      setCategory('');
      setStartTime('');
      setEndTime('');
      setDuration('');
      setPriority('Low');
      setEmail('');
      setPhone('');
      setEditingEvent(null);
    }
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setCategory(event.category);
    setStartTime(event.startTime);
    setEndTime(event.endTime);
    setDuration(event.duration);
    setPriority(event.priority);
    setEmail(event.email);
    setPhone(event.phone);
  };

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(search.toLowerCase()) ||
    event.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-4 animated fadeIn">Event Management</h1>

      <div className="mb-4">
        <h2>{editingEvent ? 'Edit Event' : 'Add Event'}</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Event Description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="time"
            className="form-control mb-2"
            value={startTime}
            placeholder="Start Time"
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="time"
            className="form-control mb-2"
            value={endTime}
            placeholder="End Time"
            onChange={(e) => setEndTime(e.target.value)}
          />
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Duration (hours)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <select
            className="form-control mb-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Contact Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            className="form-control mb-2"
            placeholder="Contact Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button
            className="btn btn-primary mt-3"
            onClick={handleAddOrUpdateEvent}
          >
            {editingEvent ? 'Update Event' : 'Add Event'}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h2>Search Events</h2>
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search by title or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div>
        <h2>Event List</h2>
        {filteredEvents.length === 0 ? (
          <p>No events available.</p>
        ) : (
          filteredEvents.map(event => (
            <Event key={event.id} event={event} onDelete={handleDeleteEvent} onEdit={handleEditEvent} />
          ))
        )}
      </div>
    </div>
  );
};

// Main App component with routing
const App = () => (
  <Router>
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Event Management</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/events">Manage Events</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<EventManagement />} />
    </Routes>
  </Router>
);

export default App;
