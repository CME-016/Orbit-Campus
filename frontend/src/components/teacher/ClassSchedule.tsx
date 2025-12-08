
import React, { useState } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, MapPin, BookOpen, User } from 'lucide-react';

// Mock data for the teacher's weekly schedule
const mockSchedule = {
  Monday: [
    { time: '09:00 - 10:30', course: 'CS101', topic: 'Introduction to Algorithms', location: 'Room 301' },
    { time: '11:00 - 12:30', course: 'MA202', topic: 'Linear Transformations', location: 'Room 215' },
  ],
  Tuesday: [
    { time: '10:00 - 11:30', course: 'CS101', topic: 'Data Structures Lab', location: 'Lab 5' },
    { time: '14:00 - 15:30', course: 'GEN101', topic: 'Faculty Meeting', location: 'Conf. Hall A' },
  ],
  Wednesday: [
    { time: '09:00 - 10:30', course: 'CS101', topic: 'Advanced Algorithms', location: 'Room 301' },
    { time: '13:00 - 14:30', course: 'MA202', topic: 'Eigenvalues and Eigenvectors', location: 'Room 215' },
  ],
  Thursday: [
    { time: '10:00 - 11:30', course: 'CS101', topic: 'Guest Lecture on AI', location: 'Auditorium' },
  ],
  Friday: [
    { time: '11:00 - 12:30', course: 'CS101', topic: 'Project Presentations', location: 'Room 301' },
    { time: '15:00 - 16:00', course: 'Office Hour', topic: 'Student Queries', location: 'My Office' },
  ],
  Saturday: [],
  Sunday: [],
};

type Day = keyof typeof mockSchedule;

const ClassSchedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeDay = (offset: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + offset);
      return newDate;
    });
  };

  const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' }) as Day;
  const scheduleForToday = mockSchedule[dayOfWeek] || [];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">My Class Schedule</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between">
        <button onClick={() => changeDay(-1)} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </button>
        <div className="text-center">
          <p className="text-xl font-semibold text-indigo-600">{currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className="text-lg text-gray-600">{dayOfWeek}</p>
        </div>
        <button onClick={() => changeDay(1)} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronRight className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <div className="space-y-4">
        {scheduleForToday.length > 0 ? (
          scheduleForToday.map((session, index) => (
            <div key={index} className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-indigo-500">
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="mb-4 sm:mb-0">
                  <p className="font-bold text-lg text-gray-800">{session.course}</p>
                  <p className="text-md text-gray-600 flex items-center mt-1"><BookOpen className="h-4 w-4 mr-2 text-gray-400"/>{session.topic}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-semibold text-indigo-600 flex items-center justify-start sm:justify-end"><Clock className="h-5 w-5 mr-2"/>{session.time}</p>
                  <p className="text-gray-600 flex items-center mt-1 justify-start sm:justify-end"><MapPin className="h-4 w-4 mr-2 text-gray-400"/>{session.location}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-gray-600">No classes scheduled for today.</p>
            <p className="text-sm text-gray-500">Enjoy your day off!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassSchedule;
