
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  id?: number;
  title: string;
  start: Date;
  end: Date;
  type: string;
  description?: string;
}

const AcademicCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [newEvent, setNewEvent] = useState({ title: '', startDate: '', startTime: '', endDate: '', endTime: '', type: 'event', description: '' });
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost/php/api/calendar/get_events.php');
      const data = await response.json();
      if (data.success && Array.isArray(data.events)) {
        const fetchedEvents = data.events.map((event: any) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(fetchedEvents);
      } else {
        setEvents([]);
      }
    } catch (err) {
      setError('Failed to fetch events.');
      setEvents([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { title, startDate, startTime, endDate, endTime, type, description } = newEvent;

    if (!title || !startDate || !startTime || !endDate || !endTime || !type) {
      setError("All fields are required.");
      return;
    }

    const start = moment(`${startDate} ${startTime}`, 'YYYY-MM-DD HH:mm').toDate();
    const end = moment(`${endDate} ${endTime}`, 'YYYY-MM-DD HH:mm').toDate();

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        setError("Invalid date or time format.");
        return;
    }

    try {
      const response = await fetch('http://localhost/php/api/calendar/create_event.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, start: moment(start).format('YYYY-MM-DD HH:mm:ss'), end: moment(end).format('YYYY-MM-DD HH:mm:ss'), type, description }),
      });

      const data = await response.json();
      if (data.success) {
        setNewEvent({ title: '', startDate: '', startTime: '', endDate: '', endTime: '', type: 'event', description: '' });
        fetchEvents();
      } else {
        setError(data.message || 'Failed to add event.');
      }
    } catch (err) {
      setError('Failed to add event.');
    }
  };
  
  const handleDeleteEvent = async (eventId: number) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost/php/api/calendar/delete_event.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: eventId }),
      });

      const data = await response.json();
      if (data.success) {
        fetchEvents();
        setSelectedEvent(null);
      } else {
        setError(data.message || 'Failed to delete event.');
      }
    } catch (err) {
      setError('Failed to delete event.');
    }
  };


  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Academic Calendar</h2>
      
      <div className="mb-6">
        <form onSubmit={handleAddEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
            placeholder="Event Title"
            className="p-2 border rounded"
          />
          <select name="type" value={newEvent.type} onChange={handleInputChange} className="p-2 border rounded">
            <option value="event">Event</option>
            <option value="holiday">Holiday</option>
            <option value="notice">Notice</option>
            <option value="exam">Exam</option>
          </select>
          <div className="flex gap-2">
            <input
              type="date"
              name="startDate"
              value={newEvent.startDate}
              onChange={handleInputChange}
              className="p-2 border rounded w-1/2"
            />
            <input
              type="time"
              name="startTime"
              value={newEvent.startTime}
              onChange={handleInputChange}
              className="p-2 border rounded w-1/2"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="date"
              name="endDate"
              value={newEvent.endDate}
              onChange={handleInputChange}
              className="p-2 border rounded w-1/2"
            />
            <input
              type="time"
              name="endTime"
              value={newEvent.endTime}
              onChange={handleInputChange}
              className="p-2 border rounded w-1/2"
            />
          </div>
          <textarea
            name="description"
            value={newEvent.description}
            onChange={handleInputChange}
            placeholder="Event Description"
            className="p-2 border rounded md:col-span-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Add Event
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {selectedEvent && (
        <div className="p-4 bg-gray-100 rounded-lg mb-4">
          <h3 className="text-lg font-bold">{selectedEvent.title}</h3>
          <p><strong>Starts:</strong> {moment(selectedEvent.start).format('MMMM Do YYYY, h:mm a')}</p>
          <p><strong>Ends:</strong> {moment(selectedEvent.end).format('MMMM Do YYYY, h:mm a')}</p>
          <p><strong>Type:</strong> {selectedEvent.type}</p>
          {selectedEvent.description && <p><strong>Description:</strong> {selectedEvent.description}</p>}
          <button onClick={() => selectedEvent.id && handleDeleteEvent(selectedEvent.id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 mt-2">Delete</button>
          <button onClick={() => setSelectedEvent(null)} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 mt-2 ml-2">Close</button>
        </div>
      )}

      <div style={{ height: 500 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          onSelectEvent={event => setSelectedEvent(event)}
          eventPropGetter={(event) => {
            const backgroundColor = event.type === 'holiday' ? '#d9534f' : event.type === 'exam' ? '#f0ad4e' : '#337ab7';
            return { style: { backgroundColor } };
          }}
        />
      </div>
    </div>
  );
};

export default AcademicCalendar;
